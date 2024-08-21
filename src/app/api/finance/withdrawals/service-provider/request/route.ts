export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    let response = await prisma.serviceProviderWithdrawal.findMany({
      where: {
        deleted: 0,
        ServiceProvider: {
          User: {
            deleted: 0,
          },
        },
      },
      include: {
        ServiceProvider: {
          include: {
            User: true,
          },
        },
      },
      orderBy: { status: "asc" },
    });
    ;

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
