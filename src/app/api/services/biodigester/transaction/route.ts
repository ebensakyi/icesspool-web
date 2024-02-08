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
import {  convertDateToISO8601, convertTimeToISO8601, getCurrentDate, getCurrentTime } from "@/libs/date";

export async function POST(request: Request) {
 // try {
    // const app = initializeApp(firebaseConfig);
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
      lat: Number(res?.lat),
      lng: Number(res?.lng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),

      discountedCost: Number(res?.totalCost),
      cost: Number(res?.totalCost),

      // trips: Number(res[0]?.trips),
      serviceId: 3,
      serviceAreaId: Number(res?.serviceAreaId),

      // unitCost: Number(res[0]?.unitCost),
    };

    const response = await prisma.transaction.create({ data });

    await prisma.biodigesterTransaction.createMany({ data: requestDetails });

    let user = await prisma.user.findFirst({
      where: { id: Number(res?.userId) },
    });

    // let service = await prisma.service.findFirst({
    //   where: { id: Number(res?.serviceId) },
    // });

    let transactionId = res.transactionId;

    await setDoc(doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId), {
      transactionId: res.transactionId,
      customerId: Number(res?.userId),
      lat: Number(res?.lat),
      lng: Number(res?.lng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),

      // trips: Number(res[0]?.trips),
      service: "Biodigester",
      serviceId:3,
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
      createdDate: getCurrentDate() + " at " + getCurrentTime(),
      deleted: false,
    });


    await prisma.transactionStatus.create({
      data: {
        transactionId: transactionId,
        status: 1,
        date: convertDateToISO8601(getCurrentDate()) ,
        time: convertTimeToISO8601(getCurrentTime()) ,
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

function getNameById(arr: any[], id: any) {
  const foundObject = arr.find((item: { id: any }) => item.id === id);
  return foundObject ? foundObject.name : null;
}
