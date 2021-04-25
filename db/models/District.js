module.exports = (sequelize, Sequelize) => {
    const District = sequelize.define('District', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoIncrement: true
        },

        regionId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        districtName: {
            type: Sequelize.STRING,
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
    District.associate = (models) => {
        District.belongsTo(models.Region, { foreignKey: 'regionId' });

    };
   
    District.sync({ force: false });

    return District;
};
