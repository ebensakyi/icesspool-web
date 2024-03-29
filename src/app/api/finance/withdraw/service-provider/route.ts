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

    console.log("serviceProviderId ID ", serviceProviderId);


 let x =   await prisma.serviceProviderWithdrawal.create({
      data: {
        serviceProviderId: serviceProviderId,
        amount: amount,
       
      },
    });

    console.log(x);
    

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
        },
      });

      
      return NextResponse.json({pendingWithdrawal});
   

  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
