export const dynamic = "force-dynamic";

import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
  try {
    let { searchParams } = new URL(request.url);

    let allTransactions: any = await prisma.transaction.count({
      where: { deleted: 0 },
    });
    let allCompletedTransactions: any = await prisma.transaction.count({
      where: {
        deleted: 0,
        currentStatus: {
          in: [4, 5, 6],
        },
      },
    });

    let allPendingTransactions: any = await prisma.transaction.count({
      where: {
        deleted: 0,
        currentStatus: {
          in: [1, 2, 3, 9],
        },
      },
    });
    let allCancelledTransactions: any = await prisma.transaction.count({
      where: {
        deleted: 0,
        currentStatus: {
          in: [7, 8],
        },
      },
    });

    ///Biodigester
    let bTransactions: any = await prisma.transaction.count({
      where: { serviceId: 3, deleted: 0 },
    });
    let bCompletedTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 3,
        deleted: 0,
        currentStatus: {
          in: [4, 5, 6],
        },
      },
    });

    let bPendingTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 3,
        deleted: 0,
        currentStatus: {
          in: [1, 2, 3, 9],
        },
      },
    });
    let bCancelledTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 3,
        deleted: 0,
        currentStatus: {
          in: [7, 8],
        },
      },
    });

    ///Water Tanker
    let wTransactions: any = await prisma.transaction.count({
      where: { serviceId: 2, deleted: 0 },
    });
    let wCompletedTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 2,
        deleted: 0,
        currentStatus: {
          in: [4, 5, 6],
        },
      },
    });

    let wPendingTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 2,
        deleted: 0,
        currentStatus: {
          in: [1, 2, 3, 9],
        },
      },
    });
    let wCancelledTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 2,
        deleted: 0,
        currentStatus: {
          in: [7, 8],
        },
      },
    });

    ///Toilet Tanker
    let tTransactions: any = await prisma.transaction.count({
      where: { serviceId: 1, deleted: 0 },
    });
    let tCompletedTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 1,
        deleted: 0,
        currentStatus: {
          in: [4, 5, 6],
        },
      },
    });

    let tPendingTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 1,
        deleted: 0,
        currentStatus: {
          in: [1, 2, 3, 9],
        },
      },
    });
    let tCancelledTransactions: any = await prisma.transaction.count({
      where: {
        serviceId: 1,
        deleted: 0,
        currentStatus: {
          in: [7, 8],
        },
      },
    });

    ///Users
    let sp = await prisma.user.count({
      where: { userTypeId: 3, deleted: 0 },
    });
    let client = await prisma.user.count({
      where: { userTypeId: 4, deleted: 0 },
    });
    let admin = await prisma.user.count({
      where: { userTypeId: 1, deleted: 0 },
    });
    let scanner = await prisma.user.count({
      where: { userTypeId: 2, deleted: 0 },
    });

    let data = {
      users: { sp, client, admin, scanner },
      allTx: {
        allTransactions,
        allPendingTransactions,
        allCompletedTransactions,
        allCancelledTransactions,
      },
      bTx: {
        bTransactions,
        bCompletedTransactions,
        bCancelledTransactions,
        bPendingTransactions,
      },
      wTx: {
        wTransactions,
        wCompletedTransactions,
        wCancelledTransactions,
        wPendingTransactions,
      },
      tTx: {
        tTransactions,
        tPendingTransactions,
        tCompletedTransactions,
        tCancelledTransactions,
      },
    };

    

    return NextResponse.json(data);
  } catch (error) {
    console.log("error==> " + error);
  }
}
