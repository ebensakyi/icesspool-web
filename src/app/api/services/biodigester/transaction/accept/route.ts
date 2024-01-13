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
import { getCurrentDate, getCurrentTime } from "@/libs/date";

export async function POST(request: Request) {
  try {
    // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const res = await request.json();
    const session: any = await getServerSession(authOptions);



  



    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res[0]?.assignedFromUser} to ${res[0]?.assignedToUser}`, userId);

  
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
