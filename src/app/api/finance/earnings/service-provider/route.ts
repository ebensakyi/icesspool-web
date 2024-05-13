export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

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
          transactionId:item.Transaction.id,
          amount: item.amount,
          completionDate: item?.completionDate??"",
          address: item?.Transaction?.address,
          service: item?.Transaction?.Service?.name,
          createdAt: item.createdAt,
        };
      });
      

      return NextResponse.json(response);
    }

    //from web
    const response: any = await prisma.serviceProviderEarning.findMany({
      where: { deleted: 0 },
      include: { Transaction: { include: { Service: true,ServiceProvider: true } } },
    });
    
    // let balance = serviceProviderBalance.balance;
    return NextResponse.json( {response} );
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
        deleted:1
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
