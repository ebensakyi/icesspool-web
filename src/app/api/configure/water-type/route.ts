export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";



export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
  
    let userId = Number(searchParams.get("userId"));

    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.waterType.findMany({
      where: { deleted: 0 },
     
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
