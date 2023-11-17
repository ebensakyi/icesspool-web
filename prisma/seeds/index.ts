import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


import { entities} from "./main_entities";

import { services } from "./services";
import { truckClassification } from './truck_classification';
import { userTypes } from "./user_types";
import { users } from "./users";
import { regions } from "./regions";
import { serviceAreas } from "./service_area";

async function main() {







 await prisma.region.createMany({
      data: regions,
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
  
    await prisma.mainEntity.createMany({
      data: entities,
    });

    await prisma.user.createMany({
      data: users,
    });

    await prisma.serviceArea.createMany({
      data: serviceAreas,
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
