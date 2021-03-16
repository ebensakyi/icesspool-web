module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define('Region', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        regionName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        abbrv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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


    Region.associate = (models) => {
        Region.hasMany(models.District, { foreignKey: 'regionId' });
    };

  

    Region.sync({ force: false });

    return Region;
};
