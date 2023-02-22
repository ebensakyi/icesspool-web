const { PricingModel } = require('../models')

exports.seedPricingModel = async () => {
    await PricingModel.create({
        id: 1,
        axleClassificationId: 1,

        annualAdminCost: 21960.0,
        annualOverheadCost: 22530.0,
        annualToolsCost: 11075.0,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 3750,
        roadWorthy: 150.0,
        unitFuelCost: 15.25,
        workingDays: 230.0,
        profitPercentage: 0.05,
        pumpAnnualDepreciation: 5000.0,
        truckDepreciation: 7500,
        regionId: 2,
        elevy: 1.5,
    })
    await PricingModel.create({
        id: 2,
        axleClassificationId: 2,
        annualAdminCost: 21960.0,
        annualOverheadCost: 22530.0,
        annualToolsCost: 11075.0,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 6000.0,
        roadWorthy: 150.0,
        unitFuelCost: 15.25,
        workingDays: 230.0,
        profitPercentage: 0.05,
        pumpAnnualDepreciation: 5000.0,
        truckDepreciation: 12000,
        regionId: 2,
        elevy: 1.5,
    })
    await PricingModel.create({
        id: 3,
        axleClassificationId: 3,
        annualAdminCost: 21960.0,
        annualOverheadCost: 22530.0,
        annualToolsCost: 11075.0,
        fuelDistanceConst: 0.5,
        insurance: 700,
        repairCost: 12500.0,
        roadWorthy: 150.0,
        unitFuelCost: 15.25,
        workingDays: 230.0,
        profitPercentage: 0.05,
        pumpAnnualDepreciation: 5000.0,
        truckDepreciation: 25000.0,
        regionId: 2,
        elevy: 1.5,
    })

}
