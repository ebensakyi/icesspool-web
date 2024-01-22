import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";
import { generateCode } from "@/libs/generate-code";
import { sendSMS } from "@/libs/send-hubtel-sms";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let firstName = res.firstName;
    let lastName = res.lastName;
    let phoneNumber = res.phoneNumber;
    let password = res.password;

    const userExists = await prisma.user.count({ where: { phoneNumber } });
    if (userExists) {
      return NextResponse.json(null, { status: 401 });
    }

    const user: any = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        password,
        userTypeId: 4,
      },
    });

    if (!user) {
      return NextResponse.json(null, { status: 400 });
    }
    let code: any = await generateCode(4);

    const otp: any = await prisma.otp.create({
      data: {
        code: code,
        userId: user.id,
      },
    });

   // sendSMS(phoneNumber,`Use this code to verify your account: ${code}`)

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {}
