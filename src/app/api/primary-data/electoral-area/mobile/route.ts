export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const districtId = Number(searchParams.get("districtId"));

    console.log("districtId ", districtId);
    

    const data = await prisma.electoralArea.findMany({
      where: { deleted: 0, districtId: Number(districtId) },
    });

    console.log("dax", data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
