import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);



    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);

    const data = {
      status: Number(res?.status),
      insurance: Number(res?.insurance),
      repairCost: Number(res?.repairCost),
      roadWorthy: Number(res?.roadWorthy),
      unitFuelCost: Number(res?.unitFuelCost),
      workingDays: Number(res?.workingDays),
      truckDepreciation: Number(res?.truckDepreciation),
      adminCost: Number(res?.adminCost),
      overheadCost: Number(res?.overheadCost),
      toolsCost: Number(res?.toolsCost),
      profitPercentage: Number(res?.profitPercentage),
      pumpDepreciation: Number(res?.pumpDepreciation),

      truckClassificationId: Number(res?.truckClassification),
      fuelDistanceConst: Number(res?.fuelDistanceConst),

      serviceId: 1,
      regionId:Number(res?.region),

    };
    

    

    const response = await prisma.waterServicePricing.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const userId = session?.user?.id;
    const data = {
        status: Number(res?.status),
        insurance: Number(res?.insurance),
        repairCost: Number(res?.repairCost),
        roadWorthy: Number(res?.roadWorthy),
        unitFuelCost: Number(res?.unitFuelCost),
        workingDays: Number(res?.workingDays),
        truckDepreciation: Number(res?.truckDepreciation),
        adminCost: Number(res?.adminCost),
        overheadCost: Number(res?.overheadCost),
        toolsCost: Number(res?.toolsCost),
        profitPercentage: Number(res?.profitPercentage),
        pumpDepreciation: Number(res?.pumpDepreciation),
  
        truckClassificationId: Number(res?.truckClassification),
        fuelDistanceConst: Number(res?.fuelDistanceConst),
  
        serviceId: 1,
        regionId:Number(res?.region),
  
      };

      
    await prisma.waterServicePricing.update({
      where: {
        id: Number(res?.id),
      },
      data,
    });

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.waterServicePricing.findMany({
      where: { deleted: 0 },
      include:{
        Region:true,
        TruckClassification:true
      }
    });



    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
