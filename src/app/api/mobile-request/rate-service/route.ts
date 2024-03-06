import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);
    const transactionId = res?.transactionId
    const serviceProviderId = Number(res?.spId)

    console.log(res);

    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res?.assignedFromUser} to ${res?.assignedToUser}`, userId);

    // let transaction: any =
    //   await prisma.transaction.findFirst({
    //     where: { id: transactionId },
    //   })

      let serviceProvider: any =
      await prisma.serviceProvider.findFirst({
        where: { userId: serviceProviderId },
      })
      


    let serviceProviderRating: any =
      await prisma.serviceProviderRating.findFirst({
        where: { serviceProviderId:serviceProvider?.id },
      });



    let currentRating: any = serviceProviderRating?.rating ?? 0.0;

    let newRating = (currentRating + Number(res?.rating)) / 2;

    await prisma.serviceProviderRating.update({
      data: { rating: newRating },
      where: { id: serviceProviderRating.id },
    });

    const data = {
      transactionId: transactionId,
      comment: res?.comment,
      rating: Number(res?.rating),
    };

    await prisma.transactionRating.create({ data });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
