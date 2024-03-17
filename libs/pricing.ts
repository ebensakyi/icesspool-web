import { getShortestDistanceBtnUserServicePoint } from "./distance";

export const calculateDeludgingPrice = async (
  pricingModel: any,
  userLocation: any,
  tripNumber: any
) => {
  let distance = await getShortestDistanceBtnUserServicePoint(userLocation);
        console.log("pricingModel-->",pricingModel);


  let pricing: any = [];

  pricingModel.map((d: any) => {

    // console.log("d-->",d);

    const pumpDepreciation = parseFloat(d.pumpDepreciation);
    const fuelUnitCost = parseFloat(d.unitFuelCost);
    const fuelDistanceConstant = parseFloat(d.fuelDistanceConst);
    const insurance = parseFloat(d.insurance);
    const repairCost = parseFloat(d.repairCost);
    const roadWorthy = parseFloat(d.roadWorthy);
    const workingDays = parseFloat(d.workingDays);
    const adminCost = parseFloat(d.adminCost);
    const overheads = parseFloat(d.overheadCost);
    const toolsCost = parseFloat(d.toolsCost);
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
      overheads +
      toolsCost +
      adminCost;

      

    const totalCost = totalCostService  * profitPercentage;



   

    const sludgeVolume = tankVolume * workingDays;

    console.log("sludgeVolume ",sludgeVolume);


    //COST
    const cost = ((totalCost / sludgeVolume) * tankVolume).toFixed(0);

    


    pricing.push({
      id: d.TruckClassification.id,
      name: d.TruckClassification.name,
      image: d.TruckClassification.image,
      price: cost,
    });
  });




  return pricing;
};
