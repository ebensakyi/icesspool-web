import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    
    const session: any = await getServerSession(authOptions);

    const data = {
      serviceAreaId: Number(res?.serviceArea),
      serviceId: Number(res?.service),
      icesspoolCommission: Number(res?.icesspoolCommission),
      platformCommission: Number(res?.platformCharges),
      paymentCharges: Number(res?.paymentCharges),

    };

   

    const response = await prisma.serviceCharges.create({ data });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    
    const data = {
      serviceAreaId: Number(res?.serviceArea),
      serviceId: Number(res?.service),
      icesspoolCommission: Number(res?.icesspoolCommission),
      platformCommission: Number(res?.platformCharges),
      paymentCharges: Number(res?.paymentCharges),

    };
    // const response = await prisma.serviceCharges.findFirst({
    //     where: { deleted: 0 },
    //   });
    
    await prisma.serviceCharges.update({
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

    const response = await prisma.serviceCharges.findMany({
      where: { deleted: 0 },
      include:{
        Service:true,
        ServiceArea:true,
      }
    });

    

    return NextResponse.json({response});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
