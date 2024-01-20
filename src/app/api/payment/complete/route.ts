// export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";
import { getCurrentDate, getCurrentTime } from "@/libs/date";

export async function GET(request: Request) {
  try {
    const db = getFirestore(app);

    const session: any = await getServerSession(authOptions);

    let { searchParams } = new URL(request.url);

    let code = searchParams.get("code");
    let paymentId: any = searchParams?.get("paymentId");
    let reason: any = searchParams.get("reason");

    try {
      if (code == "000") {
        const payment = await prisma.payment.findFirst({
          where: { paymentId: paymentId },
        });

        const transaction = await prisma.transaction.findFirst({
          where: { id: payment?.transactionId },
        });

        // const provider = await prisma.provider.findFirst({
        //   where: { id: transaction.providerId },
        // });

        const user = await prisma.user.findFirst({
          where: { id: Number(transaction?.serviceProviderId) },
        });

        let phoneNumber: any = user?.phoneNumber;
        let transactionId: any = transaction?.id;

        let updated = await prisma.transaction.update({
          data: { currentStatus: 3, paymentStatus: 1 },
          where: { id: transactionId },
        });

        if (updated) {
          const transactionRef = doc(
            db,
            `${process.env.PROD_TRANSACTION_COLLECTION}`,
            `${transactionId}`
          );

          await updateDoc(transactionRef, {
            txStatusCode: 3,
            paymentStatus: 1,
            paymentTime: getCurrentDate() + " at " + getCurrentTime(),
          });

          // const transaction1 = await Transaction.findOne({
          //   where: { id: transactionId },
          // });
          await prisma.transactionStatus.create({
            data: {
              transactionId: transactionId,
              status: 3,
              date: getCurrentDate(),
              time: getCurrentTime(),
            },
          });

          await sendSMS(
            phoneNumber,
            `Customer has made payment to transaction number ${transactionId}. Please use the route button to move to location immediately.\nThank you.`
          );

          let f = await prisma.transaction.findFirst({
            where: { id: transactionId },
            include: { ServiceProvider: true },
          });
          let fcms: any = [user?.fcm];

          await sendFCM(
            fcms,
            "Payment made",
            "Customer has made payment. Please move now!"
          );
        }
        //return await res.redirect("/payment-success");
        return NextResponse.json({});
      } else {
        // return await res.redirect(
        //   "/payment-failed?code=" + code + "&reason=" + reason
        // );
        return NextResponse.json({});
      }
    } catch (error) {
      console.log(error);
      //   return await res.redirect(
      //     "/payment-failed?code=" + code + "&reason=" + reason
      //   );
      return NextResponse.json({});
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    const db = getFirestore(app);

    const session: any = await getServerSession(authOptions);

    const res = await request.json();

    let code = res.code;
    let paymentId: any = res.paymentId;
    let reason: any = res.reason;

    try {
      if (code == "000") {
        const payment = await prisma.payment.findFirst({
          where: { paymentId: paymentId },
        });

        const transaction = await prisma.transaction.findFirst({
          where: { id: payment?.transactionId },
        });

        // const provider = await prisma.provider.findFirst({
        //   where: { id: transaction.providerId },
        // });

        const user = await prisma.user.findFirst({
          where: { id: Number(transaction?.serviceProviderId) },
        });

        let phoneNumber: any = user?.phoneNumber;
        let transactionId: any = transaction?.id;

        let updated = await prisma.transaction.update({
          data: { currentStatus: 3, paymentStatus: 1 },
          where: { id: transactionId },
        });

        if (updated) {
          const transactionRef = doc(
            db,
            `${process.env.PROD_TRANSACTION_COLLECTION}`,
            `${transactionId}`
          );

          await updateDoc(transactionRef, {
            txStatusCode: 3,
            paymentStatus: 1,
            paymentTime: getCurrentDate() + " at " + getCurrentTime(),
          });

          // const transaction1 = await Transaction.findOne({
          //   where: { id: transactionId },
          // });
          await prisma.transactionStatus.create({
            data: {
              transactionId: transactionId,
              status: 3,
              date: getCurrentDate(),
              time: getCurrentTime(),
            },
          });

          await sendSMS(
            phoneNumber,
            `Customer has made payment to transaction number ${transactionId}. Please use the route button to move to location immediately.\nThank you.`
          );

          let f = await prisma.transaction.findFirst({
            where: { id: transactionId },
            include: { ServiceProvider: true },
          });
          let fcms: any = [user?.fcm];

          await sendFCM(
            fcms,
            "Payment made",
            "Customer has made payment. Please move now!"
          );
        }
        //return await res.redirect("/payment-success");
        return NextResponse.json({});
      } else {
        // return await res.redirect(
        //   "/payment-failed?code=" + code + "&reason=" + reason
        // );
        return NextResponse.json({});
      }
    } catch (error) {
      console.log(error);
      //   return await res.redirect(
      //     "/payment-failed?code=" + code + "&reason=" + reason
      //   );
      return NextResponse.json({});
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
