import {prisma} from "@/prisma/db";
import { AnyLengthString } from "aws-sdk/clients/comprehend";

// export const toiletAvailability = async (filterBy, filterValue) => {
    
//     let safe = await prisma.liquidWasteSection.count({
//       where:
//         filterBy == "undefined"
//           ? {
//               deleted: 0,
//               toiletAdequacyId: 1,
            
//             }
//           : {
//               deleted: 0,
//               toiletAdequacyId: 1,
//               Inspection: {
//                 [filterBy]: filterValue,
//               },
//             },
//     });
//     let unsafe = await prisma.waterSection.count({
//       where:
//       filterBy == "undefined"
//         ? {
//             deleted: 0,
//             toiletAdequacyId: 2,
          
//           }
//         : {
//             deleted: 0,
//             toiletAdequacyId: 2,
//             Inspection: {
//               [filterBy]: filterValue,
//             },
//           },
//     });
  
//     return [
//       { label: "Safe", value: safe },
//       { label: "Unsafe", value: unsafe },
//     ];
//   };

  export const toiletAdequacy = async (filterBy:any, filterValue:any) => {
    
    let adequate = await prisma.liquidWasteSection.count({
      where:
        filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAdequacyId: 1,
            
            }
          : {
              deleted: 0,
              toiletAdequacyId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
    });
    let inadequate = await prisma.liquidWasteSection.count({
      where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            toiletAdequacyId: 2,
          
          }
        : {
            deleted: 0,
            toiletAdequacyId: 2,
            Inspection: {
              [filterBy]: Number(filterValue),
            },
          },
    });
  
    return [
      { label: "Adequate", value: adequate },
      { label: "Inadequate", value: inadequate },
    ];
  };

  export const toiletCondition = async (filterBy:any, filterValue:any) => {
    
    let safe = await prisma.liquidWasteSection.count({
      where:
        filterBy == "undefined"
          ? {
              deleted: 0,
              toiletConditionId: 1,
            
            }
          : {
              deleted: 0,
              toiletConditionId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
    });
    let unsafe = await prisma.liquidWasteSection.count({
      where:
      filterBy == "undefined"
        ? {
            deleted: 0,
            toiletAdequacyId: 2,
          
          }
        : {
            deleted: 0,
            toiletAdequacyId: 2,
            Inspection: {
              [filterBy]: Number(filterValue),
            },
          },
    });
  
    return [
      { label: "Safe", value: safe },
      { label: "Unsafe", value: unsafe },
    ];
  };

  export const toiletAvailability = async (filterBy:any,filterValue:any) => {
    let toiletAvailabilityCount1 =
      await prisma.residentialPremisesInfoSection.count({
         where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
       
      });
    let toiletAvailabilityCount2 = await prisma.eateryPremisesInfoSection.count({
      where: filterBy == "undefined"
      ? {
          deleted: 0,
          toiletAvailabilityId: 1,
        }
      : {
          deleted: 0,
          toiletAvailabilityId: 1,
          Inspection: {
            [filterBy]: Number(filterValue),
          },
        },
    });
    let toiletAvailabilityCount3 = await prisma.healthPremisesInfoSection.count({
      where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
    });
    let toiletAvailabilityCount4 =
      await prisma.hospitalityPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletAvailabilityCount5 = await prisma.sanitaryPremisesInfoSection.count({
      where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
          }
    );
    let toiletAvailabilityCount6 = await prisma.marketPremisesInfoSection.count({
      where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
    });
    let toiletAvailabilityCount7 =
      await prisma.institutionPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletAvailabilityCount8 = await prisma.industryPremisesInfoSection.count(
      {
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 1,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 1,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      }
    );
    let toiletInavailabilityCount1 =
      await prisma.residentialPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletInavailabilityCount2 = await prisma.eateryPremisesInfoSection.count(
      {
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      }
    );
    let toiletInavailabilityCount3 = await prisma.healthPremisesInfoSection.count(
      {
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      }
    );
    let toiletInavailabilityCount4 =
      await prisma.hospitalityPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletInavailabilityCount5 =
      await prisma.sanitaryPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletInavailabilityCount6 = await prisma.marketPremisesInfoSection.count(
      {
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      }
    );
    let toiletInavailabilityCount7 =
      await prisma.institutionPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
    let toiletInavailabilityCount8 =
      await prisma.industryPremisesInfoSection.count({
          where: filterBy == "undefined"
          ? {
              deleted: 0,
              toiletAvailabilityId: 2,
            }
          : {
              deleted: 0,
              toiletAvailabilityId: 2,
              Inspection: {
                [filterBy]: Number(filterValue),
              },
            },
      });
  
    let toiletAvailabilityCount =
      toiletAvailabilityCount1 +
      toiletAvailabilityCount2 +
      toiletAvailabilityCount3 +
      toiletAvailabilityCount4 +
      toiletAvailabilityCount5 +
      toiletAvailabilityCount6 +
      toiletAvailabilityCount7 +
      toiletAvailabilityCount8;
  
    let toiletInavailabilityCount =
      toiletInavailabilityCount1 +
      toiletInavailabilityCount2 +
      toiletInavailabilityCount3 +
      toiletInavailabilityCount4 +
      toiletInavailabilityCount5 +
      toiletInavailabilityCount6 +
      toiletInavailabilityCount7 +
      toiletInavailabilityCount8;
  
    return [
      { label: "Toilet Available", value: toiletAvailabilityCount },
      { label: "Toilet Not Available", value: toiletInavailabilityCount },
    ];
  };
  

  function toJson(data:any) {
    return JSON.parse(
      JSON.stringify(data, (_, v) =>
        typeof v === "bigint" ? `${v}n` : v
      ).replace(/"(-?\d+)n"/g, (_, a) => a)
    );
  }
  