export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let curPage = Number.isNaN(Number(searchParams.get("page")))
    ? 1
    : Number(searchParams.get("page"));

  let perPage = 10;
  let skip =
    Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);

  let searchText =
    searchParams.get("searchText")?.toString() == "undefined"
      ? ""
      : searchParams.get("searchText")?.toString();


    let response = await prisma.serviceProviderWithdrawal.findMany({
      where: {
        deleted: 0,
        ServiceProvider: {
          User: {
            deleted: 0,
          },
        },
      },
      include: {
        ServiceProvider: {
          include: {
            User: true,
          },
        },
      },
      skip: skip,
      take: perPage,
      orderBy: {
        id: "desc",
      },
    });
   const count = await prisma.serviceProviderWithdrawal.count({
      where: {
        deleted: 0,
        ServiceProvider: {
          User: {
            deleted: 0,
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
    console.log(error);

    return NextResponse.json(error);
  }
}
