import { getUserRegion } from "@/libs/user-region";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        let { searchParams } = new URL(request.url);

        let userId = Number(searchParams.get("userId"));
        let lat = Number(searchParams.get("lat"));
        let lng = Number(searchParams.get("lng"));

        console.log(userId, lat, lng);
      let response = await getUserRegion([lat, lng]);

        return NextResponse.json({ response });


    }catch (e) {

    }
} 