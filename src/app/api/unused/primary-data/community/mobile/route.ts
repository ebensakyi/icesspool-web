export const dynamic = "force-dynamic";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
    
  
      const districtId = Number(searchParams.get("districtId"));

      console.log(districtId);
      

      const data = await prisma.community.findMany({
        where: { deleted: 0, districtId: Number(districtId) },
      });

  
      return NextResponse.json(
        data
       
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(error);
    }
  }
  