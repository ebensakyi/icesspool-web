export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    const session: any = await getServerSession(authOptions);

    let userId = Number(searchParams.get("userId"));
    let serviceId = Number(searchParams.get("serviceId"));

    let userServiceArea = Number(session?.user?.serviceAreaId);

    // console.log(session);
    
    // console.log("userServiceArea",userServiceArea);
    // console.log("serviceId",serviceId);

    if (userServiceArea == 1) {
      const response = await prisma.truckClassification.findMany({
        where: { deleted: 0,serviceId},
      });

      return NextResponse.json({ response });
    }

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.truckClassification.findMany({
      where: {
        deleted: 0,
        serviceAreaId: userServiceArea,
        serviceId: serviceId,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
