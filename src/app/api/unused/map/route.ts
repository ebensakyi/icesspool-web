import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    return NextResponse.json([]);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let formId = Number(searchParams.get("formId")) || undefined;

    const data = await prisma.inspection.findMany({
      where: {
        isPublished: 1,
        inspectionFormId: formId,
      },
      include: {
        InspectionPictures:true,
        BasicInfoSection: true,
        District:true,
        Region: true,

        User: true,
        Community:{
          include: {
            ElectoralArea: true,
          },
        }
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
