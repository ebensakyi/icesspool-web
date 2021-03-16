module.exports = (sequelize, Sequelize) => {
    const RatingBreakdown = sequelize.define('RatingBreakdown', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        ratingId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique:true
        },
       
        helmet: {
            type: Sequelize.INTEGER,
        },
        abusive: {
            type: Sequelize.INTEGER,
        },
        overall: {
            type: Sequelize.INTEGER,
        },
        boots: {
            type: Sequelize.INTEGER,
        },
        respirator: {
            type: Sequelize.INTEGER,
        },
        eyesProtector: {
            type: Sequelize.INTEGER,
        },
        cashDemand: {
            type: Sequelize.INTEGER,
        },
        damageProperty: {
            type: Sequelize.INTEGER,
        },
        closeOpenSeal: {
            type: Sequelize.INTEGER,
        },
        cleanEnvironment: {
            type: Sequelize.INTEGER,
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
    RatingBreakdown.associate = (models) => { 
        RatingBreakdown.belongsTo(models.Rating, { foreignKey: 'ratingId' })

     }

    RatingBreakdown.sync({ force: false }).catch(error => {
        console.log(error)
    })

    return RatingBreakdown;
};
