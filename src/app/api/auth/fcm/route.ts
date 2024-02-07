import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let userId = res.userId;
    let fcmId = res.fcmId;

    const user : any = await prisma.user.update({
        where: {
          id: userId,
        },
        data:{fcmId:fcmId}
       // include: { Region: true, District: true,UserRole:true },
      });
  

  
    return NextResponse.json(null, { status: 400 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}