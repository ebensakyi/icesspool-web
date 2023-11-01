import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AWS from "aws-sdk";
import fs from "fs";
const XLSX = require("xlsx");


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    const data = {
      name: res.districtName,
      regionId: Number(res.regionId),
      abbrv: res.abbrv,
    };
    const response = await prisma.district.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedRegion =
      searchParams.get("regionId") == null
        ? undefined
        : Number(searchParams.get("regionId"));
        let exportFile = searchParams.get("exportFile");

    const get_all = Number(searchParams.get("get_all"));

    const session: any = await getServerSession(authOptions);

    const userLevel = session?.user?.userLevelId;
    const userDistrict = session?.user?.districtId;
    const userRegion = session?.user?.regionId;
    let query = {};

    let curPage = Number.isNaN(Number(searchParams.get("page")))?1: Number(searchParams.get("page"));

    let perPage = 10;
    let skip =
      Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);

    let count = 0;

    if (userLevel == 1) {
      if (get_all == 1) {
        query = {
          where: { deleted: 0, regionId: selectedRegion },

          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };
      } else {
        query = {
          where: { deleted: 0, regionId: selectedRegion },
          skip: skip,
          take: perPage,
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };

        count = await prisma.district.count({
          where: { deleted: 0, regionId: selectedRegion },
        });
      }
    } else if (userLevel == 2) {
      if (get_all == 1) {
        query = {
          where: { deleted: 0, regionId: selectedRegion },

          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };
      } else {
        query = {
          where: { deleted: 0, regionId: Number(userRegion) },
          skip: skip,
          take: perPage,
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };
        count = await prisma.district.count({
          where: { deleted: 0, regionId: Number(userRegion) },
        });
      }
    } else if (userLevel == 3) {
      if (get_all == 1) {
        query = {
          where: { deleted: 0, regionId: selectedRegion },

          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };
      } else {
        query = {
          where: { deleted: 0, id: Number(userDistrict) },
          skip: skip,
          take: perPage,
          include: { Region: true },
          orderBy: {
            name: "asc",
          },
        };
        count = await prisma.district.count({
          where: { deleted: 0, id: Number(userDistrict) },
        });
      }
    } else {
      query = {
        where: { deleted: 0 },
        orderBy: {
          name: "asc",
        },
      };
    }

    const response = await prisma.district.findMany(query);

     console.log("count===> ",count);
    


    // if (exportFile) {
      
    //   let url = await export2Excel(response);

    //   return NextResponse.json(url);
    // }

    return NextResponse.json({
      response,
      curPage: curPage,
      maxPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    let districtId = res.districtId;

    const data = {
      name: res.districtName,
      regionId: Number(res.regionId),
      abbrv: res.abbrv,
    };

    const response = await prisma.district.update({
      where: { id: Number(districtId) },
      data,
    });

    return NextResponse.json(response);
  } catch (error: any) {
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
      "Electoral Area": data[i]?.ElectoralArea.name,
      District: data[i]?.ElectoralArea?.District?.name,

      Region: data[i]?.ElectoralArea?.District?.Region?.name,

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
