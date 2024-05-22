import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    

    let userId = res.userId;
    let fcmId = res.fcmId;

    const user: any = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: { fcmId: fcmId },
    });

    return NextResponse.json({userId,fcmId});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
