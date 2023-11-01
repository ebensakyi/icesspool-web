import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { sendSMS } from "@/utils/send-hubtel-sms";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session :any= await getServerSession(authOptions);


    const userId = session?.user?.id;

    let recipientCount = 0;

    const data = {
      title: res.title,
      message: res.message,
      messageType: 2,
      sendingType: Number(res.sendingType),
      individualRecipient:
        res.individualRecipient == undefined || ""
          ? null
          : Number(res.individualRecipient),
      districtId:
        res.districtId == undefined || "" ? null : Number(res.districtId),
      regionId: res.regionId == undefined || "" ? null : Number(res.regionId),
      sender: Number(userId),
    };


    if (res.sendingType == "1") {
      const user : any = await prisma.user.findFirst({
        where: { id: Number(res.individualRecipient) },
      });      recipientCount = user?.length;

      await sendSMS(user?.phoneNumber, res.message);


    }

    if (res.sendingType == "2") {
      const user : any = await prisma.user.findMany({
        where: { districtId: Number(res.districtId) },
      });

      recipientCount = user.length;

      for (let i = 0; i < user.length; i++) {
        await sendSMS(user[i]?.phoneNumber, res.message);

      }
    }

    if (res.sendingType == "3") {
      const user : any = await prisma.user.findMany({
        where: { regionId: Number(res.regionId) },
      });

      recipientCount = user.length;


      for (let i = 0; i < user.length; i++) {
        await sendSMS(user[i]?.phoneNumber, res.message);

      }
    }

    if (recipientCount == 0) {
      return NextResponse.json({ message: "Recipient list is empty" }, { status: 201 });
    }

    const response = await prisma.messaging.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {

    return NextResponse.json(error, { status: 500 });
  }
}


export async function PUT(request: Request) {
    try {
      const res = await request.json();
      const session :any= await getServerSession(authOptions);
  
  
      const userId = session?.user?.id;
  
      let recipientCount = 0;
      let messageId = Number(res.messageId)

      console.log(res);
      

  
      const data = {
        title: res.title,
        message: res.message,
        messageType: 2,
        sendingType: Number(res.sendingType),
        individualRecipient:
          res.individualRecipient == undefined || ""
            ? null
            : Number(res.individualRecipient),
        districtId:
          res.districtId == undefined || "" ? null : Number(res.districtId),
        regionId: res.regionId == undefined || "" ? null : Number(res.regionId),
        sender: Number(userId),
      };
  
  
      if (res.sendingType == "1") {
        const user : any = await prisma.user.findFirst({
          where: { id: Number(res.individualRecipient) },
        });      recipientCount = user?.length;
  
        await sendSMS(user?.phoneNumber, res.message);
  
  
      }
  
      if (res.sendingType == "2") {
        const user : any = await prisma.user.findMany({
          where: { districtId: Number(res.districtId) },
        });
  
        recipientCount = user.length;
  
        for (let i = 0; i < user.length; i++) {
          await sendSMS(user[i]?.phoneNumber, res.message);
  
        }
      }
  
      if (res.sendingType == "3") {
        const user : any = await prisma.user.findMany({
          where: { regionId: Number(res.regionId) },
        });
  
        recipientCount = user.length;
  
  
        for (let i = 0; i < user.length; i++) {
          await sendSMS(user[i]?.phoneNumber, res.message);
  
        }
      }
  
      if (recipientCount == 0) {
        return NextResponse.json({ message: "Recipient list is empty" }, { status: 201 });
      }
  
      const response = await prisma.messaging.update({ data,where:{id:messageId} });
      return NextResponse.json(data);
    } catch (error) {
  
      return NextResponse.json(error);
    }
  }
  

export async function GET(request: Request) {
  try {
    const data = await prisma.messaging.findMany({
      where: { deleted: 0,messageType:2 },
      include: {
        SendingType: true,
        District: true,
        Region: true,
        Recipient: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
