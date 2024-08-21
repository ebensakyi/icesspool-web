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

    // from mobile
    if (userId) {
      const sp = await prisma.serviceProvider.findFirst({
        where: { deleted: 0, userId: userId },
      });

      const serviceProviderEarning: any =
        await prisma.serviceProviderEarning.findMany({
          where: { deleted: 0, serviceProviderId: sp?.id },
          include: { Transaction: { include: { Service: true } } },
        });

      const response = await serviceProviderEarning.map((item: any) => {
        return {
          id: item.id,
          transactionId: item.Transaction.id,
          amount: item.amount,
          completionDate: item?.completionDate ?? "",
          address: item?.Transaction?.address,
          service: item?.Transaction?.Service?.name,
          createdAt: item.createdAt,
        };
      });

      return NextResponse.json(response);
    }

    //from web
    const response: any = await prisma.serviceProviderEarning.findMany({
      where: {
        deleted: 0,
        ServiceProvider: {
          User: {
            deleted: 0,
          },
        },
      },
      include: {
        Transaction: { include: { Service: true, ServiceProvider: true } },
      },
      skip: skip,
      take: perPage,
      orderBy: {
        id: "desc",
      },
    });
    const count = await prisma.serviceProviderEarning.count({
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
