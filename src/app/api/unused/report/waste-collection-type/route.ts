import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

    


  // await logActivity("Water Collection Type Report generated",  userCookie.id);

    let filterBy = res?.filterBy;
    let filterValue = Number(res?.filterValue);
    let fromDate = new Date(res?.from);
    let toDate = new Date(res?.to);

    const report = await prisma.solidWasteSection.groupBy({
      where: {
          Inspection: {
            [filterBy]: filterValue,
          
        },
      },
      by: ["wasteCollectionTypeId"],
      _count: {
        wasteCollectionTypeId: true
         
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
  