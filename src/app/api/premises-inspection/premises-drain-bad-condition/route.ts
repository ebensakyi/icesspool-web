import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data:any = {
        id: res.id,
  
        inspectionId: res.inspectionId,
        userId: Number(res.userId),
        drainBadConditionId: Number(res.drainBadConditionId),
  
        liquidWasteSectionId: res.liquidWasteSectionId,
      };
  
      const response = await prisma.premisesDrainBadCondition.create({ data });
    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));



    if (!userId) return NextResponse.json({});

    const response = await prisma.premisesDrainBadCondition.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error,{status:500});
  }
}
