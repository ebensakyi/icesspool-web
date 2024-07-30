import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
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
import { runCronJob } from "@/libs/transaction-cron";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    let serviceProviderId = res.userId;
    let transactionId = res.transactionId;
    let txStatusCode = Number(res.txStatusCode);

    let currentStatus = Number(res.txStatusCode);

    ////get service - water, toilet truck or biodigester

    let transaction: any = await prisma.transaction.findFirst({
      where: { id: transactionId },
      include: { Customer: true },
    });

    let sp = await prisma.user.findFirst({
      where: { id: serviceProviderId },
      include: { ServiceProvider: true },
    });

    if (txStatusCode == 1) {
      currentStatus = 2;
    }

    if (txStatusCode == 8) {
      currentStatus = 10;
    }
    //WATER TANKER - Skip payment
    if (transaction.serviceId == 2) {

      if (txStatusCode == 1) {
        currentStatus = 3;
      }
  
      const transactionRef = doc(
        db,
        `${process.env.PROD_TRANSACTION_COLLECTION}`,
        transactionId
      );

      await updateDoc(transactionRef, {
        txStatusCode: currentStatus,
        paymentStatus: 1,
      });
      return NextResponse.json({});
    } else {
     
      await prisma.transaction.update({
        where: { id: transactionId },
        data: {
          serviceProviderId: Number(serviceProviderId),
          currentStatus: currentStatus,
        },
      });

      //Update firestore

      if (transaction) {
        const transactionRef = doc(
          db,
          `${process.env.PROD_TRANSACTION_COLLECTION}`,
          transactionId
        );

        await updateDoc(transactionRef, {
          txStatusCode: currentStatus,
          spName: sp?.firstName + " " + sp?.lastName,
          spCompany: sp?.ServiceProvider?.company,
          spPhoneNumber: sp?.phoneNumber,
          spImageUrl: sp?.passportPicture,
          spId: serviceProviderId,
        });

        await sendSMS(
          transaction?.Customer?.phoneNumber,
          `Hello ${transaction?.Customer?.firstName} your icesspool request has been accepted. Make payment now`
        );

        await sendFCM(
          transaction?.Customer?.fcmId,
          "Request Accepted",
          `Hello ${transaction?.Customer?.firstName} biodigester request is available`
        );
      }
      return NextResponse.json({});
    }

    // runCronJob(transactionSchedule, async () => {
    //   const transactionRef = doc(
    //     db,
    //     `${process.env.PROD_TRANSACTION_COLLECTION}`,
    //     transactionId
    //   );

    //   await updateDoc(transactionRef, {
    //     txStatusCode: 2,
    //     spName: sp?.firstName + " " + sp?.lastName,
    //     spCompany: sp?.ServiceProvider?.company,
    //     spPhoneNumber: sp?.phoneNumber,
    //     spImageUrl: sp?.passportPicture,
    //     sId: sp?.id,

    //     transactionSchedule: transactionSchedule,
    //     deleted: 1,
    //   });
    // });

    return NextResponse.json({});
  } catch (error: any) {
    console.log("FirebaseError==> ", error);

    return NextResponse.json(error, { status: 500 });
  }
}
