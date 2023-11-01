import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { upload2S3, saveFileOnDisk } from "@/utils/upload";

export async function POST(request: Request) {
  try {



    const data = await request.formData();

    const file: File | null = data.get("imageFile") as unknown as File;
    const inspectionId = data?.get("inspectionId");

    const formSectionImageId = data?.get("formSectionImageId");

    

    let fileName = await saveFileOnDisk(file);


    if (fileName != "0") {
      const data = {
        inspectionId: inspectionId,
        imagePath: fileName,
        formSectionImageId:
          formSectionImageId == "null" ? 1 : Number(formSectionImageId),
      };

      const ip = await prisma.inspectionPictures.create({ data } as any);
      await upload2S3(fileName,"esicapps-images");

      return NextResponse.json({ data: fileName }, { status: 200 });
    }

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
