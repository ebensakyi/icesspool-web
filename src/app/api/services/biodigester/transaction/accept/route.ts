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

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    let serviceProviderId = res.userId;
    let transactionId = res.transactionId;
    let transactionSchedule = res.transactionSchedule;

    let transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        serviceProviderId: Number(serviceProviderId),
        transactionSchedule: Number(transactionSchedule),
        currentStatus: 2,
      },
    });

    let sp = await prisma.user.findFirst({
      where: { id: serviceProviderId },
      include: { Provider: true },
    });

    console.log("SP ",sp);
    

    //Update firestore

    if (transaction) {
      const transactionRef = doc(db, "transaction", transactionId);

      await updateDoc(transactionRef, {
        txStatusCode: 2,
        spName: sp?.otherNames + " " + sp?.surname,
        spCompany: sp?.Provider?.company,
        spPhoneNumber: sp?.phoneNumber,
        spImageUrl: sp?.imagePath,
        transactionSchedule: transactionSchedule
      });
    }

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
