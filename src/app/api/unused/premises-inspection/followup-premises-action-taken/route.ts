import { prisma } from "@/prisma/db";
import { FollowUpAction } from "@/typings";
import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data : FollowUpAction = {
        id: res.id,
  
        inspectionId: res.inspectionId,
        userId: Number(res.userId),
       
  
        actionId:  Number(res.actionId),
      };
  
  
      const response = await prisma.followupPremisesActionTaken.create({ data });
  

    return new Response(
      JSON.stringify({
        response,
      })
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {
  try {
    const res = await request.json();

    const data = await prisma.followupPremisesActionTaken.findMany({
        where: { deleted: 0 },
      });

    return new Response(JSON.stringify([{ data }]));
  } catch (error) {}
}
