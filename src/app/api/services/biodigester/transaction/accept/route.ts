import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";
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

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    let serviceProviderId = res.userId;
    let transactionId = res.transactionId;
    let transactionSchedule = Number(res.transactionSchedule);

    console.log(res);
    

    let transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        serviceProviderId: Number(serviceProviderId),
        transactionSchedule: transactionSchedule,
        currentStatus: 2,
      },
    });

    let sp = await prisma.user.findFirst({
      where: { id: serviceProviderId },
      include: { ServiceProvider: true },
    });

    //Update firestore

    if (transaction) {
      const transactionRef = doc(
        db,
        `${process.env.PROD_TRANSACTION_COLLECTION}`,
        transactionId
      );

      
      await updateDoc(transactionRef, {
        txStatusCode: 2,
        spName: sp?.firstName + " " + sp?.lastName,
        spCompany: sp?.ServiceProvider?.company,
        spPhoneNumber: sp?.phoneNumber,
        spImageUrl: sp?.passportPicture,
        spId: serviceProviderId,
        transactionSchedule: transactionSchedule,
      });
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
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

function getNameById(arr: any[], id: any) {
  const foundObject = arr.find((item: { id: any }) => item.id === id);
  return foundObject ? foundObject.name : null;
}

// function deleteTransaction (){
//   console.log("delete transaction after timeout")

//   const transactionRef = doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId);

//   await updateDoc(transactionRef, {
//     txStatusCode: 2,
//     spName: sp?.firstName + " " + sp?.lastName,
//     spCompany: sp?.ServiceProvider?.company,
//     spPhoneNumber: sp?.phoneNumber,
//     spImageUrl: sp?.passportPicture,
//     transactionSchedule: transactionSchedule
//   });
// }
