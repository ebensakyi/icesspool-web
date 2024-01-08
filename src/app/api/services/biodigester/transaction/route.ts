import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    console.log(res);

    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res[0]?.assignedFromUser} to ${res[0]?.assignedToUser}`, userId);

    const data = {
      id: res.transactionId,
      clientId: Number(res?.userId),
      lat: Number(res?.lat),
      lng: Number(res?.lng),  
          gpsAccuracy: Number(res?.accuracy),

      cost: Number(res[0]?.cost),
      // biodigesterServiceId: Number(res[0]?.biodigesterService),
      serviceAreaId: Number(res[0]?.serviceArea),
      unitCost: Number(res[0]?.unitCost),
      discountedCost: Number(res[0]?.discountedCost),
      actualCost: Number(res[0]?.actualCost),

      // trips: Number(res[0]?.trips),
      // paymentStatus: Number(res[0]?.paymentStatus),
      serviceId: 3,

      // unitCost: Number(res[0]?.unitCost),
    };

    const response = await prisma.transaction.create({ data });


 await prisma.biodigesterTransaction.createMany({ data:requestDetails });


    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
