import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


import { entities} from "./main_entities";

import { services } from "./services";
import { truckClassification } from './truck_classification';
import { userTypes } from "./user_types";

async function main() {









    await prisma.service.createMany({
      data: services,
    });
  
    await prisma.truckClassification.createMany({
      data: truckClassification,
    });
  
    await prisma.userType.createMany({
      data: userTypes,
    });
  
    await prisma.district.createMany({
      data: district,
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
