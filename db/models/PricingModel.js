module.exports = (sequelize, Sequelize) => {
    const PricingModel = sequelize.define('PricingModel', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        axleClassificationId: {
            type: Sequelize.INTEGER,
            unique: true
        },
        fuelDistanceConst: {
            type: Sequelize.DECIMAL(10, 2),
        },
        insurance: {
            type: Sequelize.DECIMAL(10, 2),
        },
        repairCost: {
            type: Sequelize.DECIMAL(10, 2),
        },
        roadWorthy: {
            type: Sequelize.DECIMAL(10, 2),
        },
        unitFuelCost: {
            type: Sequelize.DECIMAL(10, 2),
        },
        workingDays: {
            type: Sequelize.INTEGER,
        },
        truckDepreciation: {
            type: Sequelize.INTEGER,
        },

        annualAdminCost: {
            type: Sequelize.DECIMAL(10, 2),
        },
        annualOverheadCost: {
            type: Sequelize.DECIMAL(10, 2),
        },
        annualToolsCost: {
            type: Sequelize.DECIMAL(10, 2),
        },

        profitPercentage: {
            type: Sequelize.DECIMAL(10, 2),
        },
        pumpAnnualDepreciation: {
            type: Sequelize.DECIMAL(10, 2),
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

    PricingModel.associate = (models) => {
        PricingModel.belongsTo(models.AxleClassification, { foreignKey: 'axleClassificationId' });
    }
    PricingModel.sync({ force: false });


    
    return PricingModel;
};
