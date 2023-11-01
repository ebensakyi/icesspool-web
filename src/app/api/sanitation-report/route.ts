import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { upload2S3, saveFileOnDisk } from "@/utils/upload";
import { sendSMS } from "../../../../utils/send-hubtel-sms";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const file: File | null = data.get("nuisancePicture") as unknown as File;
    const sanitationReportUserId = data?.get("userId");

    const description = data?.get("description");

    const reportType = Number(data?.get("reportType"));
    const districtId = Number(data?.get("districtId"));
    const reportCategoryId = Number(data?.get("reportCategoryId"));

    const latitude = data?.get("latitude");
    const longitude = data?.get("longitude");
    const communityLandmark = data?.get("communityLandmark");
    const address = data?.get("address");

    let district = await prisma.district.findFirst({
      where: {
        id: Number(districtId),
      },
    });

    let region = Number(district?.regionId);

    let fileName = await saveFileOnDisk(file);

    if (fileName != "0") {
      const data = {
        image: fileName,
        description: description,
        reportTypeId: reportType,
        reportCategoryId: reportCategoryId,
        latitude: latitude,
        longitude: longitude,
        districtId: districtId == 0 ? null : districtId,
        regionId: region,
        community: communityLandmark,
        address: address,
        sanitationReportUserId:
          sanitationReportUserId == "null"
            ? null
            : Number(sanitationReportUserId),
      };

      let reportCount = await prisma.sanitationReport.count({
        where: {
          image: fileName,
          description: description,
          reportTypeId: reportType,
          reportCategoryId: reportCategoryId,
          latitude: latitude,
          longitude: longitude,
        },
      } as any);
      if (reportCount != 0) {
        return NextResponse.json({});
      }

      const ip = await prisma.sanitationReport.create({ data } as any);

      await upload2S3(fileName, "esicapps-images");

      return NextResponse.json({ data: fileName }, { status: 200 });
    }

    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  } catch (error) {
    console.log("error===>", error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const districtId = Number(searchParams.get("districtId"));
    const userId = searchParams.get("userId");

    if (userId != null) {
      let response = await prisma.sanitationReport.findMany({
        where: {
          sanitationReportUserId: Number(userId),
          deleted: 0,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json(response);
    }

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
    let curPage = Number.isNaN(Number(searchParams.get("page")))
      ? 1
      : Number(searchParams.get("page"));

    let perPage = 10;
    let skip =
      Number((curPage - 1) * perPage) < 0 ? 0 : Number((curPage - 1) * perPage);

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
      skip: skip,
      take: perPage,
      orderBy: {
        createdAt: "desc",
      },
    } as any);

    const count = await prisma.sanitationReport.count({
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
    } as any);

    return NextResponse.json({
      response,
      curPage: curPage,
      maxPage: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let statuses = ["pending", "resolved", "in progress"];
    console.log(res);

    let sendSMSReporter = res?.sendSMS;
    let phoneNumber = res?.phoneNumber;
    let statusMessage = res?.statusMessage;
    await prisma.sanitationReport.update({
      where: {
        id: Number(res?.reportId),
      },
      data: {
        status: Number(res?.reportStatus),
        statusMessage: statusMessage,
      },
    });

    if (sendSMSReporter) {
      await sendSMS(
        phoneNumber,
        `Your reported nuisance is ${statuses[Number(res?.reportStatus)]}`
      );
    }

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
}
