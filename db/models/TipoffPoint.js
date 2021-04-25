module.exports = (sequelize, Sequelize) => {
    const TipoffPoint = sequelize.define('TipoffPoint', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },
        siteName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        placeId: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING,
        },
        gps: {
            type: Sequelize.STRING,
        },
        lat: {
            type: Sequelize.DECIMAL(10, 6),
        },
        lng: {
            type: Sequelize.DECIMAL(10, 6),
        },
        active: {
            type: Sequelize.INTEGER,
            defaultValue: 1
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

    

    TipoffPoint.sync({ force: false });

  
    return TipoffPoint;
};
