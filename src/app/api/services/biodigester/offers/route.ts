export const dynamic = "force-dynamic";

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
  
      const response = await prisma.transaction.findMany({
        where: { deleted: 0,  serviceId: 3, },
        include: {
          
          BiodigesterTransaction: true,
          Customer:true,
          ServiceProvider: true,
          ServiceArea: true,
        },
      });
  

      console.log(response);
      
      return NextResponse.json({ response });
    } catch (error) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  