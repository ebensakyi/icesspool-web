export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { app } from "@/libs/firebase-config";

export async function GET(request: Request) {
  try {   
     const session: any = await getServerSession(authOptions);

     let userServiceArea = session?.user?.serviceAreaId     


    let { searchParams } = new URL(request.url);

    let userId = Number(searchParams.get("userId"));
    let txId = searchParams.get("txId");


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

    if (txId) {
      const response = await prisma.transactionStatus.findMany({
        where: {
          transactionId: txId,
        },
        include: {
          TxStatus: true,
        },
      });

      return NextResponse.json({
        response,
      });
    }




    if (userServiceArea == 1) {
      const response = await prisma.transaction.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    id: {
                      contains: searchText,
                      mode: "insensitive",
                    },
                  },

                  // {
                  //   Customer: {
                  //     firstName: { contains: searchText, mode: "insensitive" },
                  //   },
                  // },
                  // {
                  //   ServiceProvider: {
                  //       firstName: { contains: searchText, mode: "insensitive" },

                  //   },
                  // },
                  // {
                  //   ServiceArea: {
                  //       name: { contains: searchText, mode: "insensitive" },

                  //   },
                  // },
                ],
                deleted: 0,
                serviceId: 3,
              }
            : { deleted: 0, serviceId: 3 },
        include: {
          BiodigesterTransaction: true,
          Customer: true,
          ServiceProvider: true,
          ServiceArea: true,
          TxStatus: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: skip,
        take: perPage,
      });

      const count = await prisma.transaction.count({
        where: { deleted: 0, serviceId: 3 },
      });

      return NextResponse.json({
        response,
        curPage: curPage,
        maxPage: Math.ceil(count / perPage),
      });
    }

    const response = await prisma.transaction.findMany({
      where:
        searchText != ""
          ? {
              OR: [
                {
                  id: {
                    contains: searchText,
                    mode: "insensitive",
                  },
                },

                // {
                //   Customer: {
                //     firstName: { contains: searchText, mode: "insensitive" },
                //   },
                // },
                // {
                //   ServiceProvider: {
                //       firstName: { contains: searchText, mode: "insensitive" },

                //   },
                // },
                // {
                //   ServiceArea: {
                //       name: { contains: searchText, mode: "insensitive" },

                //   },
                // },
              ],
              deleted: 0,
              serviceId: 3,
              serviceAreaId: userServiceArea,
            }
          : { deleted: 0, serviceId: 3, serviceAreaId: userServiceArea},
      include: {
        BiodigesterTransaction: true,
        Customer: true,
        ServiceProvider: true,
        ServiceArea: true,
        TxStatus: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skip,
      take: perPage,
    });

    const count = await prisma.transaction.count({
      where: { deleted: 0, serviceId: 3, serviceAreaId: userServiceArea },
    });

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
    const db = getFirestore(app);

    let transactionId = res.id;

    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        deleted: 1,
      },
    });

    await setDoc(
      doc(db, `${process.env.PROD_TRANSACTION_COLLECTION}`, transactionId),
      {
        deleted: true,
      }
    );

    return NextResponse.json({});
  } catch (error) {
    console.log(error);

    return NextResponse.json(error);
  }
}
