export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    //from web
    const response: any = await prisma.icesspoolEarning.findMany({
      where: { deleted: 0 },
      include: {
        Transaction: { include: { Service: true, ServiceProvider: true } },
      },
    });

    console.log(response);
    

    // let balance = serviceProviderBalance.balance;
    return NextResponse.json({ response });
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
