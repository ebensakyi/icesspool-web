import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { generateCode } from "@/libs/generate-code";
import { sendSMS } from "@/libs/send-hubtel-sms";
// import { destroySession, setSession } from "../../../../../utils/session-manager";

export async function POST(request: Request) {
  const res = await request.json();

  let userId = Number(res.userId);

  const user: any = await prisma.user.findFirst({
    where: { id: userId },
  });


  const oldOtp: any = await prisma.otp.findFirst({
    where: { userId: userId },
  });

  if (oldOtp) {
    await prisma.otp.delete({
      where: { id: oldOtp?.id },
    });
  }


  let code: any = await generateCode(4);

  const otp: any = await prisma.otp.create({
    data: {
      code: code,
      userId: userId,
    },
  });

  sendSMS(user.phoneNumber, `Use this code to verify your account: ${code}`);
  return NextResponse.json(null, { status: 400 });
}
