import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const data = {
      name: res.name,
    };
    const response = await prisma.waterTreatmentType.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.waterTreatmentType.findMany({
      where: { deleted: 0 },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("HERE IS THE ERROR ", error);
    
    return NextResponse.json(error);
  }
}
