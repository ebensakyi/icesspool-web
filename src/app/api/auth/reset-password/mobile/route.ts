import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";
import { sendSMS } from "@/libs/send-hubtel-sms";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let phoneNumber = res.phoneNumber;
    let resetCode = res.resetCode;
    let password = res.password;

    const otp: any = await prisma.otp.findFirst({
      where: {
        code: resetCode,
        deleted: 0,
      },
    });
    

    if (!otp) {
      return NextResponse.json("Wrong reset code entered", { status: 201 });
    }

    const user: any = await prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        deleted: 0,
      },
    });

    if (!user) {
      return NextResponse.json("User account not found", { status: 201 });
    }

    
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(password, salt);

      const data = {
        password: hashedPassword,
        passwordChanged: 1,
      };




      await prisma.user.update({
        data: data,
        where: {
          id: user?.id,
        },
      });

      await prisma.otp.delete({
        where: {
          id: otp?.id,
        },
      });
    }

    // if (!user) {
    //   return NextResponse.json(
    //     {
    //       message: "User Account not found.\nCheck phone number, reset code and try again",
    //     },
    //     { status: 201 }
    //   );
    // }

    return NextResponse.json(null, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
