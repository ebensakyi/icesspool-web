export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    const session: any = await getServerSession(authOptions);

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


    const response = await prisma.transaction.findMany({
      where: { deleted: 0, serviceId: 2 },
      include: {
        BiodigesterTransaction: true,
        Customer: true,
        ServiceProvider: true,
        ServiceArea: true,
        TxStatus: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skip,
      take: perPage,
    });

    
    const count = await prisma.transaction.count({
      where: { deleted: 0, serviceId: 2 },
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
