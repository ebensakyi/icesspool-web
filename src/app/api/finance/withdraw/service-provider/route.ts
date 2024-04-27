export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let userId = Number(res.userId);
    let amount = Number(res.amount);

    const sp = await prisma.serviceProvider.findFirst({
      where: { deleted: 0, userId: userId },
    });

    let serviceProviderId: any = sp?.id;

    let x = await prisma.serviceProviderWithdrawal.create({
      data: {
        serviceProviderId: serviceProviderId,
        amount: amount,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let spUserId = Number(searchParams.get("userId"));

    const sp = await prisma.serviceProvider.findFirst({
      where: { deleted: 0, userId: spUserId },
    });

    let serviceProviderId: any = sp?.id;

    let pendingWithdrawal = await prisma.serviceProviderWithdrawal.findFirst({
      where: {
        serviceProviderId: serviceProviderId,
        deleted: 0,
        status: 0,
      },
    });

    return NextResponse.json({ pendingWithdrawal });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let id = Number(res.userId);

    let sp = await prisma.serviceProvider.findFirst({ where: { userId: id } });
    let withdrawal = await prisma.serviceProviderWithdrawal.findFirst({
      orderBy: {
        id:'desc'
      },
      where: { serviceProviderId: sp?.id, deleted: 0 },
    });
    console.log(withdrawal);

    await prisma.serviceProviderWithdrawal.update({
      data: { deleted: 1 },
      where: {
        id: withdrawal?.id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
