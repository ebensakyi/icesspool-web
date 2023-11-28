import { prisma } from "@/prisma/db";

import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { logActivity } from "@/libs/log";

const XLSX = require("xlsx");
export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    const session: any = await getServerSession(authOptions);

    const userId = session?.user?.id;

    await logActivity(`Visited user logs page`, userId);

    let curPage = Number.isNaN(Number(searchParams.get("page")))
      ? 1
      : Number(searchParams.get("page"));

    let perPage = 10;
    let skip =
      Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);
    let searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    // let count = await prisma.logs.count({ where: { deleted: 0 } });

    // let response = await prisma.logs.findMany({
    //   where: { deleted: 0 },
    //   include: { User: true },
    //   skip: skip,
    //   take: perPage,
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    // return NextResponse.json({
    //   response,
    //   curPage: curPage,
    //   maxPage: Math.ceil(count / perPage),
    // });

    return NextResponse.json({})
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  try {
    //let rawData = [];
    // let response = await prisma.logs.findMany({
    //   where: { deleted: 0 },
    //   include: { User: true },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    // for (let i = 0; i < response?.length; i++) {
    //   rawData?.push({
    //     User: response[i]?.User.otherNames + " " + response[i]?.User.surname,
    //     Activity: response[i]?.activity,
    //     Date: response[i]?.createdAt,
    //   });
    // }

    // const workSheet = XLSX.utils.json_to_sheet(rawData);
    // const workBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    // let filePath = `./public/temp/user-logs.xlsx`;
    // XLSX.writeFile(workBook, filePath);

    // let url = await uploadFile("user-logs.xlsx");
   // return NextResponse.json(url);
    return NextResponse.json({})
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}

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
