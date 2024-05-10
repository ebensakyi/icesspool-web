export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    // await logActivity("Visited data assignment page", session?.user?.id);

    const transaction = await prisma.transaction.findMany({
      where: { deleted: 0, customerId: userId },
      include: {
        Service:true,
        WaterTankerTransaction: true,
        ToiletTruckTransaction: true,
        BiodigesterTransaction: {
          include: {
            BiodigesterService: {
              include: {
                BiodigesterType: true,
              },
            },
          },
        },
      },
    });

    console.log(transaction);
    
    const response = transaction.map(item => {
      return {
          id: item.id,
          discountedCost: item.discountedCost,
          totalCost: item.totalCost,
          address: item.address,
          service: item.Service.name,
          lat: item.lat,
          lng: item.lng,

          // service: item.serviceId == 1
          // ? "Toilet Truck"
          // : item.serviceId == 2
          // ? "Water Tanker"
          // : "Biodigester",
          serviceType: item.BiodigesterTransaction[0]?.BiodigesterService?.name || 'Unknown',
          serviceDescription: item.BiodigesterTransaction[0]?.BiodigesterService?.BiodigesterType?.name || 'Unknown',
          createdAt: item.createdAt
      };
  });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
