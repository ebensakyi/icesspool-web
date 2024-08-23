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
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  // try {
  // const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const res = await request.json();


  let transactionId = res.transactionId;
  let status = Number(res.status);

  console.log(res);
  

  const session: any = await getServerSession(authOptions);
  

   
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
  // } catch (error: any) {
  //   console.log(error);

  //   return NextResponse.json(error, { status: 500 });
  // }
}
