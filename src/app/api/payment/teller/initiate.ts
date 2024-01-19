// export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { converter } from "@/libs/amount-converter";
import { initiatePayment } from "@/libs/teller-payment";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    let paymentId = searchParams.get("paymentId");
    let transactionId = searchParams.get("transactionId");

    const session: any = await getServerSession(authOptions);

    const response = await prisma.region.findMany({
      where: { deleted: 0 },
    });

    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
    });

    let amount: String = transaction?.discountedCost;
    const convertedAmount = await converter(amount);

    const payment = await prisma.payment.findFirst({
      where: { transactionId: transaction?.id },
    });

    if (!payment) {
      await await prisma.payment.create({
        paymentId: paymentId,
        transactionId: transaction?.id,
      });
      const convertedAmount = await converter(amount);
      const initiated = await initiatePayment(paymentId, convertedAmount);

      return NextResponse.json({ response: initiated });
    }

    await prisma.payment.update({
      data: { paymentId: paymentId },
      where: { transactionId: payment.transactionId },
    });

 
    const initiated = await initiatePayment(paymentId, amount);

    // return res
    //   .status(200)
    //   .send({ statusCode: 1, message: "Payment initiated", data: initiated });

    return NextResponse.json({ response: initiated });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
