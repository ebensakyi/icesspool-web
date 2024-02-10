import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      let { searchParams } = new URL(request.url);
  
      let userId = Number(searchParams.get("userId"));
  
      const session: any = await getServerSession(authOptions);
  
      // await logActivity("Visited data assignment page", session?.user?.id);
  
      const response = await prisma.biodigesterService.findMany({
        where: { deleted: 0 },
        include: {
          Service: true,
          BiodigesterType: true,
        },
      });
  
      return NextResponse.json({ response });
    } catch (error) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  