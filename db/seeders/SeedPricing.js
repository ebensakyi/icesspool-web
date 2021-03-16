const { PricingModel } = require('../models')

exports.seedPricingModel = async () => {
    await PricingModel.create({
        id: 1,
        axleClassificationId: 1,

        annualAdminCost: 8880,
        annualOverheadCost: 18120,
        annualToolsCost: 6185,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 8000,
        roadWorthy: 200,
        unitFuelCost: 4.95,
        workingDays: 230,
        profitPercentage: 0.05,
        pumpAnnualDepreciation: 1500,
        truckDepreciation: 20000
    })
    await PricingModel.create({
        id: 2,
        axleClassificationId: 2,
        annualAdminCost: 8880,
        annualOverheadCost: 18120,
        annualToolsCost: 6185,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 8000,
        roadWorthy: 200,
        unitFuelCost: 4.95,
        workingDays: 230,

        profitPercentage: 0.05,

        pumpAnnualDepreciation: 1500,
        truckDepreciation: 25000
    })
    await PricingModel.create({
        id: 3,
        axleClassificationId: 3,
        annualAdminCost: 8880,
        annualOverheadCost: 18120,
        annualToolsCost: 6185,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 8000,
        roadWorthy: 200,
        unitFuelCost: 4.95,
        workingDays: 230,
        profitPercentage: 0.05,
        pumpAnnualDepreciation: 1500,
        truckDepreciation: 30000
    })

}
