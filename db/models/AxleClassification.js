module.exports = (sequelize, Sequelize) => {
    const AxleClassification = sequelize.define('AxleClassification', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      
        axleClass: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        tankCapacity: {
            type: Sequelize.DECIMAL(10,2),
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

    AxleClassification.associate = (models) => {
        AxleClassification.hasMany(models.Vehicle);
        AxleClassification.hasOne(models.PricingModel);

   
    };
  

    AxleClassification.sync({ force: false })


    return AxleClassification;
};
