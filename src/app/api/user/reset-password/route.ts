import { generateCode } from "@/libs/generate-code";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/db";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { append_233 } from "@/libs/append-233";
import { NextResponse } from "next/server";
import { logActivity } from "@/libs/log";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    // const session :any= await getServerSession(authOptions);
    // let userId = session?.user?.id;

    // let phoneNumber = res.phoneNumber;
    // let password: any = await generateCode(8);
    // await logActivity(`Reset Password of ${phoneNumber}`, userId);

    // const salt = bcrypt.genSaltSync(10);
    // let hashedPassword = bcrypt.hashSync(password, salt);

    // let user = await prisma.user.findFirst({
    //   where: { phoneNumber },
    //   include: { District: true },
    // });

    // if (!user) {
    //   return NextResponse.json({}, { status: 400 });
    // }

    // if (user) {
    //   await prisma.user.update({
    //     where: { phoneNumber },
    //     data: { password: hashedPassword, passwordChanged: 0 },
    //   });

    //   let pr = await prisma.passwordResetRequest.findFirst({
    //     where: { userId: user.id },
    //   });

    //   if (pr != null) {
    //     await prisma.passwordResetRequest.delete({
    //       where: { id: pr.id },
    //     });
    //   }

    //   await prisma.passwordResetRequest.create({
    //     data: { tempPassword: password, userId: Number(user.id) },
    //   });

    //   phoneNumber = await append_233(phoneNumber);

    //   await sendSMS(
    //     phoneNumber,
    //     `Your new temporal password for ESICApps is ${password}`
    //  );

      //return NextResponse.json(user);
      return NextResponse.json({});
  } catch (error) {
    console.log(error);
  }
}
