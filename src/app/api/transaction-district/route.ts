export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { getTxDistrict } from "@/libs/get-transaction-district";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    let latitude = Number(searchParams.get("lat"));
    let longitude = Number(searchParams.get("lng"));

    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    //   const response = await prisma.servicesInArea.findMany({
    //     where: { deleted: 0 },
    //     include: {
    //       ServiceArea: true,
    //       Service:true
    //     },
    //   });

    let response = await getTxDistrict(latitude, longitude);

    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
