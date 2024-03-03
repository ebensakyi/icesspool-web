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

export async function POST(request: Request) {
   try {
  const db = getFirestore(app);

  const res = await request.json();


  let transactionId = res.transactionId;
  let status = Number(res.status);

  const session: any = await getServerSession(authOptions);
    const response = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        currentStatus: 6,
        deleted: 1,
      },
    });
  


  

  await prisma.transactionStatus.create({
    data: {
      transactionId: transactionId,
      txStatusId: 6,
      date: convertDateToISO8601(getCurrentDate()),
      time: convertTimeToISO8601(getCurrentTime()),
    },
  });

  await setDoc(
    doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
    {
      deleted: true,
      transactionId: transactionId,
      txStatusCode: 6,
    },
    { merge: true }
  );



  return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
