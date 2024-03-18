export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    console.log(userId);

    // from mobile
    if (userId) {
      const sp = await prisma.serviceProvider.findFirst({
        where: { deleted: 0, userId: userId },
      });

      const serviceProviderBalance: any =
        await prisma.serviceProviderBalance.findFirst({
          where: { deleted: 0, serviceProviderId: sp?.id },
        });
      let balance = serviceProviderBalance.balance;
      return NextResponse.json(balance);
    }


    //from web
    const response = await prisma.serviceProviderBalance.findMany({
      where: { deleted: 0 },
    });
    // let balance = serviceProviderBalance.balance;
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
