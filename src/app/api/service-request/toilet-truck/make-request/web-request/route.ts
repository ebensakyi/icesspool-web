import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";
import { convertDateToISO8601, convertTimeToISO8601, getCurrentDate, getCurrentTime } from "@/libs/date";
import { sendSMS } from "@/libs/send-hubtel-sms";
import { sendFCM } from "@/libs/send-fcm";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const db = getFirestore(app);
    const res = await request.json();
    const session = await getServerSession(authOptions);

    const {
      transactionId, userId, customerLat, customerLng, accuracy,
      community, address, placeLat, placeLng, placeId,
      serviceArea, totalCost, scheduledDate, timeFrame, requestType,
      spName, spCompany, spPhoneNumber, spImageUrl, spId
    } = res;

    const transactionData = {
      id: transactionId,
      customerId: Number(userId),
      lat: Number(customerLat),
      lng: Number(customerLng),
      gpsAccuracy: Number(accuracy).toFixed(),
      community,
      address,
      placeLat: Number(placeLat),
      placeLng: Number(placeLng),
      placeId,
      serviceId: 1,
      serviceAreaId: Number(serviceArea),
      currentStatus: requestType === "DIRECT" ? 3 : 1,
      discountedCost: Number(totalCost),
      totalCost: Number(totalCost),
      serviceProviderId: requestType === "DIRECT" ? Number(spId) : null,
    };

    const response = await prisma.transaction.create({ data: transactionData });

    const user = await prisma.user.findFirst({ where: { id: Number(userId) } });
    const timeFrameData = await prisma.timeFrame.findFirst({ where: { id: Number(timeFrame) } });

    const firestoreData = {
      transactionId,
      customerId: Number(userId),
      customerLat: Number(customerLat),
      customerLng: Number(customerLng),
      gpsAccuracy: Number(accuracy).toFixed(),
      address,
      placeLat: Number(placeLat),
      placeLng: Number(placeLng),
      placeId,
      service: "Toilet Truck",
      serviceId: 1,
      serviceAreaId: Number(serviceArea),
      paymentStatus: 1,
      txStatusCode: requestType === "DIRECT" ? 3 : 1,
      requestType,
      offerMadeTime: `${getCurrentDate()} at ${getCurrentTime()}`,
      customerName: `${user?.lastName} ${user?.firstName}`,
      customerPhone: user?.phoneNumber,
      customerEmail: user?.email,
      scheduledTime: timeFrameData?.time_schedule,
      scheduledDate,
      createdDate: `${getCurrentDate()} at ${getCurrentTime()}`,
      deleted: false,
      discountedTotalCost: Number(totalCost),
      spName,
      spCompany,
      spPhoneNumber,
      spImageUrl,
      spId: Number(spId),
    };

    await setDoc(doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId), firestoreData);

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

    if (requestType === "DIRECT") {
      const sp = await prisma.user.findFirst({ where: { deleted: 0, id: Number(spId) } });

      await sendFCM(sp?.fcmId, "New Request", `Hello ${sp?.firstName}, a water tanker request has been assigned to you.`);
    } else {
      const serviceProviders = await prisma.user.findMany({
        where: {
          deleted: 0,
          userTypeId: 3,
          serviceAreaId: 1,
          ServiceProvider: { serviceId: 2 },
        },
        include: { ServiceProvider: true },
      });

      await Promise.all(serviceProviders.map(async (provider) => {
        if (provider.fcmId) {
          await sendFCM(provider.fcmId, "New Request", `Hello ${provider.firstName}, a water tanker request is available.`);
        }
      }));
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Make request error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
