import { getShortestDistanceBetweenUserServicePoint } from "./distance";

export const calculateDeludgingPrice = (data: any) => {

  let distance = getShortestDistanceBetweenUserServicePoint()
  
  const pumpAnnualDepreciation = parseFloat(data[0].pumpAnnualDepreciation);
  const fuelUnitCost = parseFloat(data[0].unitFuelCost);
  const fuelDistanceConstant = parseFloat(data[0].fuelDistanceConst);
  const insurance = parseFloat(data[0].insurance);
  const repairCost = parseFloat(data[0].repairCost);
  const roadWorthy = parseFloat(data[0].roadWorthy);
  const workingDays = parseFloat(data[0].workingDays);
  const annualAdminCost = parseFloat(data[0].annualAdminCost);
  const annualOverheads = parseFloat(data[0].annualOverheadCost);
  const annualToolsCost = parseFloat(data[0].annualToolsCost);
  const profitPercentage = parseFloat(data[0].profitPercentage);

  const singleTankVolume = parseFloat(data[0].AxleClassification.tankCapacity);
  const mediumTankVolume = parseFloat(data[1].AxleClassification.tankCapacity);
  const doubleTankVolume = parseFloat(data[2].AxleClassification.tankCapacity);

  const singleTruckAnnualDepreciation = parseFloat(data[0].truckDepreciation);
  const mediumTruckAnnualDepreciation = parseFloat(data[1].truckDepreciation);
  const doubleTruckAnnualDepreciation = parseFloat(data[2].truckDepreciation);

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

  const costs = [
    { id: 1, name: "Mini", cost: singleCost },
    { id: 2, name: "Small", cost: mediumCost },
    { id: 3, name: "Single", cost: doubleCost },
  ];
};
