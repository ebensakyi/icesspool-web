// @ts-nocheck
export const dynamic = 'force-dynamic'

import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import fs from "fs";

const XLSX = require("xlsx");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const fileName = "sanitation-reports.xlsx";

    //   if (userId != null) {
    //     let response = await prisma.sanitationReport.findMany({
    //       where: {
    //         sanitationReportUserId: Number(userId),
    //         deleted: 0,
    //       },
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    //     });

    //     return NextResponse.json(response);
    //   }

    let searchText =
      searchParams.get("searchText") == "undefined"
        ? ""
        : searchParams.get("searchText");
    let status =
      searchParams.get("status") == "2" ||
      searchParams.get("status") == "1" ||
      searchParams.get("status") == "0"
        ? Number(searchParams.get("status"))
        : undefined;



    // const filterBy = searchParams.get("filterBy");
    // const filterValue = searchParams.get("filterValue");


   
    const response = await prisma.sanitationReport.findMany({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  District: {
                    name: {
                      contains: searchText,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  description: { contains: searchText, mode: "insensitive" },
                },
                {
                  community: { contains: searchText, mode: "insensitive" },
                },
              ],
              deleted: 0,
              status: status,
            }
          : {
              deleted: 0,
              status: status,
            },
      include: {
        District: true,
        SanitationReportUser: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    } as any);

   

    let newData = [];
    for (let i = 0; i < response?.length; i++) {
      newData?.push({
        // "Id": response[i]?.id,
        "Community": response[i]?.community,
        "District": response[i]?.District.name,
        "Status":
          response[i]?.status == 1
            ? "Completed"
            : response[i]?.status == 2
            ? "In progress"
            : "Pending",

        "Phone number": response[i]?.SanitationReportUser.phoneNumber,
        "Report Date": response[i]?.createdAt,
      });
    }

    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    let filePath = `./public/temp/${fileName}`;
    XLSX.writeFile(workBook, filePath);

    let url = await uploadFile(fileName);

    return NextResponse.json(url);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
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
