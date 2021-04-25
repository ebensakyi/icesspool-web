module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define('Location', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
       
        regionId: {
            type: Sequelize.INTEGER,
        },
        districtId: {
            type: Sequelize.INTEGER,
        },
        town: {
            type: Sequelize.STRING,
        },
        community: {
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

    Location.associate = (models) => {
        Location.belongsTo(models.Region, { foreignKey: 'regionId' });
        Location.belongsTo(models.District, { foreignKey: 'districtId' });
        Location.belongsTo(models.User, { foreignKey: 'userId' });

    };
    Location.sync({ force: false });

    return Location;
};
