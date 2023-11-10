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
    const role = await prisma.userRole.create({ data });

    let pages = await selectedPages.map((page: any) => {
      return {
        pageId: page.value,
        userRoleId: role.id,
      };
    });

    // console.log(pages);

    const pageAccess = await prisma.pageAccess.createMany({
      data: pages,

      // data: {
      //   userRoleId: role.id,
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
    const data = await prisma.userRole.findMany({
      where: { deleted: 0 },
      include: { PageAccess: { include: { Page: true } } },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();

    let selectedPages = res.selectedPages;
    let userRoleId = res.roleId;

    let pages = await selectedPages.map((page: { value: any }) => {
      return {
        pageId: page.value,
        userRoleId: userRoleId,
      };
    });

    await prisma.pageAccess.deleteMany({
      where: {
        userRoleId: userRoleId,
      },
    });

    await prisma.userRole.update({
      data: {
        name: res.roleName,
      },
      where: {
        id: userRoleId,
      },
    });

    const pageAccess = await prisma.pageAccess.createMany({
      data: pages,

      // data: {
      //   userRoleId: userRoleId,
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

    const data = await prisma.userRole.update({
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
