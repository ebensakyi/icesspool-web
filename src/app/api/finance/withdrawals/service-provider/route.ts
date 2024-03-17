export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    const sp = await prisma.serviceProvider.findFirst({
      where: { deleted: 0, userId: userId },
    });

    const response = await prisma.serviceProviderEarning.findMany({
      where: { deleted: 0, serviceProviderId: sp?.id },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
