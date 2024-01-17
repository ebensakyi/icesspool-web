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
import { getCurrentDate, getCurrentTime } from "@/libs/date";

export async function POST(request: Request) {
  try {
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
      clientId: Number(res?.userId),
      lat: Number(res?.lat),
      lng: Number(res?.lng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),

      discountedCost: 0, //Number(res[0]?.discountedCost),
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

    await setDoc(doc(db, "transaction", transactionId), {
      transactionId: res.transactionId,
      clientId: Number(res?.userId),
      lat: Number(res?.lat),
      lng: Number(res?.lng),
      gpsAccuracy: Number(res?.accuracy).toFixed(),

      // trips: Number(res[0]?.trips),
      service: "Biodigester",
      biodigesterTxDetails: requestDetails1,
      serviceAreaId: Number(res?.serviceAreaId),

      //clientId: tr,
      txStatusCode: 1,
      requestType: 1,
      offerMadeTime: getCurrentDate() + " at " + getCurrentTime(),
      customerName: user?.surname + " " + user?.otherNames,
      customerPhone: user?.phoneNumber,
      customerEmail: user?.email,

      // toiletType: req.body.toiletType,
      totalCost: Number(res?.totalCost),

      unitCost: Number(res?.totalCost),
      discountedTotalCost: Number(res?.totalCost),
      createdDate: getCurrentDate() + " at " + getCurrentTime(),
      deleted: false,
    });

    // await db
    // .collection(process.env.TRANSACTION_STORE)
    // .doc(res.transactionId)
    // .set(data);

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

const saveToFirestore = async (transaction: {}) => {
  // let transaction = {
  //   clientId: tr,
  //   txStatusCode: 1,
  //   requestType: 1,
  //   offerMadeTime: date + " at " + time,
  //   customerName: tx.customerName,
  //   customerPhone: tx.customerPhoneNumber,
  //   customerEmail: "",
  //   gpsAccuracy: 0,
  //   community: tx.community,
  //   axle: Number(axle),
  //   axleName: axleName,
  //   tripsNumber: 1,
  //   lat: tx.lat,
  //   lng: tx.lng,
  //   toiletType: req.body.toiletType,
  //   unitCost: tx.unitCost,
  //   actualTotalCost: tx.actualTotalCost,
  //   discountedTotalCost: tx.discountedTotalCost,
  //   createdDate: date + " at " + time,
  //   deleted: false,
  // };
};
function getNameById(arr: any[], id: any) {
  const foundObject = arr.find((item: { id: any }) => item.id === id);
  return foundObject ? foundObject.name : null;
}
