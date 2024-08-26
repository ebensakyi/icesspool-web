export const dynamic = "force-dynamic";

import { getUserArea } from "@/libs/user-service-area";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
export async function GET(request: Request) {
  try {
     const session :any= await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);

    const response = await prisma.servicePoint.findMany({
      where: {
        deleted: 0,
      },
     
    });


    return NextResponse.json({
      response,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
