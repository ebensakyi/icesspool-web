module.exports = (sequelize, Sequelize) => {
    const MomoNetwork = sequelize.define('MomoNetwork', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        network: {
            type: Sequelize.STRING,
            allowNull: false
        },
        abbrv: {
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
   

    MomoNetwork.sync({ force: false }).catch(error => {
        console.log(error)
    })

    return MomoNetwork;
};
