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
   
    let user;

    user = await prisma.sanitationReportUser.findFirst({
      where: {
        phoneNumber: phoneNumber,
        deleted: 0,
      },
    });

    if (!user) {
      user = await prisma.sanitationReportUser.create({
        data: {
          phoneNumber: phoneNumber,
        },
      });
      return NextResponse.json(user);
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {}
