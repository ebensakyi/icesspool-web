import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const data = {
      name: res?.name,
      status: Number(res?.status),
      latitude: Number(res?.latitude),
      longitude: Number(res?.longitude),
      address: res?.address,
      serviceId: Number(res?.service),
      serviceAreaId: Number(res?.serviceArea)
    };


    const response = await prisma.servicePoint.create({ data });

    return NextResponse.json({ response, message: "Data submitted succesfully" });
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
      name: res?.name,
      latitude: Number(res?.latitude),
      longitude: Number(res?.longitude),
      address: res?.address,
      serviceId: Number(res?.service),
      serviceAreaId: Number(res?.serviceArea),
      status: Number(res?.status),
    };
    await prisma.servicePoint.update({
      where: {
        id: Number(res?.id),
      },
      data,
    });

    return NextResponse.json({  message: "Data submitted succesfully" });
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

    const response = await prisma.servicePoint.findMany({
      where: { deleted: 0 },
      include: {
        Service: true,
        ServiceArea:true
      }
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
