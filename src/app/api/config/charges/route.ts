import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const data = {
      serviceAreaId: Number(res?.serviceAreaId),
      serviceId: Number(res?.serviceId),
      percentage: Number(res?.percentage),

    };

   

    const response = await prisma.serviceCharges.create({ data });

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

// export async function PUT(request: Request) {
//   try {
//     const res = await request.json();
//     const session: any = await getServerSession(authOptions);

//     const data = {
//         fine: res?.fine,
//     };

//     const response = await prisma.penalty.findFirst({
//         where: { deleted: 0 },
//       });
//       if(response){

//       }
//     await prisma.penalty.update({
//       where: {
//         id: Number(res?.id),
//       },
//       data,
//     });

//     return NextResponse.json({ status: 200 });
//   } catch (error: any) {
//     console.log(error);

//     return NextResponse.json(error, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));

    const session: any = await getServerSession(authOptions);

    // await logActivity("Visited data assignment page", session?.user?.id);

    const response = await prisma.serviceCharges.findFirst({
      where: { deleted: 0 },
    });

    return NextResponse.json({response});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
