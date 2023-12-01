import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    let selectedPages = res.selectedPages;

    const data = {
      name: res.roleName,
      inspectionDeletionAllowed: Number(res.inspectionDeletionAllowed),
      inspectionPublishAllowed: Number(res.inspectionPublishAllowed),
      inspectionUpdatesAllowed: Number(res.inspectionUpdatesAllowed),
    };
    const role = await prisma.userType.create({ data });

    let pages = await selectedPages.map((page: any) => {
      return {
        pageId: page.value,
        userTypeId: role.id,
      };
    });

    // console.log(pages);

    const pageAccess = await prisma.pageAccess.createMany({
      data: pages,

      // data: {
      //   userTypeId: role.id,
      // },
      // skipDuplicates: true,
    });

    return NextResponse.json(pageAccess);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.userType.findMany({
      where: { deleted: 0 },
      include: { PageAccess: { include: { Page: true } } },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let selectedPages = res.selectedPages;
    let userTypeId = res.roleId;

    let pages = await selectedPages.map((page: { value: any }) => {
      return {
        pageId: page.value,
        userTypeId: userTypeId,
      };
    });

    await prisma.pageAccess.deleteMany({
      where: {
        userTypeId: userTypeId,
      },
    });

    await prisma.userType.update({
      data: {
        name: res.roleName,
      },
      where: {
        id: userTypeId,
      },
    });

    const pageAccess = await prisma.pageAccess.createMany({
      data: pages,

      // data: {
      //   userTypeId: userTypeId,
      //   userTypeName: name,
      // },
      // skipDuplicates: true,
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = Number(searchParams.get("id"));

    const data = await prisma.userType.update({
      where: {
        id: id,
      },
      data: {
        deleted: 1,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log("error==> ", error);

    return NextResponse.json(error);
  }
}
