module.exports = (sequelize, Sequelize) => {
    const ActivationCode = sequelize.define('ActivationCode', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
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
   
    ActivationCode.associate = (models) => {
        ActivationCode.belongsTo(models.User);
    };
    ActivationCode.sync({ force: false })

    return ActivationCode;
};
