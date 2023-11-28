export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { calculateDeludgingPrice } from "@/libs/pricing";
import { isServiceAvailableInUserLocation } from "@/libs/is-in-city";
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

//     const response = await prisma.desludgingServicePricing.create({ data });

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

//     await prisma.desludgingServicePricing.update({
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
    let userLatitude = 5.601454; // Number(searchParams.get("latitude"));
    let userLongitude = -0.169431; //Number(searchParams.get("longitude"));
    let tripsNumber = Number(searchParams.get("userId"));

    let price;

    const pricingModel = await prisma.desludgingServicePricing.findMany({
      where: {
        deleted: 0,
        // TruckClassification: {
        //   status: 1,
        // },
      },
      include: {
        Region: true,
        TruckClassification: true,
      },
    });


    console.log("pricingModel=====> ",pricingModel);
    

    ////////////////check if icesspool is available at users location

    // const cityCoordinates = [5.736477, -0.104436];

    // Example GPS coordinates
    // const gpsCoordinatesInsideCity = [5.606564, -0.158467]; // Coordinates inside New York
    // const gpsCoordinatesOutsideCity = [5.692319, -0.466085]; // Coordinates outside New York

    const userLocation = [Number(userLatitude), Number(userLongitude)];

    let isInWhichServiceArea = await isServiceAvailableInUserLocation(
      userLocation
    );
    if (isInWhichServiceArea) {
      //consider type of service
      //if is in one of icesspool service area, get pricing using closest service point in service area from user locatoin
      console.log("The GPS coordinates are within the specified city.");

      price = await calculateDeludgingPrice(pricingModel,userLocation, tripsNumber);

    } else {
      console.log("The GPS coordinates are outside the specified city.");
    }

    return NextResponse.json({ price });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
