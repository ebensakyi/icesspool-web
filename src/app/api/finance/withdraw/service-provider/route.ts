export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let userId = Number(res.userId);
    let amount = Number(res.amount);
    console.log("USER ID ", userId);

    const sp = await prisma.serviceProvider.findFirst({
      where: { deleted: 0, userId: userId },
    });

    let serviceProviderId: any = sp?.id;



    await prisma.serviceProviderWithdrawal.create({
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
