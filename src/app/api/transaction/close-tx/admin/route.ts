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

export async function PUT(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    const db = getFirestore(app);

    const res = await request.json();
    console.log(res);

    let transactionId = res.id;
    // let serviceId = res.serviceId;
    // let serviceAreaId = res.serviceAreaId;
    const transaction:any = await prisma.transaction.findFirst({
      where: { id: transactionId },
    });

    let serviceId = transaction?.serviceId;
    let serviceAreaId = transaction?.serviceAreaId;
    let totalCost: number = transaction.discountedCost;

    const response = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        currentStatus: 6,
        deleted: 0,
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

    const charges = await prisma.serviceCharges.findFirst({
      where: {
        serviceAreaId,
        serviceId,
      },
    });

    if (serviceId == 1) {
    }
    if (serviceId == 2) {
    }
    if (serviceId == 3) {
      await allocateFundsBiodigester(totalCost, charges);
    }

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

const allocateFundsBiodigester = async (
  discountedTotalCost: number,
  charges: any
) => {
  let icesspoolPercentage = charges.icesspoolPercentage;
  let paymentChargesPercentage = charges.icesspoolPercentage;
  let otherChargesPercentage = charges.icesspoolPercentage;
  const transactionAmount = discountedTotalCost;

  // const icesspoolAmount = transactionAmount * 0.07;
  // const charges = transactionAmount * 0.03;
  const icesspoolAmount = transactionAmount * icesspoolPercentage;
  const paymentCharges = transactionAmount * paymentChargesPercentage;
  const otherCharges = transactionAmount * otherChargesPercentage;

  const providerAmount =
    transactionAmount - (icesspoolAmount + paymentCharges + otherCharges);

  return [icesspoolAmount, providerAmount, paymentCharges, otherCharges];
};

const allocateFundsWaterTanker = (discountedTotalCost: number) => {
  const transactionAmount = discountedTotalCost;

  const icesspoolAmount = transactionAmount * 0.1;
  const tellerAmount = transactionAmount * 0.03;

  // const tamaleAmount = transactionAmount * 0.05;

  const providerAmount = transactionAmount - (icesspoolAmount + tellerAmount);
};
