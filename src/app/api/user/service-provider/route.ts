import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { generateCode } from "@/libs/generate-code";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { sendSMS } from "@/libs/send-hubtel-sms";

const XLSX = require("xlsx");

import multer from "multer";
import aws from "aws-sdk";
import { getMergedDate } from "@/libs/date";
import { MOBILE_DEVICE } from "@/config";
import { authOptions } from "../../auth/[...nextauth]/options";

const s3 = new aws.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
export async function POST(request: Request) {
  try {
    const _data = await request.formData();

    const passportPicture: File | null = _data.get(
      "passportPicture"
    ) as unknown as File;
    const firstName = _data?.get("firstName");
    const lastName = _data?.get("lastName");
    const email = _data?.get("email");
    const phoneNumber: any = _data?.get("phoneNumber");
    const serviceAreaId = Number(_data?.get("serviceArea"));

    const company: any = _data?.get("company");
    const ghanaPostGPS = _data?.get("ghanaPostGPS");
    const officeLocation = _data?.get("officeLocation");
    const licenseClassification = _data?.get("licenseClassification");
    const licenseNumber = _data?.get("licenseNumber");
    const momoNetwork = _data?.get("momoNetwork");
    const momoNumber = _data?.get("momoNumber");
    const service = _data?.get("service");

    // const res = await request.json();
    // const session: any = await getServerSession(authOptions);

    // // let loginUserLevel = session?.user?.userLevelId;
    // // let fileUrl;

    let password: string = (await generateCode(8)) as string;
    const salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);

    const data: any = {
      userTypeId: 3,
      lastName: lastName,
      firstName: firstName,
      email: email,
      phoneNumber: phoneNumber,
      serviceAreaId: serviceAreaId,
      password: hashedPassword,
    };

    let count = await prisma.user.count({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (count != 0) {
      return NextResponse.json(
        { message: "Phone number already used" },
        { status: 201 }
      );
    }

    const user: any = await prisma.user.create({ data });

    const otp: any = await prisma.otp.create({
      data: {
        code: password,
        userId: user.id,
      },
    });

    await sendSMS(
      phoneNumber,
      `The temporal password for iCesspool is ${password}`
    );
    let spId =
      "SP" + serviceAreaId + (await getMergedDate()) + (await generateCode(4));
    let operatorData: any = {
      id: spId,
      userId: user.id,
      company: company,
      officeLocation: officeLocation,
      ghanaPostGPS: ghanaPostGPS,
      licenseClassification: Number(licenseClassification),
      licenseNumber: licenseNumber,
      serviceId: Number(service),
    };

    let momoData: any = {
      momoNetworkId: Number(momoNetwork),
      momoNumber: momoNumber,
      userId: user.id,
    };

    let serviceProvider = await prisma.serviceProvider.create({
      data: operatorData,
    });

    await prisma.momoAccount.create({
      data: momoData,
    });

    await prisma.serviceProviderBalance.create({
      data: { balance: 0, serviceProviderId: serviceProvider.id },
    });

    await prisma.serviceProviderRating.create({
      data: { rating: 0.0, serviceProviderId: serviceProvider.id },
    });
    ////////////////////////////////////////////////////////////////
    await upload.single("passportPicture");

    if (!passportPicture) {
      return NextResponse.json(
        { error: "Please select an image file" },
        { status: 400 }
      );
    }

    const arrayBuffer = await passportPicture.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    let imageName = `${Date.now()}-${passportPicture.name}`;

    const params: any = {
      Bucket: process.env.AWS_BUCKET,
      Key: `uploads/${imageName}`,
      Body: buffer,
      // Body: fs.createReadStream(passportPicture: File),
      // ACL: 'public-read', // adjust access control as needed
    };

    const result = await s3.upload(params).promise();

    const imageUrl = result.Location;

    const updatedUser: any = await prisma.user.update({
      where: { id: user.id },
      data: { passportPicture: imageName },
    });

    //await  uploadFile(passportPicture);

    ////////////////////////////////////////////////////////////////

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);

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

    const spId = res.spId;

    const firstName = res.firstName;
    const lastName = res.lastName;
    const email = res.email;
    const phoneNumber = res.phoneNumber;
    const serviceAreaId = res.serviceArea;

    const company = res.company;
    const ghanaPostGPS = res.ghanaPostGPS;
    const officeLocation = res.officeLocation;
    const licenseClassification = res.licenseClassification;
    const licenseNumber = res.licenseNumber;
    const momoNetwork = res.momoNetwork;
    const momoNumber = res.momoNumber;
    const service = res.service;

    const data = {
      userTypeId: 3,
      lastName,
      firstName,
      email,
      phoneNumber,
      serviceAreaId: Number(serviceAreaId),
    };

    const user = await prisma.user.update({
      data,
      where: { id: Number(userId) },
    });

    // const serviceProvider = await prisma.serviceProvider.findFirst({
    //   where: { id: Number(spId) },
    // });

    const momoAccount = await prisma.momoAccount.findFirst({
      where: { userId: userId },
    });

    const operatorData = {
      userId,
      company,
      officeLocation,
      ghanaPostGPS,
      licenseClassification: Number(licenseClassification),
      licenseNumber,
      serviceId: Number(service),
    };

    const momoData = {
      momoNetworkId: Number(momoNetwork),
      momoNumber,
      userId: Number(userId),
    };

    if (spId)
      await prisma.serviceProvider.update({
        data: operatorData,
        where: { id: spId },
      });

    if (momoAccount)
      await prisma.momoAccount.update({
        data: momoData,
        where: { userId },
      });

    // if (!passportPicture) {
    //   return NextResponse.json(
    //     { message: "No passport picture provided" },
    //     { status: 204 }
    //   );
    // } else {
    //   const arrayBuffer = await passportPicture.arrayBuffer();
    //   const buffer = new Uint8Array(arrayBuffer);
    //   const imageName = `${Date.now()}-${passportPicture.name}`;

    //   const params = {
    //     Bucket: process.env.AWS_BUCKET!,
    //     Key: `uploads/${imageName}`,
    //     Body: buffer,
    //   };

    //   const result = await s3.upload(params).promise();
    //   const imageUrl = result.Location;

    //   await prisma.user.update({
    //     where: { id: user.id },
    //     data: { passportPicture: imageName },
    //   });
    // }

    return NextResponse.json({});
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    let userServiceArea = Number(session?.user?.serviceAreaId);

    const { searchParams } = new URL(request.url);

    const serviceAreaId = searchParams.get("serviceAreaId");
    const serviceId = searchParams.get("serviceId");
    const device = searchParams.get("device");

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

    if (device == MOBILE_DEVICE) {
      const water_sp = await prisma.user.findMany({
        where: { userTypeId: 3, deleted: 0 },
        include: { ServiceProvider: true },
      });

      const newm = water_sp
        .filter((wsp) => wsp.ServiceProvider?.serviceId === Number(serviceId))
        .map((wsp) => ({
          id: wsp.id,
          spName: wsp.firstName + " " + wsp.lastName,
          companyName: wsp.ServiceProvider?.company,
          serviceId: wsp.ServiceProvider?.serviceId,
          spPhoneNumber: wsp?.phoneNumber,
          avatar: wsp.passportPicture,
        }));

      return NextResponse.json(newm);
    }



    if (userServiceArea == 1) {
      const response = await prisma.user.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    lastName: {
                      contains: searchText,
                      //mode: "insensitive",
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
                      //mode: "insensitive",
                    },
                  },
                ],
                deleted: 0,
                userTypeId: 3,
              }
            : { deleted: 0, userTypeId: 3 },
        include: {
          UserType: true,
          ServiceArea: true,
          ServiceProvider: true,
          MomoAccount: true,
          Otp: true,
        },
        skip: skip,
        take: perPage,
        orderBy: {
          id: "desc",
        },
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
                userTypeId: 3,
              }
            : { userTypeId: 3, deleted: 0 },
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
                    //mode: "insensitive",
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
                    //mode: "insensitive",
                  },
                },
              ],
              deleted: 0,
              userTypeId: 3, serviceAreaId: userServiceArea 
            }
          : { deleted: 0, userTypeId: 3 , serviceAreaId: userServiceArea },
      include: {
        UserType: true,
        ServiceArea: true,
        ServiceProvider: true,
MomoAccount: true,
        Otp: true,
      },
      skip: skip,
      take: perPage,
      orderBy: {
        id: "desc",
      },
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
              userTypeId: 3,
               serviceAreaId: userServiceArea
            }
          : { userTypeId: 3, deleted: 0 , serviceAreaId: userServiceArea},
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

// const uploadFile = async (fileName: any) => {
//   try {
//     AWS.config.update({
//       accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });

//     var s3 = new AWS.S3();

//    // var filePath = `./public/temp/${fileName}`;

//     var params = {
//       Bucket: "esicapps-exports",
//       Body: fs.createReadStream(filePath),
//       // Key: prefix + "/" + fileName,
//       Key: fileName,
//     };

//     let stored = await s3.upload(params).promise();

//     return stored.Location;
//   } catch (error) {
//     console.log("Upload File Error ", error);
//     return error;
//   }
// };

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

    // let url = await uploadFile("users.xlsx");

    // return url;
  } catch (error) {
    console.log("error NextResponse=> ");
  }
};
