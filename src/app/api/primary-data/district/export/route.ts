export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AWS from "aws-sdk";
import fs from "fs";
const XLSX = require("xlsx");


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedRegion =
      searchParams.get("regionId") == null
        ? undefined
        : Number(searchParams.get("regionId"));
    let exportFile = searchParams.get("exportFile");

    const searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    const get_all = Number(searchParams.get("get_all"));

    const session: any = await getServerSession(authOptions);
    

    const userLevel = session?.user?.userLevelId;
    const userDistrict = session?.user?.districtId;
    const userRegion = session?.user?.regionId;




    if (userLevel == 1) {
        const response = await prisma.district.findMany({
          where: { deleted: 0 },
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        });
        let url = await export2Excel(response);

        return NextResponse.json(url);
      
     
    } else if (userLevel == 2) {
        const response = await prisma.district.findMany({
          where: { deleted: 0 },
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        });
        let url = await export2Excel(response);

        return NextResponse.json(url);
      
   

    } else if (userLevel == 3) {
        const response = await prisma.district.findMany({
          where: { deleted: 0 },
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        });
        let url = await export2Excel(response);

        return NextResponse.json(url);
      
 
    } 
 
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}


const export2Excel = async (data: any) => {
  try {
    let flatData = await flattenArray(data);

    const workSheet = XLSX.utils.json_to_sheet(flatData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    let filePath = `./public/temp/districts.xlsx`;
    XLSX.writeFile(workBook, filePath);

    let url = await uploadFile("districts.xlsx");

    return url;
  } catch (error) {
    console.log("error NextResponse=> ");
  }
};

const flattenArray = async (data: any) => {
  let newData = [];

  for (let i = 0; i < data?.length; i++) {
    newData?.push({
      Name: data[i]?.name,
      Abbreviation: data[i]?.abbrv,
      // District: data[i]?.ElectoralArea?.District?.name,

      Region: data[i]?.Region?.name,
    });
  }

  return newData;
};

const uploadFile = async (fileName: any) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    var s3 = new AWS.S3();

    var filePath = `./public/temp/${fileName}`;

    var params = {
      Bucket: "esicapps-exports",
      Body: fs.createReadStream(filePath),
      // Key: prefix + "/" + fileName,
      Key: fileName,
    };

    let stored = await s3.upload(params).promise();

    return stored.Location;
  } catch (error) {
    console.log("Upload File Error ", error);
    return error;
  }
};
