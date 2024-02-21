import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { generateCode } from "@/libs/generate-code";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let phoneNumber = res.phoneNumber;
    let resetCode = res.resetCode;
    let password = res.password;

    const user : any = await prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        deleted: 0,
      },
    });

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
    }

    // console.log(user);

    // if(user?.passwordChanged==0){
    //   return NextResponse.redirect("/goto");

    // }

    if (!user) {
      return NextResponse.json(
        {
          message: "User Account not found.\nCheck phone number, reset code and try again",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
