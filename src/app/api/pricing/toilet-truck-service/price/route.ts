export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { calculateDeludgingPrice } from "@/libs/pricing";
import { getUserArea } from "@/libs/user-service-area";
// import { authOptions } from "../../auth/[...nextauth]/options";

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
//     const session: any = await getServerSession(authOptions);

//     // const userId = session?.user?.id;

//     // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);

//     const data = {
//       status: Number(res?.status),
//       insurance: Number(res?.insurance),
//       repairCost: Number(res?.repairCost),
//       roadWorthy: Number(res?.roadWorthy),
//       unitFuelCost: Number(res?.unitFuelCost),
//       workingDays: Number(res?.workingDays),
//       truckDepreciation: Number(res?.truckDepreciation),
//       AdminCost: Number(res?.AdminCost),
//       OverheadCost: Number(res?.OverheadCost),
//       ToolsCost: Number(res?.ToolsCost),
//       profitPercentage: Number(res?.profitPercentage),
//       pumpDepreciation: Number(res?.pumpDepreciation),

//       truckClassificationId: Number(res?.truckClassification),
//       fuelDistanceConst: Number(res?.fuelDistanceConst),

//       serviceId: 1,
//       regionId:Number(res?.region),

//     };

//     const response = await prisma.toiletTruckServicePricing.create({ data });

//     return NextResponse.json(response);
//   } catch (error: any) {
//     console.log(error);

//     return NextResponse.json(error, { status: 500 });
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     const res = await request.json();
//     const session: any = await getServerSession(authOptions);

//     const userId = session?.user?.id;
//     const data = {
//         status: Number(res?.status),
//         insurance: Number(res?.insurance),
//         repairCost: Number(res?.repairCost),
//         roadWorthy: Number(res?.roadWorthy),
//         unitFuelCost: Number(res?.unitFuelCost),
//         workingDays: Number(res?.workingDays),
//         truckDepreciation: Number(res?.truckDepreciation),
//         AdminCost: Number(res?.AdminCost),
//         OverheadCost: Number(res?.OverheadCost),
//         ToolsCost: Number(res?.ToolsCost),
//         profitPercentage: Number(res?.profitPercentage),
//         pumpDepreciation: Number(res?.pumpDepreciation),

//         truckClassificationId: Number(res?.truckClassification),
//         fuelDistanceConst: Number(res?.fuelDistanceConst),

//         serviceId: 1,
//         regionId:Number(res?.region),

//       };

//     await prisma.toiletTruckServicePricing.update({
//       where: {
//         id: Number(res?.id),
//       },
//       data,
//     });

//     return NextResponse.json({ status: 200 });
//   } catch (error: any) {
//     console.log(error);

//     return NextResponse.json(error, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    // 5.601454,-0.169431
    let userId = Number(searchParams.get("userId"));
    let userLatitude = Number(searchParams.get("userLatitude"));
    let userLongitude = Number(searchParams.get("userLongitude"));
    let tripsNumber = Number(searchParams.get("tripsNumber"));
    let serviceArea = Number(searchParams.get("serviceAreaId"));

    let userLocation = [userLatitude, userLongitude];

    

    // let userArea = await getUserArea([userLatitude, userLongitude]);

    // console.log("userArea==> " + userArea);
    

    // let serviceArea = Number(userArea?.serviceAreaId)
    // if (!userArea) {
    //   return NextResponse.json({message: "Not in service area"});
    // }

    const pricingModel = await prisma.toiletTruckServicePricing.findMany({
      where: {
        deleted: 0,
        serviceAreaId: serviceArea,
      },
      include: {
        Region: true,
        TruckClassification: true,
      },
    });

    

    let response = await calculateDeludgingPrice(
      pricingModel,
      userLocation,
      serviceArea,
      tripsNumber
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
