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

      const serviceProviderBalance: any =
        await prisma.serviceProviderBalance.findFirst({
          where: { deleted: 0, serviceProviderId: sp?.id },
        
        });
        
      let balance = serviceProviderBalance.balance.toFixed(2);  

      return NextResponse.json({accountBalance: Number(balance)});
    }


    //from web
    const response = await prisma.serviceProviderBalance.findMany({
      where: { deleted: 0 },
      include:{ServiceProvider:{
        include:{User:true}
      }}
    });
    // let balance = serviceProviderBalance.balance;
    return NextResponse.json({response});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
