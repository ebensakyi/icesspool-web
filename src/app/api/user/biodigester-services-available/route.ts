export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    // let serviceAreaId = Number(searchParams.get("serviceAreaId"));

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.biodigesterService.findMany({
      where: { deleted: 0, status: 1 },
      select: {
        id: true,
      },
    });

    

    let res = response.map((res) => res.id);
    console.log("BIODI - SERV - AVAIL",res);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
