import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

    
   // await logActivity("Water Sources Report generated",  userCookie.id);

    let filterBy = res.filterBy;
    let filterValue = Number(res.filterValue);
    let fromDate = new Date(res.from);
    let toDate = new Date(res.to);

    const report = await prisma.premisesWaterSources.groupBy({
      where: {
        WaterSection: {
          Inspection: {
            [filterBy]: filterValue,
          },
        },
      },
      by: ["waterSourceId"],
      _count: {
        waterSourceId: true
         
      },
    //   orderBy: {
    //     _count: {
    //       waterSourceId: "desc",
    //     },
    //   },
    });
        
  
      return NextResponse.json(report);
    } catch (error: any) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  