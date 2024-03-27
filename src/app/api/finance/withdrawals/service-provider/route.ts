export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let spUserId = Number(res.userId);

    if (spUserId) {
      const sp = await prisma.serviceProvider.findFirst({
        where: { deleted: 0, userId: spUserId },
      });

      let serviceProviderId: any = sp?.id;

    let response = await prisma.serviceProviderWithdrawal.findMany({
        where: {
          serviceProviderId: serviceProviderId,
          deleted: 0,
        },
      });

      return NextResponse.json(response);
    }

    await prisma.serviceProviderWithdrawal.findMany({
      where: {
        deleted: 0,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
