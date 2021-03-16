module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        transactionId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
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
    Payment.associate = (models) => { Payment.belongsTo(models.Transaction, { foreignKey: 'transactionId' }) }

    Payment.sync({ force: false }).catch(error => {
        console.log(error)
    })

    return Payment;
};
