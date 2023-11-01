import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    return NextResponse.json([]);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let status =
    searchParams.get("status") == "2" ||
    searchParams.get("status") == "1" ||
    searchParams.get("status") == "0"
      ? Number(searchParams.get("status"))
      : undefined;


    const data = await prisma.sanitationReport.findMany({
      where: {
        deleted: 0,
        status: status,
      },
      include: {
        District: true,
      },
    });

  
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
