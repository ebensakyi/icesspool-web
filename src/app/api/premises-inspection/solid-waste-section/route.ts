import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data = {
      id: res.id,

      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      wasteServiceProviderRegistrationId:
        res.wasteServiceProviderRegistrationId == "null"
          ? null
          : Number(res.wasteServiceProviderRegistrationId),
      wasteCollectorName:
        res.wasteCollectorName == "null" ? null : res.wasteCollectorName,
      wasteSortingAvailabilityId:
        res.wasteSortingAvailabilityId == "null"
          ? null
          : Number(res.wasteSortingAvailabilityId),
      wasteCollectionFrequencyId:
        res.wasteCollectionFrequencyId == "null"
          ? null
          : Number(res.wasteCollectionFrequencyId),
      approvedWasteStorageReceptacleId:
        res.approvedWasteStorageReceptacleId == "null"
          ? null
          : Number(res.approvedWasteStorageReceptacleId),
      adequateWasteStorageReceptacleId:
        res.adequateWasteStorageReceptacleId == "null"
          ? null
          : Number(res.adequateWasteStorageReceptacleId),
      wasteCollectionTypeId:
        res.wasteCollectionTypeId == "null"
          ? null
          : Number(res.wasteCollectionTypeId),
      unservicedWasteDisposalId:
        res.unservicedWasteDisposalId == "null"
          ? null
          : Number(res.unservicedWasteDisposalId),
      wastePaymentEvidenceId:
        res.wastePaymentEvidenceId == "null"
          ? null
          : Number(res.wastePaymentEvidenceId),
      wasteContainerVolumeId:
        res.wasteContainerVolumeId == "null"
          ? null
          : Number(res.wasteContainerVolumeId),
      wasteProviderAccredittedId:
        res.wasteProviderAccredittedId == "null"
          ? null
          : Number(res.wasteProviderAccredittedId),
      containerNumber:
        res.containerNumber == "null" ? null : Number(res.containerNumber),

      wasteServicePhoneNumber: res.wasteServicePhoneNumber,
      rating: res.rating == "null" ? null : Number(Math.ceil(res.rating)),
    };

    const response = await prisma.solidWasteSection.create({ data });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    const res = await request.json();

    if (!userId) return res.status(200).json();

    const response = await prisma.solidWasteSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
