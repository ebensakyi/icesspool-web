import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    

    let userId = res.userId;
    let fcmId = res.fcmId;


      const user = await prisma.user.update({
        where: { id: Number(userId) },
        data: { fcm: fcmId },
      });
   

    return NextResponse.json( { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
 
    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

