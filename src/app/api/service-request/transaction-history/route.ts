export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.transaction.findMany({
      where: { deleted: 0, customerId: userId },
      include: {
        BiodigesterTransaction: true,
        WaterTankerTransaction: true,
        ToiletTankerTransaction: true,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
