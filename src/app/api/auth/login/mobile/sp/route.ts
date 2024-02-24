import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const res = await request.json();


    let phoneNumber = res.phoneNumber;
    let password = res.password;

    const user: any = await prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        userTypeId:3,
        deleted: 0,
      },
     // include: { ServiceArea: true, ServiceProvider: true },
    });


    if (!user) {
      return NextResponse.json(null, { status: 400 });
    }

    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      //const token = jwt.sign(user, process.env.TOKEN_SECRET ?? "");

      // return NextResponse.json({ ...user, token, privileges });
      return NextResponse.json(user);
    }
    return NextResponse.json(null, { status: 400 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {}
