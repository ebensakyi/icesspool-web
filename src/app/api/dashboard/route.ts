// import { prisma } from "@/prisma/db";
// import { logActivity } from "@/libs/log";

import { NextResponse } from "next/server";

// import {
//   groupByWaterSource,
//   groupByWaterStorage,
//   groupByWaterSourceCondition,
//   groupByWaterStorageCondition,
// } from "@/./src/controller/water-query";
// import {
//   toiletAdequacy,
//   toiletCondition,
//   toiletAvailability,
// } from "@/./src/controller/liquid-waste-query";
// import {
//   wasteCollectorRegistration,
//   wasteReceptacle,
//   wasteSorting,
// } from "@/./src/controller/solid-waste-query";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(request: Request) {const res = await request.json();
  return NextResponse.json([]);
}

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();

//     return NextResponse.json([]);
//   } catch (error: any) {
//     console.log(error);
//     return NextResponse.json(error);
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const session: any = await getServerSession(authOptions);

//     // console.log("Session ", session);
//     let userId = session?.user?.id;
//     // let surname = session?.user?.surname;
//     let districtId = session?.user?.districtId;
//     let regionId = session?.user?.regionId;
//     let userLevel = session?.user?.userLevelId;

//     await logActivity("Visited dashboard page", userId);

//     let { searchParams } = new URL(request.url);





//     let filterBy: any = searchParams.get("filterBy")?.toString();
//     let filterValue: any =
//       searchParams.get("filterValue")?.toString()
   

//     if (userLevel == 1 && filterBy == "undefined") {
//       filterBy = "undefined";
//       filterValue = "undefined"
//     }
//     if (userLevel == 2 && filterBy == "undefined") {
//       filterBy = "regionId";
//       filterValue = regionId;
//     }
//     if (userLevel == 3 && filterBy == "undefined") {
//       filterBy = "districtId";
//       filterValue = districtId;
//     }
   


//     let baselineCount = await prisma.inspection.count({
//       where:
//         filterBy == "undefined"
//           ? { inspectionTypeId: 1, deleted: 0 }
//           : { inspectionTypeId: 1, [filterBy]: Number(filterValue), deleted: 0 },
//     });

//     let sanitationReportsCount = await prisma.sanitationReport.count({
//       where:
//         filterBy == "undefined" ||  filterBy == "electoralAreaId" ||  filterBy == "communityId" 
//           ? {  deleted: 0 }
//           : {  [filterBy]: Number(filterValue), deleted: 0 },
//     });


    
    

//     let reInspectionCount = await prisma.inspection.count({
//       where:
//         filterBy == "undefined"
//           ? { inspectionTypeId: 2, deleted: 0 }
//           : { inspectionTypeId: 2, [filterBy]:  Number(filterValue), deleted: 0 },
//     });


//     let followUpCount = await prisma.followUpInspection.count({
//       where:
//         filterBy == "undefined"
//           ? { deleted: 0 }
//           : {  [filterBy]:  Number(filterValue), deleted: 0 },
//     });

//     let publishedCount = await prisma.inspection.count({
//       where:
//         filterBy == "undefined"
//           ? { isPublished: 1, deleted: 0 }
//           : { isPublished: 1, deleted: 0, [filterBy]:  Number(filterValue) },
//     });

//     let unPublishedCount = await prisma.inspection.count({
//       where:
//         filterBy == "undefined"
//           ? { isPublished: 0, deleted: 0 }
//           : { isPublished: 0, deleted: 0, [filterBy]:  Number(filterValue) },
//     });

//     let healthEducActionTakenCount = await prisma.premisesActionTaken.count({
//       where:
//         filterBy == "undefined"
//           ? { actionId: 1, deleted: 0 }
//           : {
//               actionId: 1,
//               deleted: 0,
//               ConclusionSection: {
//                 Inspection: {
//                   [filterBy]:  Number(filterValue),
//                 },
//               },
//             },
//     });

//     let noticeServedActionTakenCount = await prisma.premisesActionTaken.count({
//       where:
//         filterBy == "undefined"
//           ? { actionId: 2, deleted: 0 }
//           : {
//               actionId: 2,
//               deleted: 0,
//               ConclusionSection: {
//                 Inspection: {
//                   [filterBy]:  Number(filterValue),
//                 },
//               },
//             },
//     });
//     let criminalSummonsActionTakenCount =
//       await prisma.premisesActionTaken.count({
//         where:
//           filterBy == "undefined"
//             ? { actionId: 3, deleted: 0 }
//             : {
//                 actionId: 3,
//                 deleted: 0,
//                 ConclusionSection: {
//                   Inspection: {
//                     [filterBy]:  Number(filterValue),
//                   },
//                 },
//               },
//       });

//     const baselineInspection = await prisma.inspection.groupBy({
//       by: ["inspectionFormId"],
//       _count: {
//         inspectionFormId: true,
//       },
//       where:
//         filterBy == "undefined"
//           ? { inspectionTypeId: 1, deleted: 0 }
//           : {
//               inspectionTypeId: 1,
//               deleted: 0,

//               [filterBy]:  Number(filterValue),
//             },
//     });

//     const reInspection = await prisma.inspection.groupBy({
//       by: ["inspectionFormId"],
//       _count: {
//         inspectionFormId: true,
//       },
//       where:
//         filterBy == "undefined"
//           ? { inspectionTypeId: 2, deleted: 0 }
//           : {
//               inspectionTypeId: 2,
//               deleted: 0,

//               [filterBy]:  Number(filterValue),
//             },
//     });
//     let followUpInspection = await prisma.followUpInspection.groupBy({
//       by: ["inspectionFormId"],
//       _count: {
//         inspectionFormId: true,
//       },
//       where:
//         filterBy == "undefined"
//           ? { deleted: 0 }
//           : {
//               deleted: 0,

//               [filterBy]:  Number(filterValue)
//             },
//     });

//     let waterSourceTypeSummary = await groupByWaterSource(
//       filterBy,
//       filterValue
//     );
//     let waterStorageTypeSummary = await groupByWaterStorage(
//       filterBy,
//       filterValue
//     );
//     let waterSourceConditionSummary = await groupByWaterSourceCondition(
//       filterBy,
//       filterValue
//     );
//     let waterStorageConditionSummary = await groupByWaterStorageCondition(
//       filterBy,
//       filterValue
//     );

//     let toiletAdequacySummary = await toiletAdequacy(filterBy, filterValue);

//     let toiletConditionSummary = await toiletCondition(filterBy, filterValue);

//     let wasteCollectorRegistrationSummary = await wasteCollectorRegistration(
//       filterBy,
//       filterValue
//     );
//     let wasteSortingSummary = await wasteSorting(filterBy, filterValue);

//     let wasteReceptacleSummary = await wasteReceptacle(filterBy, filterValue);
//     let toiletAvailabilitySummary = await toiletAvailability(
//       filterBy,
//       filterValue
//     );
//     // let inspectionSummary = await inspection(filterBy, filterValue);

//     let baselineSummary = await parseSummary(baselineInspection);
//     let reinspectionSummary = await parseSummary(reInspection);
//     let followupSummary = await parseSummary(followUpInspection);

//     let dashboardData = {
//       // inspectionSummary,
//       toiletAvailabilitySummary,
//       wasteReceptacleSummary,
//       wasteSortingSummary,
//       wasteCollectorRegistrationSummary,
//       toiletConditionSummary,
//       toiletAdequacySummary,
//       waterSourceConditionSummary,
//       waterStorageConditionSummary,
//       waterSourceTypeSummary,
//       waterStorageTypeSummary,
//       baselineSummary,
//       reinspectionSummary,
//       followupSummary,
//       baselineCount,
//       reInspectionCount,
//       followUpCount,
//       publishedCount,
//       unPublishedCount,
//       sanitationReportsCount,
//       // inspectionSummary: [{ label: "", value: "" }],
//       actionsTaken: [
//         {
//           label: "Notice Served",
//           value: noticeServedActionTakenCount,
//         },
//         {
//           label: "Summons",
//           value: criminalSummonsActionTakenCount,
//         },
//         {
//           label: "Health education",
//           value: healthEducActionTakenCount,
//         },
//       ],
//     };

//     return NextResponse.json(dashboardData);
//   } catch (error: any) {
//     console.log(error);
//     return NextResponse.json(error);
//   }
// }
// const parseSummary = async (baselineInspection: any) => {
//   let data = [];
//   const forms = [
//     "Residential",
//     "Eatery",
//     "Health",
//     "Hospitality",
//     "Institution",
//     "Insdustry",
//     "Market",
//     "Sanitary",
//   ];

//   for (let i = 0; i < baselineInspection.length; i++) {
//     let obj = {
//       label: forms[baselineInspection[i].inspectionFormId - 1],
//       value: baselineInspection[i]._count.inspectionFormId,
//     };
//     data.push(obj);
//   }
//   return data;
// };
