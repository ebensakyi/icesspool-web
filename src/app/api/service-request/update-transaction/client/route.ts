import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";
import {
  convertDateToISO8601,
  convertTimeToISO8601,
  getCurrentDate,
  getCurrentTime,
} from "@/libs/date";
import { OFFER_CANCELLED_CL, WORK_COMPLETED, WORK_STARTED } from "@/config";

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();

    let transactionId = res.transactionId;
    let status = Number(res.status);

    if (status == OFFER_CANCELLED_CL) {
      await setDoc(
        doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
        {
          transactionId: transactionId,
          txStatusCode: Number(status),
          deleted: true,
        },
        { merge: true }
      );
      return;
    }
    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      {
        transactionId: transactionId,
        txStatusCode: Number(status),
      },
      { merge: true }
    );

  
    const response = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        currentStatus: status,
      },
    });

    await prisma.transactionStatus.create({
      data: {
        transactionId: transactionId,
        txStatusId: status,
        date: convertDateToISO8601(getCurrentDate()),
        time: convertTimeToISO8601(getCurrentTime()),
      },
    });

    // await db
    // .collection(process.env.TRANSACTION_STORE)
    // .doc(res.transactionId)
    // .set(data);

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
