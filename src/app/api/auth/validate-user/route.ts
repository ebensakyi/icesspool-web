import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let userId = Number(res.userId);
    let phoneNumber = res.phoneNumber;
    let code = res.code;

    const otp = await prisma.otp.findFirst({
      where: { userId: userId, code },
      include: { User: true },
    });
    if (otp) {
      await prisma.otp.delete({
        where: { id: otp.id },
      });
      const user: any = await prisma.user.update({
        data: {
          activated: 1,
        },
        where: { id: userId },
      });

      let data =  {
        id: otp.userId,
        phoneNumber: otp.User.phoneNumber,
        firstName: otp.User.firstName,
        lastName: otp.User.lastName,
      }

      
      return NextResponse.json(
       data,
        { status: 200 }
      );
    }

    return NextResponse.json(null, { status: 400 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function GET(request: Request) {}
