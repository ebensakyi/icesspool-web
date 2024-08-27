export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { calculateDeludgingPrice } from "@/libs/pricing";
import { prisma } from "@/prisma/db";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    // 5.601454,-0.169431
    let userId = Number(searchParams.get("userId"));
    let userLatitude = Number(searchParams.get("userLatitude"));
    let userLongitude = Number(searchParams.get("userLongitude"));
    let tripsNumber = Number(searchParams.get("tripsNumber"));
    let serviceArea = Number(searchParams.get("serviceArea"));

    if (serviceArea == 2) {
      const response = await prisma.truckClassification.findMany({
        where: { deleted: 0, serviceAreaId: 2, serviceId: 2, status: 1 },
        include: {
          Service: true,
          ServiceArea: true,
        },
      });

      let data = await response.map((data) => ({
        id: data?.id,
        name: data?.name,
        volume: data?.tankCapacity,
       
      }));


      return NextResponse.json(data);
    }

    let userLocation = [userLatitude, userLongitude];

    const pricingModel = await prisma.waterTankerServicePricing.findMany({
      where: {
        deleted: 0,
        serviceAreaId: serviceArea,
      },
      include: {
        Region: true,
        TruckClassification: true,
      },
    });

    let price = await calculateDeludgingPrice(
      pricingModel,
      userLocation,
      serviceArea,
      tripsNumber
    );
    

    return NextResponse.json({ price });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
