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
    const firestoreDb = getFirestore(app);


    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    let serviceId = res.serviceId;
    if (serviceId == 1) {
      await acceptToiletTruckRequest(request, firestoreDb);
    }
    if (serviceId == 2) {
      await acceptWaterTankerRequest(request, firestoreDb);
    }
    if (serviceId == 3) {
      await acceptBiodigesterRequest(request, firestoreDb);
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

const acceptBiodigesterRequest = async (request: Request, firestoreDb: any) => {
  const res = await request.json();
  const session: any = await getServerSession(authOptions);

  let serviceProviderId = res.userId;
  let transactionId = res.transactionId;
  let currentStatus = Number(res.txStatusCode);

  let transaction: any = await prisma.transaction.findFirst({
    where: { id: transactionId },
    include: { Customer: true },
  });

  let sp = await prisma.user.findFirst({
    where: { id: serviceProviderId },
    include: { ServiceProvider: true },
  });

  currentStatus =
    currentStatus === 1 ? 2 : currentStatus === 7 ? 9 : currentStatus;

  await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      serviceProviderId: Number(serviceProviderId),
      currentStatus: currentStatus,
    },
  });

  //Update firestore
  const transactionRef = doc(
    firestoreDb,
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
    `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted. Make payment now`
  );

  await sendFCM(
    transaction?.Customer?.fcmId,
    "Request Accepted",
    `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted. Make payment now`
  );

  return NextResponse.json({});
};
const acceptWaterTankerRequest = async (request: Request, firestoreDb: any) => {
  const res = await request.json();
  const session: any = await getServerSession(authOptions);

  let serviceProviderId = res.userId;
  let transactionId = res.transactionId;
  let currentStatus = Number(res.txStatusCode);

  let service = Number(res.serviceId);
  let serviceArea = Number(res.serviceAreId);

  ////LATER CHECK PRICING CRITERIA AND SHOW PRICING,PAYMENT OR SKIP
  let pricingCriteria: any = await prisma.pricingCriteria.findFirst({
    where: { serviceAreaId: serviceArea, serviceId: service, deleted: 0 },
  });

  let enablePayment = 0; //  pricingCriteria?.enablePayment

  let notificationMsg = "";
  ///////////////////////////////
  let transaction: any = await prisma.transaction.findFirst({
    where: { id: transactionId },
    include: { Customer: true },
  });

  let sp = await prisma.user.findFirst({
    where: { id: serviceProviderId },
    include: { ServiceProvider: true },
  });

  //// HARD CODED PRICING CRITERIA

  if (enablePayment) {
    currentStatus =
      currentStatus === 1 ? 2 : currentStatus === 7 ? 9 : currentStatus;
    notificationMsg = `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted. Make payment now`;
  } else {
    currentStatus =
      currentStatus === 1 ? 3 : currentStatus === 7 ? 3 : currentStatus;
    notificationMsg = `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted.`;
  }

  await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      serviceProviderId: Number(serviceProviderId),
      currentStatus: currentStatus,
    },
  });

  //Update firestore
  const transactionRef = doc(
    firestoreDb,
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

  await sendSMS(transaction?.Customer?.phoneNumber, notificationMsg);

  await sendFCM(
    transaction?.Customer?.fcmId,
    "Request Accepted",
    notificationMsg
  );

  return NextResponse.json({});
};

const acceptToiletTruckRequest = async (request: Request, firestoreDb: any) => {
  const res = await request.json();

  let serviceProviderId = res.userId;
  let transactionId = res.transactionId;
  let currentStatus = Number(res.txStatusCode);

  let service = Number(res.serviceId);
  let serviceArea = Number(res.serviceAreId);

  ////LATER CHECK PRICING CRITERIA AND SHOW PRICING,PAYMENT OR SKIP
  let pricingCriteria: any = await prisma.pricingCriteria.findFirst({
    where: { serviceAreaId: serviceArea, serviceId: service, deleted: 0 },
  });

  let enablePayment = 0; //  pricingCriteria?.enablePayment

  let notificationMsg = "";
  ///////////////////////////////
  let transaction: any = await prisma.transaction.findFirst({
    where: { id: transactionId },
    include: { Customer: true },
  });

  let sp = await prisma.user.findFirst({
    where: { id: serviceProviderId },
    include: { ServiceProvider: true },
  });

  //// HARD CODED PRICING CRITERIA

  if (enablePayment) {
    currentStatus =
      currentStatus === 1 ? 2 : currentStatus === 7 ? 9 : currentStatus;
    notificationMsg = `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted. Make payment now`;
  } else {
    currentStatus =
      currentStatus === 1 ? 3 : currentStatus === 7 ? 3 : currentStatus;
    notificationMsg = `Hello ${transaction?.Customer?.firstName} your biodigester request has been accepted.`;
  }

  await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      serviceProviderId: Number(serviceProviderId),
      currentStatus: currentStatus,
    },
  });

  //Update firestore
  const transactionRef = doc(
    firestoreDb,
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

await sendSMS(transaction?.Customer?.phoneNumber, notificationMsg);

 let fcmSent = await sendFCM(
    transaction?.Customer?.fcmId,
    "Request Accepted",
    notificationMsg
  );

  return NextResponse.json({});
};
