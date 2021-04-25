module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        transactionId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true

        },
        rating: {
            type: Sequelize.DECIMAL(2, 1),
            defaultValue: 0.0
        },
        comment: {
            type: Sequelize.STRING,
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
    Rating.associate = (models) => { Rating.belongsTo(models.Transaction, { foreignKey: 'transactionId' }) }

    Rating.sync({ force: false }).catch(error => {
        console.log(error)
    })

    return Rating;
};
