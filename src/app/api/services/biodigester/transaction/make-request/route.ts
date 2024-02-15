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
} from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";
import {
  convertDateToISO8601,
  convertTimeToISO8601,
  getCurrentDate,
  getCurrentTime,
} from "@/libs/date";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";

export async function POST(request: Request) {
  try {
    const db = getFirestore(app);

    const res = await request.json();

    const session: any = await getServerSession(authOptions);

    const requestDetails = res.requestDetails.map(
      (item: { id: any; unitCost: any; name: any }) => ({
        biodigesterServiceId: item.id,
        unitCost: item.unitCost,
        // name: item.name,
        transactionId: res.transactionId,
      })
    );

    let biodigesterServices = await prisma.biodigesterService.findMany({});

    const requestDetails1 = res.requestDetails.map(
      (item: { id: any; unitCost: any; name: any }) => ({
        name: getNameById(biodigesterServices, item.id),
        cost: item.unitCost,
      })
      // item.name + " : " + item.unitCost
    );

    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res[0]?.assignedFromUser} to ${res[0]?.assignedToUser}`, userId);

    const data = {
      id: res.transactionId,
      customerId: Number(res?.userId),
      lat: Number(res?.customerLat),
      lng: Number(res?.customerLng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),
      discountedCost: Number(res?.totalCost),
      cost: Number(res?.totalCost),

      // trips: Number(res[0]?.trips),
      serviceId: 3,
      serviceAreaId: 1, //Number(res?.serviceAreaId),
      currentStatus: 1,

      // unitCost: Number(res[0]?.unitCost),
    };

    const response = await prisma.transaction.create({ data });

    await prisma.biodigesterTransaction.createMany({ data: requestDetails });
    await prisma.transactionSchedule.create({
      data: {
        transactionId: res.transactionId,
        scheduledDate: new Date(res.scheduledDate),
        scheduledTime: res.scheduledTime,
      },
    });

    let user = await prisma.user.findFirst({
      where: { id: Number(res?.userId) },
    });

    // let service = await prisma.service.findFirst({
    //   where: { id: Number(res?.serviceId) },
    // });

    let transactionId = res.transactionId;

    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      {
        transactionId: res.transactionId,
        customerId: Number(res?.userId),
        customerLat: Number(res?.customerLat),
        customerLng: Number(res?.customerLng),
        gpsAccuracy: Number(res?.accuracy).toFixed(),

        // trips: Number(res[0]?.trips),
        service: "Biodigester ",
        serviceId: 3,
        biodigesterTxDetails: requestDetails1,
        serviceAreaId: Number(res?.serviceAreaId),

        //clientId: tr,
        txStatusCode: 1,
        requestType: 1,
        offerMadeTime: getCurrentDate() + " at " + getCurrentTime(),
        customerName: user?.lastName + " " + user?.firstName,
        customerPhone: user?.phoneNumber,
        customerEmail: user?.email,

        // toiletType: req.body.toiletType,
        totalCost: Number(res?.totalCost),

        unitCost: Number(res?.totalCost),
        discountedTotalCost: Number(res?.totalCost),
        scheduledTime: res.scheduledTime,
        scheduledDate: res.scheduledDate,

        createdDate: getCurrentDate() + " at " + getCurrentTime(),
        deleted: false,
      }
    );

    await prisma.transactionStatus.create({
      data: {
        transactionId: transactionId,
        txStatusId: 1,
        date: convertDateToISO8601(getCurrentDate()),
        time: convertTimeToISO8601(getCurrentTime()),
      },
    });

    let serviceProviders = await prisma.user.findMany({
      where: { deleted: 0, userTypeId: 3, serviceAreaId: 1 },
    });

    for (let i = 0; i < serviceProviders.length; i++) {
      await sendSMS(
        serviceProviders[i].phoneNumber,
        `Hello ${serviceProviders[i].firstName} biodigester request is available`
      );

      await sendFCM(
        "New Request",
        `Hello ${serviceProviders[i].firstName} biodigester request is available`,
        serviceProviders[i].fcmId
      );
    }

    // await db
    // .collection(process.env.TRANSACTION_STORE)
    // .doc(res.transactionId)
    // .set(data);

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

function getNameById(arr: any[], id: any) {
  const foundObject = arr.find((item: { id: any }) => item.id === id);
  return foundObject ? foundObject.name : null;
}
