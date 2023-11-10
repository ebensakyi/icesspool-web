import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";

export async function GET(request: Request) {
  try {
    const response = await prisma.reportCategory.findMany({
      where: { deleted: 0 },
    
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
