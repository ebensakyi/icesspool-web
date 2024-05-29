import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { createFailedResponse, createSuccessResponse } from "@/libs/response";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const data = {
      name: res?.name,
      status: Number(res?.status),
      serviceAreaId: Number(res?.serviceArea),
      serviceId: Number(res?.service),
      tankCapacity: Number(res?.tankCapacity),
      description: res?.description,
    };

    const response = await prisma.truckClassification.create({ data });

    // return NextResponse.json({ response, message: "Data submitted succesfully" });

    return createSuccessResponse(response, "Data submitted succesfully");
  } catch (error: any) {
    console.log(error);

    // let message = ""
    // if(error.code=="P2002"){
    //    message = "Service and Location combination already exist"
    // }

    // return NextResponse.json({ message: message }, { status: 500 });

    return createFailedResponse(error.code, 500);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const userId = session?.user?.id;
    const data = {
      name: res?.name,
      status: Number(res?.status),
      serviceAreaId: Number(res?.serviceArea),
      serviceId: Number(res?.service),
      tankCapacity: Number(res?.tankCapacity),
      description: res?.description,

    };
    await prisma.truckClassification.update({
      where: {
        id: Number(res?.id),
      },
      data,
    });

    return NextResponse.json({ message: "Data submitted succesfully" });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);


    let serviceId = Number(searchParams.get("serviceId"));
    let serviceAreaId = Number(searchParams.get("serviceAreaId"));

    const session: any = await getServerSession(authOptions);

    if (serviceId && serviceAreaId) {
      const response = await prisma.truckClassification.findMany({
        where: { deleted: 0, serviceId, serviceAreaId, status: 1 },
       
      });
      
      return NextResponse.json(response);
    }
    // await logActivity("Visited data assignment page", session?.user?.id);
    if (serviceId) {
      const response = await prisma.truckClassification.findMany({
        where: { deleted: 0, serviceId: serviceId },
        include: {
          Service: true,
          ServiceArea: true,
        },
      });
      return NextResponse.json({ response });
    }

    const response = await prisma.truckClassification.findMany({
      where: { deleted: 0 },
      include: {
        Service: true,
        ServiceArea: true,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
