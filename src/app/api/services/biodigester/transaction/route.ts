import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const res = await request.json();
      const session: any = await getServerSession(authOptions);

      console.log(res);
      
  
      // const userId = session?.user?.id;
  
      // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);
  
      
    //   const data = {
    //     status: Number(res?.status),
    //     cost: Number(res?.cost),
    //     biodigesterServiceId: Number(res?.biodigesterService),
    //     serviceAreaId: Number(res?.serviceArea),
    //   };
  
    //   const response = await prisma.biodigesterServicePricing.create({ data });
  
      return NextResponse.json({});
    } catch (error: any) {
      console.log(error);
  
      return NextResponse.json(error, { status: 500 });
    }
  }