module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('Client', {
        id: {
            allowNull: false,
            type: Sequelize.STRING,
            primaryKey: true,
        },
        userId: {
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
    Client.associate = (models) => {
        Client.belongsTo(models.User, {
            foreignKey: 'userId',
            // as: 'client',
        });
        Client.hasMany(models.Transaction);
    };

    Client.sync({ force: false });

    return Client;
};
