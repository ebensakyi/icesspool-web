import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { createFailedResponse, createSuccessResponse } from "@/libs/response";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const data = {
      status: Number(res?.status),
      regionId: Number(res?.region),
      serviceId: Number(res?.service),

    };


    const response = await prisma.serviceLocation.create({ data });

    // return NextResponse.json({ response, message: "Data submitted succesfully" });

    return createSuccessResponse(response, "Data submitted succesfully")
  } catch (error: any) {
    // let message = ""
    // if(error.code=="P2002"){
    //    message = "Service and Location combination already exist"
    // }

    // return NextResponse.json({ message: message }, { status: 500 });

    return createFailedResponse(error.code, 500)
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);



    const userId = session?.user?.id;
    const data = {
      status: Number(res?.status),
      regionId: Number(res?.region),
      serviceId: Number(res?.service),

    };
    await prisma.serviceLocation.update({
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

    let userId = Number(searchParams.get("userId"));

    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.serviceLocation.findMany({
      where: { deleted: 0 },
      include: {
        Service: true,
        Region: true
      }
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
