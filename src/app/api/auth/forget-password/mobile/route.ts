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

    let phoneNumber = res.phoneNumber;

    console.log(phoneNumber);
    

    const user : any = await prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
        deleted: 0,
      },
    });


    // if(user?.passwordChanged==0){
    //   return NextResponse.redirect("/goto");

    // }

    if (!user) {
      return NextResponse.json(
       0
      );
    }


    let code: string = await generateCode(6) as string;
    await prisma.otp.create({
      data: {
        code: code,
        userId:user.id
      },
     
    });
    // await prisma.user.update({
    //   data: {
    //     password: password,
    //   },
    //   where: {
    //     id: user?.id,
    //     deleted: 0,
    //   },
    // });
  await sendSMS(user?.phoneNumber, `Enter the reset code to reset your password ${code}`);


   return NextResponse.json(null, { status: 200 });

   //return NextResponse.redirect(new URL('/auth/reset-password',request.url));

  } catch (error: any) {
    console.log(error);
    return  NextResponse.json({ message: error.message });
  }
}
