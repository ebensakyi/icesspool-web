import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
// import { destroySession, setSession } from "../../../../../utils/session-manager";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    console.log(res);

    let phoneNumber = res.phoneNumber;
    let newPassword = res.newPassword;
    let oldPassword = res.oldPassword;

    let user = await prisma.user.findFirst({
      where: { phoneNumber, deleted: 0 },
    });

    
    if (!user) {
      return NextResponse.json(
        { message: "Wrong user account" },
        { status: 400 }
      );
    }

    let isValid = await bcrypt.compare(oldPassword, user.password);

    if (isValid) {
      const salt = await bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(newPassword, salt);
      let x = await prisma.user.update({
        where: { phoneNumber },
        data: { password: hashedPassword, passwordChanged: 1 },
      });

      return NextResponse.json(null, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 400 });
    }
  } catch (error: any) {
    console.log(error);
       return NextResponse.json({ message: error.message });
  }
}
