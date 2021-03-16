module.exports = (sequelize, Sequelize) => {
    const Withdrawal = sequelize.define('Withdrawal', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        providerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        transactionId: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        requestDate: {
            type: Sequelize.STRING,
        },
        disbursementDate: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        approvedBy: {
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
    Withdrawal.associate = (models) => {
        Withdrawal.belongsTo(models.Provider, {
            foreignKey: 'providerId',
            // as: 'withdrawal',
        });
        Withdrawal.belongsTo(models.User, {
            foreignKey: 'approvedBy',
            // as: 'withdrawal',
        });
    };

    Withdrawal.sync({ force: false });

    return Withdrawal;
};
