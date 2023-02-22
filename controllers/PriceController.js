const { PricingModel } = require("../db/models");
const { AxleClassification } = require("../db/models");

const { TipoffPoint } = require("../db/models");
const Helper = require("../utils/Helper");

exports.getPriceModelPage = async (req, res) => {
  await Helper.isLogin(req, res);

  const pricing = await PricingModel.findAll({
    include: [{ model: AxleClassification }],
  });
  // const onePricing = await PricingModel.findOne({ include: [{ model: AxleClassification }] })

  //res.send(pricing)
  res.render("pricing", { data: pricing, user: req.session.user });
};

exports.updatePriceModel = async (req, res) => {
  try {
    await PricingModel.update(
      {
        // axleClassificationId: req.body.axleClassification,
        // fuelDistanceConst: req.body.fuelDistanceConst,
        // insurance: req.body.insurance,
        // repairCost: req.body.repairCost,
        // roadWorthy: req.body.roadWorthy,
        unitFuelCost: req.body.fuel,
        // workingDays: req.body.workingDays,

        // annualAdminCost: req.body.annualAdminCost,
        // annualOverheadCost: req.body.annualOverheadCost,
        // annualToolsCost: req.body.annualToolsCost,
        // profitPercentage: req.body.profitPercentage,
        // pumpAnnualDepreciation: req.body.pumpAnnualDepreciation
      },
      { where: { deleted: 0 } }
    );

    res.redirect("/pricing");
  } catch (error) {
    console.log(error);
  }
};

exports.addPriceModel = async (req, res) => {
  await PricingModel.create({
    axleClassificationId: req.body.axleClassification,
    fuelDistanceConst: req.body.fuelDistanceConst,
    insurance: req.body.insurance,
    repairCost: req.body.repairCost,
    roadWorthy: req.body.roadWorthy,
    unitFuelCost: req.body.unitFuelCost,
    workingDays: req.body.workingDays,

    truckDepreciation: req.body.truckDepreciation,

    annualAdminCost: req.body.annualAdminCost,
    annualOverheadCost: req.body.annualOverheadCost,
    annualToolsCost: req.body.annualToolsCost,
    profitPercentage: req.body.profitPercentage,
    pumpAnnualDepreciation: req.body.pumpAnnualDepreciation,
  })
    .then((pricing) => res.status(201).send(pricing))
    .catch((error) => res.status(400).send(error));
};

buildTipOffPoints = async () => {
  const points = await TipoffPoint.findAll({
    where: { deleted: 0, active: 1 },
  });
  let tipoffPoints = [];
  await points.map((points) => {
    tipoffPoints.push(points.lat, points.lng + "|");
  });
  return tipoffPoints;
};

exports.calculatePricing = async (req, res) => {
  try {
 
    let tipPoints = await buildTipOffPoints();
    const distance = await Helper.getDistance(
      tipPoints,
      req.body.userX,
      req.body.userY
    );
    const pricing = await PricingModel.findAll({
      include: [{ model: AxleClassification }],
    });

    const pumpAnnualDepreciation = parseFloat(
      pricing[0].pumpAnnualDepreciation
    );
    const fuelUnitCost = parseFloat(pricing[0].unitFuelCost);
    const fuelDistanceConstant = parseFloat(pricing[0].fuelDistanceConst);
    const insurance = parseFloat(pricing[0].insurance);
    const repairCost = parseFloat(pricing[0].repairCost);
    const roadWorthy = parseFloat(pricing[0].roadWorthy);
    const workingDays = parseFloat(pricing[0].workingDays);
    const annualAdminCost = parseFloat(pricing[0].annualAdminCost);
    const annualOverheads = parseFloat(pricing[0].annualOverheadCost);
    const annualToolsCost = parseFloat(pricing[0].annualToolsCost);
    const profitPercentage = parseFloat(pricing[0].profitPercentage);

    const singleTankVolume = parseFloat(
      pricing[0].AxleClassification.tankCapacity
    );
    const mediumTankVolume = parseFloat(
      pricing[1].AxleClassification.tankCapacity
    );
    const doubleTankVolume = parseFloat(
      pricing[2].AxleClassification.tankCapacity
    );

    const singleTruckAnnualDepreciation = parseFloat(
      pricing[0].truckDepreciation
    );
    const mediumTruckAnnualDepreciation = parseFloat(
      pricing[1].truckDepreciation
    );
    const doubleTruckAnnualDepreciation = parseFloat(
      pricing[2].truckDepreciation
    );

    //Calculation
    const fuelPerTrip = distance * fuelDistanceConstant;
    const roundTripFuelVolume = fuelPerTrip * 2;

    const fuelCostForDailyRoundTrip = roundTripFuelVolume * fuelUnitCost;

    const operationCost =
      workingDays * fuelCostForDailyRoundTrip +
      insurance +
      repairCost +
      roadWorthy;

    const singleTotalAnnualCostService =
      operationCost +
      singleTruckAnnualDepreciation +
      pumpAnnualDepreciation +
      annualOverheads +
      annualToolsCost +
      annualAdminCost;
    const mediumTotalAnnualCostService =
      operationCost +
      mediumTruckAnnualDepreciation +
      pumpAnnualDepreciation +
      annualOverheads +
      annualToolsCost +
      annualAdminCost;
    const doubleTotalAnnualCostService =
      operationCost +
      doubleTruckAnnualDepreciation +
      pumpAnnualDepreciation +
      annualOverheads +
      annualToolsCost +
      annualAdminCost;

    const singleTotalAnnualCost =
      singleTotalAnnualCostService +
      singleTotalAnnualCostService * profitPercentage;
    const mediumTotalAnnualCost =
      mediumTotalAnnualCostService +
      mediumTotalAnnualCostService * profitPercentage;
    const doubleTotalAnnualCost =
      doubleTotalAnnualCostService +
      doubleTotalAnnualCostService * profitPercentage;

    const singleAnnualSludgeVolume = singleTankVolume * workingDays;
    const mediumAnnualSludgeVolume = mediumTankVolume * workingDays;
    const doubleAnnualSludgeVolume = doubleTankVolume * workingDays;

    //COST
    const singleCost = (
      (singleTotalAnnualCost / singleAnnualSludgeVolume) *
      singleTankVolume
    ).toFixed(0);
    const mediumCost = (
      (mediumTotalAnnualCost / mediumAnnualSludgeVolume) *
      mediumTankVolume
    ).toFixed(0);
    const doubleCost = (
      (doubleTotalAnnualCost / doubleAnnualSludgeVolume) *
      doubleTankVolume
    ).toFixed(0);

    // const singleCost = Number((singleUnitCost * distance1).toFixed(0))
    // const mediumCost = Number((mediumUnitCost * distance1).toFixed(0))
    // const doubleCost = Number((doubleUnitCost * distance1).toFixed(0))

    const costs = { singleCost, mediumCost, doubleCost };
    // console.log(singleTotalAnnualCost / singleAnnualSludgeVolume, mediumTotalAnnualCost, doubleTotalAnnualCost)

  console.log(costs);

    ///Calculate distance from user to tipoff points

    return res
      .status(200)
      .send({ statusCode: 1, message: "Successful", data: costs });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ statusCode: 0, message: error });
  }
};

exports.getAPriceModel = async (req, res) => {
  if (!Number(req.params.id)) {
    const error = "Please provide a correct pricing id";
    return res.status(400).json({ status: "error", message: error });
  }
  await PricingModel.findOne({
    where: { id: req.params.id },
    include: [{ model: AxleClassification }],
  })
    .then((pricing) =>
      res
        .status(200)
        .send({ statusCode: 100, message: "Successful", data: pricing })
    )
    .catch((error) => res.status(400).send(error));
};

exports.getAllPriceModel = async (req, res) => {
  await PricingModel.findAll({ include: [{ model: AxleClassification }] })
    .then((pricing) => res.status(201).send(pricing))
    .catch((error) => res.status(400).send(error));
};
