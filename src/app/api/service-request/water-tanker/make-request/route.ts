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
import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";

export async function POST(request: Request) {
  try {
    const db = getFirestore(app);

    const res = await request.json();

    const session: any = await getServerSession(authOptions);

    const data = {
      id: res.transactionId,
      customerId: Number(res?.userId),
      lat: Number(res?.customerLat),
      lng: Number(res?.customerLng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),
      community: res?.community,
      address: res?.address,
      placeLat: Number(res?.placeLat),
      placeLng: Number(res?.placeLng),
      placeId: res?.placeId,
      serviceId: 2,
      serviceAreaId: 1, //Number(res?.serviceAreaId),
      currentStatus: 1,
    };
    console.log(data);

    const response = await prisma.transaction.create({ data });

    let user = await prisma.user.findFirst({
      where: { id: Number(res?.userId) },
    });

    let transactionId = res.transactionId;

    let firestoreData = {
      transactionId: res.transactionId,
      customerId: Number(res?.userId),
      customerLat: Number(res?.customerLat),
      customerLng: Number(res?.customerLng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),

      address: res?.address,
      placeLat: Number(res?.placeLat),
      placeLng: Number(res?.placeLng),
      placeId: res?.placeId,

      // trips: Number(res[0]?.trips),
      service: "Water Tanker",
      serviceId: 3,

      serviceAreaId: Number(res?.serviceAreaId),
      paymentStatus: 0,

      //clientId: tr,
      txStatusCode: 1,
      requestType: 1,
      offerMadeTime: getCurrentDate() + " at " + getCurrentTime(),
      customerName: user?.lastName + " " + user?.firstName,
      customerPhone: user?.phoneNumber,
      customerEmail: user?.email,

      createdDate: getCurrentDate() + " at " + getCurrentTime(),
      deleted: false,
    };

    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      firestoreData
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
      where: {
        deleted: 0,
        userTypeId: 3,
        serviceAreaId: 1,
        ServiceProvider: {
          serviceId: 2 
        }
      },
      include: {
        ServiceProvider: true
      }
    });
    
    console.log("======.", serviceProviders);

    for (let i = 0; i < serviceProviders.length; i++) {
      // await sendSMS(
      //   serviceProviders[i].phoneNumber,
      //   `Hello ${serviceProviders[i].firstName} water tanker request is available`
      // );
      if (serviceProviders[i].fcmId) {
        await sendFCM(
          serviceProviders[i].fcmId,
          "New Request",
          `Hello ${serviceProviders[i].firstName} water tanker request is available`
        );
      }
    }

    // await db
    // .collection(process.env.TRANSACTION_STORE)
    // .doc(res.transactionId)
    // .set(data);

    return NextResponse.json(response);
  } catch (error: any) {
    console.log("Make request error=>", error);

    return NextResponse.json(error, { status: 500 });
  }
}

function getNameById(arr: any[], id: any) {
  const foundObject = arr.find((item: { id: any }) => item.id === id);
  return foundObject ? foundObject.name : null;
}
