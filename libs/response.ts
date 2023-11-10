import { NextResponse } from "next/server";

export const createSuccessResponse = async (response: any, message: string, status?: number) => {
    return NextResponse.json({ response, message: message });

}

export const createFailedResponse = async (errorCode: any,statusCode:number, msg?: string) => {

    let message: any = ""
    if (errorCode == "P2002") {
        message = "Service and Location combination already exist"
    }
    if (errorCode == "") {
        message = msg
    }
    return NextResponse.json({ message: message },{status:statusCode});

}