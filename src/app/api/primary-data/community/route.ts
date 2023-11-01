import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      name: res.communityName,
      districtId: Number(res.districtId),
      electoralAreaId: Number(res.electoralAreaId),
    };

    const response = await prisma.community.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const electoralAreaId = Number(searchParams.get("electoralAreaId"));
    const get_all = Number(searchParams.get("get_all"));

    const searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    let curPage = Number.isNaN(Number(searchParams.get("page")))
      ? 1
      : Number(searchParams.get("page"));

    let perPage = 10;
    let skip =
      Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);

    // if (districtId || mobile) {
    //   const data = await prisma.community.findMany({
    //     where: { deleted: 0, districtId: Number(districtId) },
    //   });
    //   return NextResponse.json(data);
    // }

    if (get_all == 1) {
      const response = await prisma.community.findMany({
        where: { deleted: 0, electoralAreaId: electoralAreaId },
      });

      return NextResponse.json({
        response,
      });
    }

    const response = await prisma.community.findMany({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  name: {
                    contains: searchText,
                    mode: "insensitive",
                  },
                },
                {
                  ElectoralArea: {
                    name: { contains: searchText, mode: "insensitive" },
                  },
                },
                {
                  ElectoralArea: {
                    District: {
                      name: { contains: searchText, mode: "insensitive" },
                    },
                  },
                },
                {
                  District: {
                    Region: {
                      name: { contains: searchText, mode: "insensitive" },
                    },
                  },
                },
              ],
              deleted: 0,
            }
          : { deleted: 0 },

      include: {
        ElectoralArea: {
          include: {
            District: {
              include: {
                Region: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      skip: skip,
      take: perPage,
    });

    const count = await prisma.community.count({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  name: {
                    contains: searchText,
                    mode: "insensitive",
                  },
                },
                {
                  ElectoralArea: {
                    name: { contains: searchText, mode: "insensitive" },
                  },
                },
                {
                  ElectoralArea: {
                    District: {
                      name: { contains: searchText, mode: "insensitive" },
                    },
                  },
                },
                {
                  District: {
                    Region: {
                      name: { contains: searchText, mode: "insensitive" },
                    },
                  },
                },
              ],
              deleted: 0,
            }
          : { deleted: 0 },
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

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let id = res.communityId;
    const data = {
      name: res.communityName,
      electoralAreaId: Number(res.electoralAreaId),
    };

    const response = await prisma.community.update({ where: { id }, data });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(error);
  }
}
