import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);

    const data = {
      status: Number(res?.status),
      cost: Number(res?.cost),
      standardCost: Number(res?.standardCost),
      largeCost: Number(res?.largeCost),
      biodigesterServiceId: Number(res?.biodigesterService),
      serviceAreaId: Number(res?.serviceArea),
    };


    

    const response = await prisma.biodigesterServicePricing.create({ data });

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
      cost: Number(res?.cost),
      standardCost: Number(res?.standardCost),
      largeCost: Number(res?.largeCost),
      biodigesterServiceId: Number(res?.biodigesterService),
      serviceAreaId: Number(res?.serviceArea),
    };

    await prisma.biodigesterServicePricing.update({
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

    let serviceAreaId =1// Number(searchParams.get("serviceAreaId"));

    let userId = Number(searchParams.get("userId"));
    let platform = Number(searchParams.get("platform"));

   
    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.biodigesterServicePricing.findMany({
      where: { deleted: 0 },
      include: {
        ServiceArea: true,
        BiodigesterService: {
          include: {
            BiodigesterType: true,
          },
        },
      },
    });

    if (platform == 2) {
      const response = await prisma.biodigesterServicePricing.findMany({
        where: { deleted: 0, status: 1, serviceAreaId: Number(serviceAreaId) },
        include: {
          ServiceArea: true,
          BiodigesterService: {
            include: {
              BiodigesterType: true,
            },
          },
        },
      });
      let res = await response.map((data) => ({
        id: data.id,
        biodigesterServiceId:data.biodigesterServiceId,
        name: data.BiodigesterService.name,
        cost: data.cost,
        standardCost: data.standardCost,
        largeCost: data.largeCost,
        type: data.BiodigesterService.BiodigesterType.name,
      }));

      
      return NextResponse.json(res);
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.log("----", error);

    return NextResponse.json(error);
  }
}
