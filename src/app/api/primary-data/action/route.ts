import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.name,
    };
    const response = await prisma.action.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    
    return NextResponse.json(error,{status:500});
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.action.findMany({
      where: { deleted: 0 },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
