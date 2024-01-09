import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    console.log(res);

    const requestDetails = res.requestDetails.map(
      (item: { id: any; unitCost: any; name: any }) => ({
        biodigesterServiceId: item.id,
        unitCost: item.unitCost,
        name: item.name,
        transactionId: res.transactionId,
      })
    );
    // const userId = session?.user?.id;

    // await logActivity(`Assigned data from ${res[0]?.assignedFromUser} to ${res[0]?.assignedToUser}`, userId);

    const data = {
      id: res.transactionId,
      clientId: Number(res?.userId),
      lat: Number(res?.lat),
      lng: Number(res?.lng),
      gpsAccuracy: Number(res?.accuracy),

      cost: Number(res[0]?.cost),
      discountedCost: 1000, //Number(res[0]?.discountedCost),
      actualCost: Number(res[0]?.totalCost),

      // trips: Number(res[0]?.trips),
      // paymentStatus: Number(res[0]?.paymentStatus),
      serviceId: 3,
      serviceAreaId: Number(res?.serviceAreaId),

      // unitCost: Number(res[0]?.unitCost),
    };

    const response = await prisma.transaction.create({ data });

    // transactionId       String          @db.VarChar(255)
    // biodigesterTypeId   Int
    // customerName        String?         @db.VarChar(100)
    // customerPhoneNumber String?         @db.VarChar(100)
    // unitCost               Decimal                  @db.Decimal(10, 2)

    await prisma.biodigesterTransaction.createMany({ data: requestDetails });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
