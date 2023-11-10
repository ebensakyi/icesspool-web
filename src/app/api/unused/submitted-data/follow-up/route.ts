export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //  const res = await request.json();

    // let userLevelId = Number(userData?.userLevelId);
    // let userRegion = Number(userData?.regionId);
    // let userDistrict = Number(userData?.districtId);
    // let userId = userData?.id;

    // await logActivity("Visited submitted data list", userId);

    let { searchParams } = new URL(request.url);

    let formId = Number(searchParams.get("formId")) || 1;

    let published = Number(searchParams.get("published"));
    // let deleted = Number(searchParams.get("deleted"));

    let filterBy = searchParams.get("filterBy");
    let filterValue = searchParams.get("filterValue");
    let curPage = Number.isNaN(Number(searchParams.get("page")))?1: Number(searchParams.get("page"));

    let perPage = 5;
    let skip = Number((curPage - 1) * perPage)<0?0:  Number((curPage - 1) * perPage);
    let searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    let count = await prisma.followUpInspection.count({
      // where: getSearchParams(req, searchText).where,
      where: {
        inspectionFormId: formId,
        deleted: 0,
      },
    });

    // console.log(( searchText != ""  && searchText != "undefined"));

    const response = await prisma.followUpInspection.findMany({
   
      where: {
        inspectionFormId: formId,
        deleted: 0,
      },
      skip: skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Inspection: {
          include: {
            InspectionType: true,
          },
        },
       
      },
    });

    
    return NextResponse.json({
      response,
      curPage: curPage,
      maxPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
