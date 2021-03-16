
module.exports = (sequelize, Sequelize) => {
    const Discount = sequelize.define('Discount', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },

        trip1: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        trip2: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        trip3: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        trip4: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        trip5: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        beyond5: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE(3),
        },
        updatedAt: {
            type: Sequelize.DATE(3),
        },
    }, {
        freezeTableName: true
    });
  
   
    Discount.sync({ force: false });

    return Discount;
};
