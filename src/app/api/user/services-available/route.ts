import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";


export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let serviceAreaId = Number(searchParams.get("serviceAreaId"));


    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.servicesInArea.findMany({
      where: { deleted: 0, serviceAreaId: serviceAreaId},
      select:{
        serviceId:true
      }
    });

    let res = response.map(res => res.serviceId)


    return NextResponse.json(res);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
