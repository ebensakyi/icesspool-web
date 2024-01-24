export const dynamic = "force-dynamic";

import { getUserArea } from "@/libs/user-service-area";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    let lat = Number(searchParams.get("lat"));
    let lng = Number(searchParams.get("lng"));
    

    let response = await getUserArea([lat, lng]);


    if (response) {
      return NextResponse.json(response.serviceAreaId);
    }
    return NextResponse.json(0);
  } catch (e) {
    return NextResponse.json(0);

  }
}
