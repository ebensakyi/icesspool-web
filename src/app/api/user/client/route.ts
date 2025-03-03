import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { generateCode } from "@/libs/generate-code";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { sendSMS } from "@/libs/send-hubtel-sms";
import AWS from "aws-sdk";
import fs from "fs";
import { authOptions } from "../../auth/[...nextauth]/options";

const XLSX = require("xlsx");
export async function POST(request: Request) {
  try {
    const res = await request.json();
    const session: any = await getServerSession(authOptions);

    // let loginUserLevel = session?.user?.userLevelId;
    // let fileUrl;

    let password: string = (await generateCode(4)) as string;
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);

    // let regionId = res.region;

    // if (regionId == null) {
    //   const district = await prisma.district.findFirst({
    //     where: { id: Number(res.district) },
    //   });

    //   regionId = district?.regionId;
    // }

    const data = {
      userTypeId: 4,
      lastName: res.lastName,
      firstName: res.firstName,
      email: res.email,
      phoneNumber: res.phoneNumber,
      password: hashedPassword,
    };

    let count = await prisma.user.count({
      where: {
        phoneNumber: res.phoneNumber,
      },
    });
    if (count != 0) {
      return NextResponse.json(
        { message: "Phone number already used" },
        { status: 201 }
      );
    }

    const user: any = await prisma.user.create({ data });

    await sendSMS(
      res.phoneNumber,
      `The temporal password for iCesspool App is ${password}`
    );
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    let userServiceArea = session?.user?.serviceAreaId;

    const { searchParams } = new URL(request.url);

    const searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    let curPage = Number.isNaN(Number(searchParams.get("page")))
      ? 1
      : Number(searchParams.get("page"));

    let perPage = 10;
    let skip =
      Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);

    if (userServiceArea == 1) {
      const response = await prisma.user.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    lastName: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                  {
                    firstName: {
                      contains: searchText,
                      //mode: "insensitive",
                    },
                  },
                  {
                    phoneNumber: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                ],
                userTypeId: 4,
                deleted: 0,
              }
            : { userTypeId: 4, deleted: 0 },
        include: {
          UserType: true,
          Otp: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: skip,
        take: perPage,
      });

      const count = await prisma.user.count({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    lastName: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                  {
                    firstName: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                  {
                    phoneNumber: {
                      contains: searchText,
                      //mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: searchText,
                     // mode: "insensitive",
                    },
                  },
                ],
                deleted: 0,
                userTypeId: 4,
              }
            : { userTypeId: 4, deleted: 0 },
      });

      return NextResponse.json({
        response,
        curPage: curPage,
        maxPage: Math.ceil(count / perPage),
      });
    }
    const response = await prisma.user.findMany({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  lastName: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
                {
                  firstName: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
                {
                  phoneNumber: {
                    contains: searchText,
                    //mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
              ],
              userTypeId: 4,
              deleted: 0,
              serviceAreaId: userServiceArea,
            }
          : { userTypeId: 4, deleted: 0, serviceAreaId: userServiceArea },
      include: {
        UserType: true,
        Otp: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skip,
      take: perPage,
    });

    const count = await prisma.user.count({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  lastName: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
                {
                  firstName: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
                {
                  phoneNumber: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: searchText,
                   // mode: "insensitive",
                  },
                },
              ],
              deleted: 0,
              userTypeId: 4,
              serviceAreaId: userServiceArea,
            }
          : { userTypeId: 4,
             deleted: 0, 
             serviceAreaId: userServiceArea },
    });

    return NextResponse.json({
      response,
      curPage: curPage,
      maxPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let userId = res.userId;
    let changeStatus = res.changeStatus;

    if (changeStatus) {
      const user: any = await prisma.user.findFirst({
        where: { id: userId },
        select: { activated: true },
      });

      const newActivatedValue = Math.abs(user?.activated - 1);

      await prisma.user.update({
        data: {
          activated: newActivatedValue,
        },
        where: {
          id: userId,
        },
      });

      return NextResponse.json({});
    }

    const data = {
      lastName: res.lastName,
      firstName: res.firstName,
      email: res.email,
      phoneNumber: res.phoneNumber,
    };

    await prisma.user.update({
      data: data,
      where: {
        id: userId,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const res = await request.json();

    let userId = res;

    let user: any = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    let updatedPhoneNumber = user?.phoneNumber + "-deleted-" + uuidv4();
    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        deleted: Math.abs(user?.deleted - 1),
        phoneNumber: updatedPhoneNumber,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}

const uploadFile = async (fileName: any) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.MY_AWS_ACCESS_KEY,
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

const flattenArray = async (data: any) => {
  let newData = [];

  for (let i = 0; i < data?.length; i++) {
    newData?.push({
      Name: data[i]?.firstName + data[i]?.lastName,
      "Phone Number": data[i]?.phoneNumber,
      Email: data[i]?.email,
      // "User Level": data[i]?.UserLevel?.name,
      Region: data[i]?.Region?.name,
      District: data[i]?.District?.name,
    });
  }

  return newData;
};

const export2Excel = async (data: any) => {
  try {
    let flatData = await flattenArray(data);

    const workSheet = XLSX.utils.json_to_sheet(flatData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    let filePath = `./public/temp/users.xlsx`;
    XLSX.writeFile(workBook, filePath);

    let url = await uploadFile("users.xlsx");

    return url;
  } catch (error) {
    console.log("error NextResponse=> ");
  }
};
