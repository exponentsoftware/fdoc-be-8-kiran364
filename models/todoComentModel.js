
module.exports = (sequelize, Sequelize) => {
    const todo_Coments = sequelize.define("todo_coments", {
        todo_id:{
            type: Sequelize.INTEGER
        },
        coment_id:{
            type: Sequelize.INTEGER
        }  
    });
    return todo_Coments;
};