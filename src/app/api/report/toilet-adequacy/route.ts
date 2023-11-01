import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    // await logActivity("Report generated",  userCookie.id);

    let filterBy = res?.filterBy;
    let filterValue = Number(res?.filterValue);
    let fromDate = new Date(res?.from);
    let toDate = new Date(res?.to);
    let _summary;

    if (filterBy == "regionId") {
      _summary =
        await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "LiquidWasteSection"."inspectionId") AS "inspectionCount", 
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 1) AS "adequate",
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 2) AS "inadequate"
    
    FROM "InspectionForm" 
    LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
    LEFT JOIN "LiquidWasteSection" ON "Inspection"."id" = "LiquidWasteSection"."inspectionId"
        WHERE  "Inspection"."regionId" = ${filterValue}
    
    GROUP BY "InspectionForm"."name" 
    ORDER BY "InspectionForm"."name"
    `;
    } else if (filterBy == "districtId") {
      _summary =
        await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "LiquidWasteSection"."inspectionId") AS "inspectionCount", 
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 1) AS "adequate",
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 2) AS "inadequate"
    
    FROM "InspectionForm" 
    LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
    LEFT JOIN "LiquidWasteSection" ON "Inspection"."id" = "LiquidWasteSection"."inspectionId"
        WHERE  "Inspection"."regionId" = ${filterValue}
    
    GROUP BY "InspectionForm"."name" 
    ORDER BY "InspectionForm"."name"
    `;
    } else if (filterBy == "electoralAreaId") {
      _summary =
        await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "LiquidWasteSection"."inspectionId") AS "inspectionCount", 
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 1) AS "adequate",
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 2) AS "inadequate"
    
    FROM "InspectionForm" 
    LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
    LEFT JOIN "LiquidWasteSection" ON "Inspection"."id" = "LiquidWasteSection"."inspectionId"
    WHERE  "Inspection"."electoralAreaId" = ${filterValue}
    
    GROUP BY "InspectionForm"."name" 
    ORDER BY "InspectionForm"."name"
    `;
    } else if (filterBy == "communityId") {
      _summary =
        await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "LiquidWasteSection"."inspectionId") AS "inspectionCount", 
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 1) AS "adequate",
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 2) AS "inadequate"
    
    FROM "InspectionForm" 
    LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
    LEFT JOIN "LiquidWasteSection" ON "Inspection"."id" = "LiquidWasteSection"."inspectionId"
        WHERE  "Inspection"."communityId" = ${filterValue}
    
    GROUP BY "InspectionForm"."name" 
    ORDER BY "InspectionForm"."name"
    `;
    } else {
      _summary =
        await prisma.$queryRaw`SELECT  DISTINCT "InspectionForm"."name", COUNT( "LiquidWasteSection"."inspectionId") AS "inspectionCount", 
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 1) AS "adequate",
    COUNT("LiquidWasteSection"."toiletAdequacyId")  filter (where "LiquidWasteSection"."toiletAdequacyId" = 2) AS "inadequate"
    
    FROM "InspectionForm" 
    LEFT JOIN "Inspection" ON "Inspection"."inspectionFormId" = "InspectionForm"."id"
    LEFT JOIN "LiquidWasteSection" ON "Inspection"."id" = "LiquidWasteSection"."inspectionId"
    
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
