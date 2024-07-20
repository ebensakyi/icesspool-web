import { getServerSession } from "next-auth";
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
import {
  OFFER_CANCELLED_SP,
  WORK_COMPLETED_REQUEST,
  WORK_STARTED_REQUEST,
} from "@/config";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();

    let transactionId = res.transactionId;
    let txSubStatus = Number(res.txSubStatus);

    const session: any = await getServerSession(authOptions);



      await setDoc(
        doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
        {
          transactionId: transactionId,
          txSubStatus: Number(txSubStatus),
        },
        { merge: true }
      );
   

    await prisma.transactionStatus.create({
      data: {
        transactionId: transactionId,
        txStatusId: txSubStatus,
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
