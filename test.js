applyDiscount =  (
  cost,
  numberOfTrips,
  trip1Discount,
  trip2Discount,
  trip3Discount,
  trip4Discount,
  trip5Discount
) => {
  let trip1Cost = cost - cost * trip1Discount;
  let trip2Cost = cost - cost * trip2Discount;
  let trip3Cost = cost - cost * trip3Discount;
  let trip4Cost = cost - cost * trip4Discount;
  let trip5Cost = cost - cost * trip5Discount;
  let totalTripCost = 0;

  if (numberOfTrips == 1) {
    totalTripCost = trip1Cost;
    return totalTripCost;
  } else if (numberOfTrips == 2) {
    totalTripCost = trip1Cost + trip2Cost;
    return totalTripCost;
  } else if (numberOfTrips == 3) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost;
    return totalTripCost;
  } else if (numberOfTrips == 4) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost + trip4Cost;
    return totalTripCost;
  } else if (numberOfTrips == 5) {
    totalTripCost = trip1Cost + trip2Cost + trip3Cost + trip4Cost + trip5Cost;
    return totalTripCost;
  } else {
    totalTripCost5 = trip1Cost + trip2Cost + trip3Cost + trip4Cost + trip5Cost;
    let sum = 0;

    for (let i = 5; i < numberOfTrips; i++) {
      sum = sum + (cost - cost * trip5Discount);
    }
    return sum + totalTripCost5;
  }
};

let discountedCost =  applyDiscount(350, 8, 0.0, 0.05, 0.08, 0.1, 0.12);
console.log(Math.ceil(discountedCost));

const Helper = require("./utils/Helper");

 Helper.sendFCMNotification( ["cE7tqtzLSB-22OL2hzoNcO:APA91bGnDhI2tgKWrSPRgJGKbNPbGsqcRFATLFQJ6sunu7Je_JiasoFfSNlJiXuxPvKqztXk3Kw_KNyRd3owxDVeaLnQS8HU6q0wYuTQkWcSUG-EOESiueO5WK2BWJd4mgrKtmWVAq_z"], "Hmmm1", "Hmmmm2");