import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      id: res.id,

      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      officerComment:
        res.officerComment == "null" ? null : res.officerComment,

      obnoxiousTradeExistId:
        res.obnoxiousTradeExistId == "null"
          ? null
          : Number(res.obnoxiousTradeExistId),

      obnoxiousTrade:
        res.obnoxiousTrade == "null" ? null : res.obnoxiousTrade,

      isNuisanceObservedId:
        res.isNuisanceObservedId == "null"
          ? null
          : Number(res.isNuisanceObservedId),
     
    };

    const response = await prisma.conclusionSection.create({ data });

    return NextResponse.json(response);

  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error,{ status: 500 });

  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});
    
    const data = await prisma.conclusionSection.findMany({
      where: { userId: userId, deleted: 0 },
    });


    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(error,{ status: 500 });

  }
}
