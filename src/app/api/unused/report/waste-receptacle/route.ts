import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

    

 //  await logActivity("Report generated",  userCookie.id);


   let filterBy = res?.filterBy;
   let filterValue = Number(res?.filterValue);
   let fromDate = new Date(res?.from);
   let toDate = new Date(res?.to);

   let _summary;

   if (filterBy == "regionId") {
     _summary =
       await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "SolidWasteSection"."id") AS "inspectionCount", 
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 1) AS "approved",
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 2) AS "unapproved"

FROM "InspectionForm" 
LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
LEFT JOIN "SolidWasteSection" ON "Inspection"."id" = "SolidWasteSection"."inspectionId"
   WHERE  "Inspection"."regionId" = ${filterValue}

GROUP BY "InspectionForm"."name" 
ORDER BY "InspectionForm"."name"
`;
   } else if (filterBy == "districtId") {
     _summary =
       await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "SolidWasteSection"."inspectionId") AS "inspectionCount", 
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 1) AS "approved",
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 2) AS "unapproved"

FROM "InspectionForm" 
LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
LEFT JOIN "SolidWasteSection" ON "Inspection"."id" = "SolidWasteSection"."inspectionId"
   WHERE  "Inspection"."regionId" = ${filterValue}

GROUP BY "InspectionForm"."name" 
ORDER BY "InspectionForm"."name"
`;
   } else if (filterBy == "electoralAreaId") {
     _summary =
       await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "SolidWasteSection"."inspectionId") AS "inspectionCount", 
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 1) AS "approved",
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 2) AS "unapproved"

FROM "InspectionForm" 
LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
LEFT JOIN "SolidWasteSection" ON "Inspection"."id" = "SolidWasteSection"."inspectionId"
WHERE  "Inspection"."electoralAreaId" = ${filterValue}

GROUP BY "InspectionForm"."name" 
ORDER BY "InspectionForm"."name"
`;
   } else if (filterBy == "communityId") {
     _summary =
       await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "SolidWasteSection"."inspectionId") AS "inspectionCount", 
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 1) AS "approved",
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 2) AS "unapproved"

FROM "InspectionForm" 
LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
LEFT JOIN "SolidWasteSection" ON "Inspection"."id" = "SolidWasteSection"."inspectionId"
   WHERE  "Inspection"."communityId" = ${filterValue}

GROUP BY "InspectionForm"."name" 
ORDER BY "InspectionForm"."name"
`;
   } else {
     _summary =
       await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "SolidWasteSection"."inspectionId") AS "inspectionCount", 
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 1) AS "approved",
COUNT("SolidWasteSection"."approvedWasteStorageReceptacleId")  filter (where "SolidWasteSection"."approvedWasteStorageReceptacleId" = 2) AS "unapproved"

FROM "InspectionForm" 
LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
LEFT JOIN "SolidWasteSection" ON "Inspection"."id" = "SolidWasteSection"."inspectionId"

GROUP BY "InspectionForm"."name" 
ORDER BY "InspectionForm"."name"
`;
   }

   let summary = JSON.stringify(_summary, (_, v) =>
     typeof v === "bigint" ? v.toString() : v
   );
   let report = JSON.parse(summary);

  
      return NextResponse.json(report);
    } catch (error: any) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  