import { prisma } from "@/prisma/db";
import { FollowUpNuisances } from "@/typings";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data: FollowUpNuisances = {
      id: res.id,
      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      nuisanceId: Number(res.nuisanceId),
    };

    const response = await prisma.followupPremisesNuisanceDetected.create({ data });

    return new Response(
      JSON.stringify({
        response,
      })
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});

    const data = await prisma.followupPremisesNuisanceDetected.findMany({
        where: { deleted: 0 },
      });

    return  NextResponse.json(data);
  } catch (error) {}
}
