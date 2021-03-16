module.exports = (sequelize, Sequelize) => {

    const MomoAccount = sequelize.define('MomoAccount', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        providerId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true

        },
        momoNumber: {
            type: Sequelize.STRING,
        },
        momoNetwork: {
            type: Sequelize.INTEGER,
        },
        deleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
      
        freezeTableName: true
    });
    MomoAccount.associate = (models) => { 
        MomoAccount.belongsTo(models.Provider, { foreignKey: 'providerId' })
        MomoAccount.belongsTo(models.MomoNetwork, { foreignKey: 'momoNetwork' })

     }

    MomoAccount.sync({ force: false }).catch(error => {
        console.log("MomoAccount.sync: ", error)
    })

    return MomoAccount;
};
