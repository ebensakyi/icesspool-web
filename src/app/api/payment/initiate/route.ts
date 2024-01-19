// export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { amtConverter } from "@/libs/amount-converter";
import { initiatePayment } from "@/libs/teller-payment";

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    let paymentId: any = searchParams?.get("paymentId");
    let transactionId: any = searchParams.get("transactionId");

    // const response = await prisma.region.findMany({
    //   where: { deleted: 0 },
    // });

    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
    });

    
    let amount: any = transaction?.discountedCost?.toString();

    const convertedAmount = await amtConverter(amount);

    const payment = await prisma.payment.findFirst({
      where: { transactionId: transaction?.id },
    });



    if (!payment) {
      await prisma.payment.create({
        data: { paymentId: paymentId, transactionId: transactionId },
      });
      const initiated = await initiatePayment(paymentId, convertedAmount);

      return NextResponse.json({ response: initiated });
    }

    await prisma.payment.update({
      data: { paymentId: paymentId },
      where: { id: payment.id },
    });

    const initiated = await initiatePayment(paymentId, convertedAmount);

    // return res
    //   .status(200)
    //   .send({ statusCode: 1, message: "Payment initiated", data: initiated });

    return NextResponse.json({ response: initiated });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
