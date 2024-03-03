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
  // try {
  // const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const res = await request.json();


  let transactionId = res.transactionId;
  let status = Number(res.status);

  const session: any = await getServerSession(authOptions);
  // //cancel unpaid request
  // if (status == 11) {
  //   const response = await prisma.transaction.update({
  //     where: { id: transactionId },
  //     data: {
  //       currentStatus: status,
  //       deleted: 1,
  //     },
  //   });

  //   await setDoc(
  //     doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
  //     {
  //       transactionId: transactionId,
  //       txStatusCode: Number(status),
  //     },
  //     { merge: true }
  //   );
  // }
  // //cancel paid request

  // if (status == 12) {
  //   const response = await prisma.transaction.update({
  //     where: { id: transactionId },
  //     data: {
  //       currentStatus: status,
  //       deleted: 1,
  //     },
  //   });
  //}


    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      {
        transactionId: transactionId,
        txStatusCode: Number(status),
        spId:"",
        spCompany:"",
        spImageUrl:"",
        spName:"",
        spPhoneNumber:""
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
  // } catch (error: any) {
  //   console.log(error);

  //   return NextResponse.json(error, { status: 500 });
  // }
}
