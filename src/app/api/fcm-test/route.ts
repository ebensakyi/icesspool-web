export const dynamic = "force-dynamic";

import { sendFCM } from "@/libs/send-fcm";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await sendFCM(
        "New Request",
        `Hello biodigester request is available`,
        'dJmY97VyTpyiuZ47_K0bct:APA91bE9rh7D4KOXAFiL3lAzbusfEQe76S37ZE90AcdYlpltqG6a0xYlpKXHXJ9wWWqpoRNO0ofxYkOUM7omnycG5ShMHx0DSnY1aUgnCrKsAkuXMaVeBTMYJXkt3hw-aadJuaPVFuCF'
      );
    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
