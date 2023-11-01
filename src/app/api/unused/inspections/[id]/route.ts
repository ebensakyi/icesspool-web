import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();
   
    //   return new Response(
    //     JSON.stringify({
    //       action: 0,
    //       message: ,
    //     })
    //   );
    

   
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {
    // let userData = await getSession(request);
    // let userLevelId = Number(userData?.userLevelId);
    // let userRegion = Number(userData?.regionId);
    // let userDistrict = Number(userData?.districtId);
    // let userId = userData?.id;

  //  await logActivity("Visited submitted data list", userId);



//     let formId = Number(request?.query?.formId);
//     let published = Number(request?.query?.published);
//     let filterBy = request?.query?.filterBy;
//     let filterValue = request?.query?.filterValue;

    
//     let curPage = request.query.page;
//     let searchText = request.query.searchText.trim();

//     let perPage = 10;
//     let skip = Number((curPage - 1) * perPage) || 0;

//   const response = await prisma.basicInfoSection.findMany({
//     where:
//         searchText != ""
//           ? {
//               OR: [
//                 {
//                   ghanaPostGps: {
//                     contains: searchText,
//                     mode: "insensitive",
//                   },
//                 },
//                 {
//                   Inspection: {
//                     premisesCode: {
//                       contains: searchText,
//                       mode: "insensitive",
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     Region: {
//                       name: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     District: {
//                       name: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     User: {
//                       surname: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     User: {
//                       otherNames: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     Community: {
//                       name: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },
//                 {
//                   Inspection: {
//                     ElectoralArea: {
//                       name: { contains: searchText, mode: "insensitive" },
//                     },
//                   },
//                 },

               
//               ],

//               Inspection: {
//                 isPublished: published,
//                 inspectionFormId,
//                 // regionId: filterValue!="undefined"? Number(filterValue):"undefined",
//                 // districtId:  filterValue!="undefined"? Number(filterValue):"undefined",
//               },
//             }
//           : {
//               Inspection: {
//                 isPublished: published,
//                 inspectionFormId ,

//                 // regionId: filterValue!="undefined"? Number(filterValue):"undefined",
//                 // districtId:  filterValue!="undefined"? Number(filterValue):"undefined",
//               },
//             },
//       skip: skip,
//       take: perPage,
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         Inspection: {
//           include: {
//             InspectionType: true,
//           },
//         },
//         Community: {
//           include: {
//             ElectoralArea: {
//               include: {
//                 District: {
//                   include: {
//                     Region: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//         User: true,
//       },
//   });

  return new Response(JSON.stringify([{me:"ooop"}]));
}
