import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

import { authOptions } from "../../auth/[...nextauth]/options";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";



export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

  //   let changePassword = res.changePassword;
  //   let phoneNumber = res.phoneNumber;
  // let user: any = await prisma.user.findFirst({
  //       where: { phoneNumber: phoneNumber },
  //     });

  //   if (changePassword == 1) {
    
  //     let isValid = await bcrypt.compare(res.currentPassword, user.password);

  //     if (!isValid) {
  //       return NextResponse.json(
  //         { message: "Wrong current password" },
  //         { status: 201 }
  //       );
  //     }

  //     const salt = bcrypt.genSaltSync(10);
  //     let hashedPassword = bcrypt.hashSync(res.newPassword, salt);

  //     const data = {
  //       password: hashedPassword,
  //       passwordChanged: 1,
  //     };

  //     await prisma.user.update({
  //       data: data,
  //       where: {
  //         id: user?.id,
  //       },
  //     });

  //     return NextResponse.json({ message: "Password changed" });
  //   }

  //   const data = {
  //     surname: res.surname,
  //     otherNames: res.otherNames,
  //     email: res.email,
  //     phoneNumber: res.phoneNumber,
  //   };

  //   await prisma.user.update({
  //     data: data,
  //     where: {
  //       id: user?.id,
  //     },
  //   });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
