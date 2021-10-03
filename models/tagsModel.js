module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define("tags", {
        tital: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        username:{
            type: Sequelize.STRING
        }
    });
    return Tags;
};

