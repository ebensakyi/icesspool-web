import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

      //  await logActivity("Action summaries report generated",  userCookie.id);
    
        let filterBy = res?.filterBy;
        let filterValue = Number(res.filterValue);
        let fromDate = new Date(res?.from);
        let toDate = new Date(res?.to);
    
        const report = await prisma.premisesActionTaken.groupBy({
          where: {
            ConclusionSection: {
              Inspection: {
                [filterBy]: filterValue,
              },
            },
          },
          by: ["actionId"],
          _count: {
            actionId: true,
          },
          orderBy: {
            _count: {
              actionId: "desc",
            },
          },
        });

        console.log(report);
        
  
      return NextResponse.json(report);
    } catch (error: any) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  