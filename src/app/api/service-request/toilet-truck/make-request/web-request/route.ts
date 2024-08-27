import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";
import {
  convertDateToISO8601,
  convertTimeToISO8601,
  getCurrentDate,
  getCurrentTime,
} from "@/libs/date";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import { generateTransactionCode } from "@/libs/generate-code";

export async function POST(request: Request) {
  try {
    const db = getFirestore(app);
    const res = await request.json();
    const session = await getServerSession(authOptions);

    console.log(res);

    const {
      userId,
      customerLat,
      customerLng,
      accuracy,
      location,
      customerName,
      placeLat,
      placeLng,
      phoneNumber,
      serviceArea,
      totalCost,
      scheduledDate,
      timeFrame,
      price,
      spName,
      spCompany,
      spPhoneNumber,
      spImageUrl,
      spId,
    } = res;

    const requestType = "BROADCAST"
    const transactionId = await generateTransactionCode(serviceArea,"1");
    const transactionData = {
      id: transactionId,
      lat: Number(customerLat),
      lng: Number(customerLng),
      gpsAccuracy: 1,
      community: location,
      address: location,
      placeLat: Number(customerLat),
      placeLng: Number(customerLng),
      placeId: "",
      serviceId: 1,
      serviceAreaId: Number(serviceArea),
      currentStatus: 1,
      discountedCost: Number(price),
      totalCost: Number(price),
      customerId: 3,

    };

    const response = await prisma.transaction.create({ data: transactionData });

    const timeFrameData = await prisma.timeFrame.findFirst({
      where: { id: Number(timeFrame) },
    });

    console.log(timeFrameData);
    

    const firestoreData = {
      transactionId,
      customerId: Number(userId),
      customerLat: Number(customerLat),
      customerLng: Number(customerLng),
      placeLat: Number(placeLat),
      placeLng: Number(placeLng),
      gpsAccuracy: Number(accuracy).toFixed(),
      address: location,

      placeId: "",
      service: "Toilet Truck",
      serviceId: 1,
      serviceAreaId: Number(serviceArea),
      paymentStatus: 1,
      txStatusCode: 1,
      requestType,
      offerMadeTime: `${getCurrentDate()} at ${getCurrentTime()}`,
      customerName: customerName,
      customerPhone: phoneNumber,
      scheduledTime: timeFrameData?.time_schedule,
      scheduledDate,
      createdDate: `${getCurrentDate()} at ${getCurrentTime()}`,
      deleted: false,
      discountedTotalCost: Number(price),
      // spName,
      // spCompany,
      // spPhoneNumber,
      // spImageUrl,
      // spId: Number(spId),
    };

    console.log(firestoreData);
    

    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      firestoreData
    );

    await prisma.transactionSchedule.create({
      data: {
        transactionId,
        scheduledDate: new Date(scheduledDate),
        timeFrameId: Number(timeFrame),
      },
    });

    await prisma.transactionStatus.create({
      data: {
        transactionId,
        txStatusId: 1,
        date: convertDateToISO8601(getCurrentDate()),
        time: convertTimeToISO8601(getCurrentTime()),
      },
    });

    if (requestType === "BROADCAST") {

      const serviceProviders = await prisma.user.findMany({
        where: {
          deleted: 0,
          userTypeId: 3,
          serviceAreaId: 1,
          ServiceProvider: { serviceId: 2 },
        },
        include: { ServiceProvider: true },
      });

      await Promise.all(
        serviceProviders.map(async (provider) => {
          if (provider.fcmId) {
            await sendFCM(
              provider.fcmId,
              "New Request",
              `Hello ${provider.firstName}, a water tanker request is available.`
            );
          }
        })
      );

    
    } else {
       const sp = await prisma.user.findFirst({
        where: { deleted: 0, id: Number(spId) },
      });

      await sendFCM(
        sp?.fcmId,
        "New Request",
        `Hello ${sp?.firstName}, a water tanker request has been assigned to you.`
      );
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Make request error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
