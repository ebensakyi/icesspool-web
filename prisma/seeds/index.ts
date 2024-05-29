import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { services } from "./services";
import { truckClassification } from "./truck_classification";
import { userTypes } from "./user_types";
import { users } from "./users";
import { regions } from "./regions";
import { serviceAreas } from "./service_area";
import { truckEmptying } from "./truck_emptying_pricing";
import { servicePoints } from "./service_point";
import { bservices } from "./biodigester_services";
import { biodigesterTypes } from "./biodigester_type";
import { districts } from "./districts";
import { txStatuses } from "./tx_statuses";
import { serviceProvider } from "./service_provider";
import { momoNetworks } from "./momo_network";
import { timeframes } from "./time_frames";
import { penalty } from "./penalty";
import { serviceProviderBal } from "./service_provider_bal";
import { waterPricing } from "./water_pricing";
import { waterTypes } from "./water_type";

async function main() {
  await prisma.biodigesterType.createMany({
    data: biodigesterTypes,
  });
  await prisma.waterType.createMany({
    data: waterTypes,
  });
  await prisma.region.createMany({
    data: regions,
  });
  await prisma.serviceArea.createMany({
    data: serviceAreas,
  });
  await prisma.service.createMany({
    data: services,
  });

  await prisma.truckClassification.createMany({
    data: truckClassification,
  });

  await prisma.userType.createMany({
    data: userTypes,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.toiletTruckServicePricing.createMany({
    data: truckEmptying,
  });

  await prisma.servicePoint.createMany({
    data: servicePoints,
  });

  await prisma.biodigesterService.createMany({
    data: bservices,
  });

  await prisma.district.createMany({
    data: districts,
  });
  await prisma.txStatus.createMany({
    data: txStatuses,
  });

  await prisma.serviceProvider.createMany({
    data: serviceProvider,
  });
  await prisma.momoNetwork.createMany({
    data: momoNetworks,
  });

  await prisma.timeFrame.createMany({
    data: timeframes,
  });
  await prisma.penalty.createMany({
    data: penalty,
  });

  await prisma.icesspoolBalance.create({
    data: { balance: 0.0 },
  });
  await prisma.platformBalance.createMany({
    data: { balance: 0.0 },
  });

  await prisma.serviceProviderBalance.createMany({
    data: serviceProviderBal,
  });

  await prisma.waterTankerServicePricing.createMany({
    data: waterPricing,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
