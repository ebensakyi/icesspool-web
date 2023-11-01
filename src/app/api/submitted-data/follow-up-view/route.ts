import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import ElectoralArea from "../../../../components/primary-data/ElectoralArea";

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    // console.log("Session ", session);
    let userId = session?.user?.id;

    const res = await request.json();

    let inspectionId = res.id;

    let inspection = await prisma.inspection.findFirst({
      where: {
        id: inspectionId,
      },
    });
    let isPublished = inspection?.isPublished || 0;

    await prisma.inspection.update({
      data: {
        isPublished: Math.abs(isPublished - 1),
        publishedById: Number(userId),
      },
      where: {
        id: inspectionId,
      },
    });
    await logActivity(`Published inspection ${inspectionId}`, userId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    // console.log("Session ", session);
    let userId = session?.user?.id;
    let surname = session?.user?.surname;

    let { searchParams } = new URL(request.url);
    let inspectionId: any = searchParams.get("id")?.toString();
    // let published: string | undefined = searchParams
    //   .get("published")
    //   ?.toString();

    // let inspectionFormId: string | undefined = searchParams
    //   .get("inspectionFormId")
    //   ?.toString();
    await logActivity(
      `Visited followup dataview page for ${inspectionId}`,
      userId
    );

    const data = await prisma.followUpInspection.findFirst({
      where: {
        deleted: 0,

        id: inspectionId,
      },
      include: {
        InspectionForm: true,
        User: true,
        District: {
          include: {
            Region: true,
          },
        },
        ElectoralArea: true,
        Community: true,
        FollowUpInspectionPictures: {
          include: { FormSectionImage: true },
        },
      },
    });

    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(">>>>>>> ", error);

    return NextResponse.json(error, { status: 500 });
  }
}
