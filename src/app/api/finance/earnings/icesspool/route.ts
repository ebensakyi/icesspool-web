export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
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


    //from web
    const response: any = await prisma.icesspoolEarning.findMany({
      where: { deleted: 0 },
      include: {
        Transaction: { include: { Service: true, ServiceProvider: true } },
      }, 
       skip: skip,
      take: perPage,
      orderBy: {
        id: "desc",
      },
    });
   const count = await prisma.icesspoolEarning.count({
      where: {
        deleted: 0,
       
      },
    });

    // let balance = serviceProviderBalance.balance;
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

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let id = res.id;

    await prisma.serviceProviderEarning.update({
      data: {
        deleted: 1,
      },
      where: {
        id: id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
