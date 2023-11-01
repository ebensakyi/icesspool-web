import { prisma } from "@/prisma/db";

export const groupByWaterSource = async (filterBy: any, filterValue: any) => {


try {
  let summary;

  if (filterBy == "undefined") {
    
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterSources"."waterSourceId","WaterSourceType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterSources"  ON "PremisesWaterSources"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterSourceType"  ON "PremisesWaterSources"."waterSourceId" = "WaterSourceType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterSourceType"."id" IS NOT NULL
        GROUP BY "WaterSourceType"."name", "PremisesWaterSources"."waterSourceId" `;



  } else if (filterBy == "regionId") {
    
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterSources"."waterSourceId","WaterSourceType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterSources"  ON "PremisesWaterSources"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterSourceType"  ON "PremisesWaterSources"."waterSourceId" = "WaterSourceType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterSourceType"."id" IS NOT NULL AND "Inspection"."regionId" = ${Number(filterValue)}

        GROUP BY "WaterSourceType"."name", "PremisesWaterSources"."waterSourceId" `;
  } else if (filterBy == "districtId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterSources"."waterSourceId","WaterSourceType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterSources"  ON "PremisesWaterSources"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterSourceType"  ON "PremisesWaterSources"."waterSourceId" = "WaterSourceType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterSourceType"."id" IS NOT NULL AND "Inspection"."districtId" =  ${Number(filterValue)}

        GROUP BY "WaterSourceType"."name", "PremisesWaterSources"."waterSourceId" `;
  } else if (filterBy == "electoralAreaId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterSources"."waterSourceId","WaterSourceType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterSources"  ON "PremisesWaterSources"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterSourceType"  ON "PremisesWaterSources"."waterSourceId" = "WaterSourceType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterSourceType"."id" IS NOT NULL AND "Inspection"."electoralAreaId" = ${Number(filterValue)}

        GROUP BY "WaterSourceType"."name", "PremisesWaterSources"."waterSourceId" `;
  } else if (filterBy == "communityId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterSources"."waterSourceId","WaterSourceType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterSources"  ON "PremisesWaterSources"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterSourceType"  ON "PremisesWaterSources"."waterSourceId" = "WaterSourceType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterSourceType"."id" IS NOT NULL AND "Inspection"."communityId" =  ${Number(filterValue)}

        GROUP BY "WaterSourceType"."name", "PremisesWaterSources"."waterSourceId" `;
  }


  
  return toJson(summary);
} catch (error) {
  console.log("groupByWaterSource==> ",error);
  
}

  
};

export const groupByWaterStorage = async (filterBy: any, filterValue: any) => {
  try {
      let summary;

  if (filterBy == "undefined") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterStorage"."waterStorageTypeId","WaterStorageType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterStorage"  ON "PremisesWaterStorage"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterStorageType"  ON "PremisesWaterStorage"."waterStorageTypeId" = "WaterStorageType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"

        GROUP BY "WaterStorageType"."name", "PremisesWaterStorage"."waterStorageTypeId" `;
  } else if (filterBy == "regionId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterStorage"."waterStorageTypeId","WaterStorageType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterStorage"  ON "PremisesWaterStorage"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterStorageType"  ON "PremisesWaterStorage"."waterStorageTypeId" = "WaterStorageType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterStorageType"."id" IS NOT NULL AND "Inspection"."regionId" =  ${Number(filterValue)}

        GROUP BY "WaterStorageType"."name", "PremisesWaterStorage"."waterStorageTypeId" `;
  } else if (filterBy == "districtId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterStorage"."waterStorageTypeId","WaterStorageType"."name", COUNT("WaterSection"."id") AS "count"

      FROM "WaterSection"
      LEFT JOIN "PremisesWaterStorage"  ON "PremisesWaterStorage"."waterSectionId" = "WaterSection"."id"
      LEFT JOIN "WaterStorageType"  ON "PremisesWaterStorage"."waterStorageTypeId" = "WaterStorageType"."id"
      LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
      WHERE "WaterStorageType"."id" IS NOT NULL AND "Inspection"."districtId" =  ${Number(filterValue)}

      GROUP BY "WaterStorageType"."name", "PremisesWaterStorage"."waterStorageTypeId" `;
  } else if (filterBy == "electoralAreaId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterStorage"."waterStorageTypeId","WaterStorageType"."name", COUNT("WaterSection"."id") AS "count"

      FROM "WaterSection"
      LEFT JOIN "PremisesWaterStorage"  ON "PremisesWaterStorage"."waterSectionId" = "WaterSection"."id"
      LEFT JOIN "WaterStorageType"  ON "PremisesWaterStorage"."waterStorageTypeId" = "WaterStorageType"."id"
      LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
      WHERE "WaterStorageType"."id" IS NOT NULL AND "Inspection"."electoralAreaId" = ${Number(filterValue)}

      GROUP BY "WaterStorageType"."name", "PremisesWaterStorage"."waterStorageTypeId" `;
  } else if (filterBy == "communityId") {
    summary =
      await prisma.$queryRaw`SELECT  "PremisesWaterStorage"."waterStorageTypeId","WaterStorageType"."name", COUNT("WaterSection"."id") AS "count"

        FROM "WaterSection"
        LEFT JOIN "PremisesWaterStorage"  ON "PremisesWaterStorage"."waterSectionId" = "WaterSection"."id"
        LEFT JOIN "WaterStorageType"  ON "PremisesWaterStorage"."waterStorageTypeId" = "WaterStorageType"."id"
        LEFT JOIN "Inspection"  ON "Inspection"."id" = "WaterSection"."inspectionId"
        WHERE "WaterStorageType"."id" IS NOT NULL AND "Inspection"."communityId" = ${Number(filterValue)}

        GROUP BY "WaterStorageType"."name", "PremisesWaterStorage"."waterStorageTypeId" `;
  }

  return toJson(summary);
  } catch (error) {
    console.log("groupByWaterStorage=> ",error);
    
  }

};

export const groupByWaterSourceCondition = async (
  filterBy: any,
  filterValue: any
) => {
  let safeWaterSourceCount = await prisma.waterSection.count({
    where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            waterSourceConditionId: 1,
          }
        : {
            deleted: 0,
            waterSourceConditionId: 1,
            Inspection: {
              [filterBy]:  Number(filterValue),
            },
          },
  });
  let unsafeWaterSourceCount = await prisma.waterSection.count({
    where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            waterSourceConditionId: 2,
          }
        : {
            deleted: 0,
            waterSourceConditionId: 2,
            Inspection: {
              [filterBy]:  Number(filterValue),
            },
          },
  });

  return [
    { label: "Safe", value: safeWaterSourceCount },
    { label: "Unsafe", value: unsafeWaterSourceCount },
  ];
};

export const groupByWaterStorageCondition = async (
  filterBy: any,
  filterValue: any
) => {
  let safeWaterStorageCount = await prisma.waterSection.count({
    where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            waterStorageConditionId: 1,
          }
        : {
            deleted: 0,
            waterStorageConditionId: 1,
            Inspection: {
              [filterBy]:  Number(filterValue),
            },
          },
  });
  let unsafeWaterStorageCount = await prisma.waterSection.count({
    where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            waterStorageConditionId: 2,
          }
        : {
            deleted: 0,
            waterStorageConditionId: 2,
            Inspection: {
              [filterBy]:  Number(filterValue),
            },
          },
  });

  return [
    { label: "Safe", value: safeWaterStorageCount },
    { label: "Unsafe", value: unsafeWaterStorageCount },
  ];
};
function toJson(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_, v) =>
      typeof v === "bigint" ? `${v}n` : v
    ).replace(/"(-?\d+)n"/g, (_, a) => a)
  );
}
