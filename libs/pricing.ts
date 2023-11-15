import { getShortestDistanceBetweenUserServicePoint } from "./distance";
import { isInCity } from "./is-location-in-city";

export const calculateDeludgingPrice = async (data: any) => {


  const cityCoordinates = [5.736477, -0.104436];

  // Example GPS coordinates
  const gpsCoordinatesInsideCity = [5.606564, -0.158467]; // Coordinates inside New York
  const gpsCoordinatesOutsideCity = [5.692319, -0.466085]; // Coordinates outside New York
  
  const cityRadiusKm = 40; // Adjust this based on the radius you want to consider for the city
  let isIn = await isInCity(gpsCoordinatesOutsideCity, cityCoordinates, cityRadiusKm)
  if (isIn) {
    console.log("The GPS coordinates are within the specified city.");
  } else {
    console.log("The GPS coordinates are outside the specified city.");
  }
  

 
  let distance = await getShortestDistanceBetweenUserServicePoint();
  let pricing: any = [];

  data.map((d: any) => {
    const pumpAnnualDepreciation = parseFloat(d.pumpAnnualDepreciation);
    const fuelUnitCost = parseFloat(d.unitFuelCost);
    const fuelDistanceConstant = parseFloat(d.fuelDistanceConst);
    const insurance = parseFloat(d.insurance);
    const repairCost = parseFloat(d.repairCost);
    const roadWorthy = parseFloat(d.roadWorthy);
    const workingDays = parseFloat(d.workingDays);
    const annualAdminCost = parseFloat(d.annualAdminCost);
    const annualOverheads = parseFloat(d.annualOverheadCost);
    const annualToolsCost = parseFloat(d.annualToolsCost);
    const profitPercentage = parseFloat(d.profitPercentage);

    const tankVolume = parseFloat(d.TruckClassification.tankCapacity);

    const truckAnnualDepreciation = parseFloat(d.truckDepreciation);

    //Calculation
    const fuelPerTrip = distance * fuelDistanceConstant;
    const roundTripFuelVolume = fuelPerTrip * 2;

    const fuelCostForDailyRoundTrip = roundTripFuelVolume * fuelUnitCost;

    const operationCost =
      workingDays * fuelCostForDailyRoundTrip +
      insurance +
      repairCost +
      roadWorthy;

    const totalAnnualCostService =
      operationCost +
      truckAnnualDepreciation +
      pumpAnnualDepreciation +
      annualOverheads +
      annualToolsCost +
      annualAdminCost;

    const totalAnnualCost =
      totalAnnualCostService + totalAnnualCostService * profitPercentage;

    const annualSludgeVolume = tankVolume * workingDays;

    //COST
    const cost = ((totalAnnualCost / annualSludgeVolume) * tankVolume).toFixed(
      0
    );

    pricing.push({id: d.TruckClassification.id, name: d.TruckClassification.name, price: cost });
  });

  // const pumpAnnualDepreciation = parseFloat(data[0].pumpAnnualDepreciation);
  // const fuelUnitCost = parseFloat(data[0].unitFuelCost);
  // const fuelDistanceConstant = parseFloat(data[0].fuelDistanceConst);
  // const insurance = parseFloat(data[0].insurance);
  // const repairCost = parseFloat(data[0].repairCost);
  // const roadWorthy = parseFloat(data[0].roadWorthy);
  // const workingDays = parseFloat(data[0].workingDays);
  // const annualAdminCost = parseFloat(data[0].annualAdminCost);
  // const annualOverheads = parseFloat(data[0].annualOverheadCost);
  // const annualToolsCost = parseFloat(data[0].annualToolsCost);
  // const profitPercentage = parseFloat(data[0].profitPercentage);

  // const singleTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);
  // const mediumTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);
  // const doubleTankVolume = parseFloat(data[0].TruckClassification.tankCapacity);

  // const singleTruckAnnualDepreciation = parseFloat(data[0].truckDepreciation);
  // const mediumTruckAnnualDepreciation = parseFloat(data[0].truckDepreciation);
  // const doubleTruckAnnualDepreciation = parseFloat(data[0].truckDepreciation);

  // //Calculation
  // const fuelPerTrip = distance * fuelDistanceConstant;
  // const roundTripFuelVolume = fuelPerTrip * 2;

  // const fuelCostForDailyRoundTrip = roundTripFuelVolume * fuelUnitCost;

  // const operationCost =
  //   workingDays * fuelCostForDailyRoundTrip +
  //   insurance +
  //   repairCost +
  //   roadWorthy;

  // const singleTotalAnnualCostService =
  //   operationCost +
  //   singleTruckAnnualDepreciation +
  //   pumpAnnualDepreciation +
  //   annualOverheads +
  //   annualToolsCost +
  //   annualAdminCost;
  // const mediumTotalAnnualCostService =
  //   operationCost +
  //   mediumTruckAnnualDepreciation +
  //   pumpAnnualDepreciation +
  //   annualOverheads +
  //   annualToolsCost +
  //   annualAdminCost;
  // const doubleTotalAnnualCostService =
  //   operationCost +
  //   doubleTruckAnnualDepreciation +
  //   pumpAnnualDepreciation +
  //   annualOverheads +
  //   annualToolsCost +
  //   annualAdminCost;

  // const singleTotalAnnualCost =
  //   singleTotalAnnualCostService +
  //   singleTotalAnnualCostService * profitPercentage;
  // const mediumTotalAnnualCost =
  //   mediumTotalAnnualCostService +
  //   mediumTotalAnnualCostService * profitPercentage;
  // const doubleTotalAnnualCost =
  //   doubleTotalAnnualCostService +
  //   doubleTotalAnnualCostService * profitPercentage;

  // const singleAnnualSludgeVolume = singleTankVolume * workingDays;
  // const mediumAnnualSludgeVolume = mediumTankVolume * workingDays;
  // const doubleAnnualSludgeVolume = doubleTankVolume * workingDays;

  // //COST
  // const singleCost = (
  //   (singleTotalAnnualCost / singleAnnualSludgeVolume) *
  //   singleTankVolume
  // ).toFixed(0);
  // const mediumCost = (
  //   (mediumTotalAnnualCost / mediumAnnualSludgeVolume) *
  //   mediumTankVolume
  // ).toFixed(0);
  // const doubleCost = (
  //   (doubleTotalAnnualCost / doubleAnnualSludgeVolume) *
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
