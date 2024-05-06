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

export async function PUT(request: Request) {
    try {
      const db = getFirestore(app);

  
      const session: any = await getServerSession(authOptions);
  
      const res = await request.json();
      let newAmount = Number(res.newAmount);
      let transactionId = res.transactionId;

      const transaction = await prisma.transaction.findFirst({where: {id: transactionId}})

      if(!transaction) {
        return NextResponse.json({ },{status:404});

      }

      const response = await prisma.transaction.update({
        data: {totalCost: newAmount,discountedCost: newAmount},
        where: { id: transactionId },
      });

      const transactionRef = doc(
        db,
        `${process.env.PROD_TRANSACTION_COLLECTION}`,
        `${transactionId}`
      );

      await updateDoc(transactionRef, {
        discountedTotalCost: newAmount,
        totalCost: newAmount,
        unitCost: newAmount
      });
  
      return NextResponse.json({ response });
    } catch (error) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }