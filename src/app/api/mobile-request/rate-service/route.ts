import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);

    await prisma.serviceProviderRating.create({
      data: { rating: Number(res?.rating), userId: Number(res?.spId) },
    });

    const data = {
      transactionId: res?.transactionId,
      comment: res?.comment,
      rating: Number(res?.rating),
    };

    await prisma.transactionRating.create({ data });

    //return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
