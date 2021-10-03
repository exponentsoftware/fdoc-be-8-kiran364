const dbConfig = require("../config/dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate().then(() => console.log("database conected")).catch(err => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todo = require("./todoModel")(sequelize, Sequelize);
db.user = require("./userModel")(sequelize, Sequelize);
db.coments = require("./comentsModel")(sequelize, Sequelize);
db.todo_coments = require("./todoComentModel")(sequelize, Sequelize);
db.tags = require("./tagsModel")(sequelize, Sequelize);
db.todo_tags = require("./todoTagsModel")(sequelize, Sequelize);

// one to many for user to todo
db.user.hasMany(db.todo, {foreignKey: 'user_id', as:'todoDetails'});
db.todo.belongsTo(db.user, {foreignKey: 'user_id', as:'userInfo'});

// many to many for todo to comments
db.todo.belongsToMany(db.coments, {through: 'todo_coments', foreignKey: 'todo_id'});
db.coments.belongsToMany(db.todo, {through: 'todo_coments', foreignKey: 'coment_id'});

// many to many for todo to tags
db.todo.belongsToMany(db.tags, {through: 'todo_tags', foreignKey: 'todo_id'});
db.tags.belongsToMany(db.todo, {through: 'todo_tags', foreignKey: 'tag_id'});


module.exports = db;