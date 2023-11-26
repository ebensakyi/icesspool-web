import { getShortestDistanceBtnUserServicePoint } from "./distance";

export const calculateDeludgingPrice = async (
  pricingModel: any,
  userLocation: any,
  tripNumber: any
) => {
  let distance = await getShortestDistanceBtnUserServicePoint(userLocation);

  let pricing: any = [];

  pricingModel.map((d: any) => {
    const pumpDepreciation = parseFloat(d.pumpDepreciation);
    const fuelUnitCost = parseFloat(d.unitFuelCost);
    const fuelDistanceConstant = parseFloat(d.fuelDistanceConst);
    const insurance = parseFloat(d.insurance);
    const repairCost = parseFloat(d.repairCost);
    const roadWorthy = parseFloat(d.roadWorthy);
    const workingDays = parseFloat(d.workingDays);
    const AdminCost = parseFloat(d.AdminCost);
    const Overheads = parseFloat(d.OverheadCost);
    const ToolsCost = parseFloat(d.ToolsCost);
    const profitPercentage = parseFloat(d.profitPercentage);

    const tankVolume = parseFloat(d.TruckClassification.tankCapacity);

    const truckDepreciation = parseFloat(d.truckDepreciation);

    //Calculation
    const fuelPerTrip = distance * fuelDistanceConstant;
    const roundTripFuelVolume = fuelPerTrip * 2;

    const fuelCostForDailyRoundTrip = roundTripFuelVolume * fuelUnitCost;

    const operationCost =
      workingDays * fuelCostForDailyRoundTrip +
      insurance +
      repairCost +
      roadWorthy;

    const totalCostService =
      operationCost +
      truckDepreciation +
      pumpDepreciation +
      Overheads +
      ToolsCost +
      AdminCost;

    const totalCost = totalCostService + totalCostService * profitPercentage;

    const SludgeVolume = tankVolume * workingDays;

    //COST
    const cost = ((totalCost / SludgeVolume) * tankVolume).toFixed(0);

    console.log("cost==>",cost);
    


    pricing.push({
      id: d.TruckClassification.id,
      name: d.TruckClassification.name,
      price: cost,
    });
  });



  console.log(pricing);
  
  // const pumpDepreciation = parseFloat(data[0].pumpDepreciation);
  // const fuelUnitCost = parseFloat(data[0].unitFuelCost);
  // const fuelDistanceConstant = parseFloat(data[0].fuelDistanceConst);
  // const insurance = parseFloat(data[0].insurance);
  // const repairCost = parseFloat(data[0].repairCost);
  // const roadWorthy = parseFloat(data[0].roadWorthy);
  // const workingDays = parseFloat(data[0].workingDays);
  // const AdminCost = parseFloat(data[0].AdminCost);
  // const Overheads = parseFloat(data[0].OverheadCost);
  // const ToolsCost = parseFloat(data[0].ToolsCost);
  // const profitPercentage = parseFloat(data[0].profitPercentage);

  // const singleTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);
  // const mediumTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);
  // const doubleTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);

  // const singleTruckDepreciation = parseFloat(data[0].truckDepreciation);
  // const mediumTruckDepreciation = parseFloat(data[0].truckDepreciation);
  // const doubleTruckDepreciation = parseFloat(data[0].truckDepreciation);

  // //Calculation
  // const fuelPerTrip = distance * fuelDistanceConstant;
  // const roundTripFuelVolume = fuelPerTrip * 2;

  // const fuelCostForDailyRoundTrip = roundTripFuelVolume * fuelUnitCost;

  // const operationCost =
  //   workingDays * fuelCostForDailyRoundTrip +
  //   insurance +
  //   repairCost +
  //   roadWorthy;

  // const singleTotalCostService =
  //   operationCost +
  //   singleTruckDepreciation +
  //   pumpDepreciation +
  //   Overheads +
  //   ToolsCost +
  //   AdminCost;
  // const mediumTotalCostService =
  //   operationCost +
  //   mediumTruckDepreciation +
  //   pumpDepreciation +
  //   Overheads +
  //   ToolsCost +
  //   AdminCost;
  // const doubleTotalCostService =
  //   operationCost +
  //   doubleTruckDepreciation +
  //   pumpDepreciation +
  //   Overheads +
  //   ToolsCost +
  //   AdminCost;

  // const singleTotalCost =
  //   singleTotalCostService +
  //   singleTotalCostService * profitPercentage;
  // const mediumTotalCost =
  //   mediumTotalCostService +
  //   mediumTotalCostService * profitPercentage;
  // const doubleTotalCost =
  //   doubleTotalCostService +
  //   doubleTotalCostService * profitPercentage;

  // const singleSludgeVolume = singleTankVolume * workingDays;
  // const mediumSludgeVolume = mediumTankVolume * workingDays;
  // const doubleSludgeVolume = doubleTankVolume * workingDays;

  // //COST
  // const singleCost = (
  //   (singleTotalCost / singleSludgeVolume) *
  //   singleTankVolume
  // ).toFixed(0);
  // const mediumCost = (
  //   (mediumTotalCost / mediumSludgeVolume) *
  //   mediumTankVolume
  // ).toFixed(0);
  // const doubleCost = (
  //   (doubleTotalCost / doubleSludgeVolume) *
  //   doubleTankVolume
  // ).toFixed(0);

  // const singleCost = Number((singleUnitCost * distance1).toFixed(0))
  // const mediumCost = Number((mediumUnitCost * distance1).toFixed(0))
  // const doubleCost = Number((doubleUnitCost * distance1).toFixed(0))

  // const costs = [
  //   { id: 1, name: "Mini", cost: singleCost },
  //   { id: 2, name: "Small", cost: mediumCost },
  //   { id: 3, name: "Single", cost: doubleCost },
  // ];

  return pricing;
};
