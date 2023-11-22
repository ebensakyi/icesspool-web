import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { calculateDeludgingPrice } from "@/libs/pricing";
import { isInCity } from "@/libs/icesspool-availabilty";
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

    let userId = Number(searchParams.get("userId"));

    // const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const pricingData = await prisma.desludgingServicePricing.findMany({
      where: {
        deleted: 0,
        TruckClassification: {
          status: 1,
        },
      },
      include: {
        Region: true,
        TruckClassification: true,
      },
    });



    ////////////////check if icesspool is available at users location

    const cityCoordinates = [5.736477, -0.104436];

    // Example GPS coordinates
    const gpsCoordinatesInsideCity = [5.606564, -0.158467]; // Coordinates inside New York
    const gpsCoordinatesOutsideCity = [5.692319, -0.466085]; // Coordinates outside New York
    
    const cityRadiusKm = 40; // Adjust this based on the radius you want to consider for the city
    let isIn = await isInCity(gpsCoordinatesOutsideCity, cityCoordinates, cityRadiusKm)
    if (isIn) {
      console.log("The GPS coordinates are within the specified city.");
    } else {
      console.log("The GPS coordinates are outside the specified city.");
    }
    

    let response = await calculateDeludgingPrice(pricingData);

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
