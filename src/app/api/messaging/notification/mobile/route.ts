import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { sendFCM } from "@/utils/send-fcm";

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    // const session: any = await getServerSession(authOptions);
    const data = await prisma.messaging.update({
      where: {
        id: Number(res?.msgId),
      },
      data: {
        isViewed: 1,
      },
    });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    const data = await prisma.messaging.findMany({
      where: {
        deleted: 0,
        messageType: 1,
        OR: [
          { districtId: user?.districtId },
          { sendingType: 4 },
          { individualRecipient: userId },
          { regionId: Number(user?.regionId) },
        ],
      },
      // include: {
      //   SendingType: true,
      //   District: true,
      //   Region: true,
      //   Recipient: true,
      // },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
