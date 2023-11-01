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
      facilityName: res.facilityName,
      hospitalityPremisesTypeId:
        res.hospitalityPremisesTypeId == "null"
          ? null
          : Number(res.hospitalityPremisesTypeId),
      physicalStructureTypeId:
        res.physicalStructureTypeId == "null"
          ? null
          : Number(res.physicalStructureTypeId),

      toiletAvailabilityId:
        res.toiletAvailabilityId == "null"
          ? null
          : Number(res.toiletAvailabilityId),

      urinalAvailabilityId:
        res.urinalAvailabilityId == "null"
          ? null
          : Number(res.urinalAvailabilityId),
      drainsAvailabilityId:
        res.drainsAvailabilityId == "null"
          ? null
          : Number(res.drainsAvailabilityId),
      bathroomAvailabilityId:
        res.bathroomAvailabilityId == "null"
          ? null
          : Number(res.bathroomAvailabilityId),
      approvedHandwashingFacilityAvailabilityId:
        res.approvedHandwashingFacilityAvailabilityId == "null"
          ? null
          : Number(res.approvedHandwashingFacilityAvailabilityId),

      cookedFoodStorageCondtionSafeId:
        res.cookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.cookedFoodStorageCondtionSafeId),

      uncookedFoodStorageCondtionSafeId:
        res.uncookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.uncookedFoodStorageCondtionSafeId),
      designatedSmokingAreaId:
        res.designatedSmokingAreaId == "null"
          ? null
          : Number(res.designatedSmokingAreaId),

      protectiveClothingUsedId:
        res.protectiveClothingUsedId == "null"
          ? null
          : Number(res.protectiveClothingUsedId),

      firstAidAvailabilityId:
        res.firstAidAvailabilityId == "null"
          ? null
          : Number(res.firstAidAvailabilityId),

      kitchenAvailabilityId:
        res.kitchenAvailabilityId == "null"
          ? null
          : Number(res.kitchenAvailabilityId),

      numberMaleWorkers:
        res.numberMaleWorkers == "null" ? null : Number(res.numberMaleWorkers),

      numberFemaleWorkers:
        res.numberFemaleWorkers == "null"
          ? null
          : Number(res.numberFemaleWorkers),

      numberFoodHandlingMedical:
        res.numberFoodHandlingMedical == "null"
          ? null
          : Number(res.numberFoodHandlingMedical),

      numberFoodHandling:
        res.numberFoodHandling == "null"
          ? null
          : Number(res.numberFoodHandling),

      numberRooms: res.numberRooms == "null" ? null : Number(res.numberRooms),

      facilityCapacity:
        res.facilityCapacity == "null" ? null : Number(res.facilityCapacity),
    };

    const response = await prisma.hospitalityPremisesInfoSection.create({
      data,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});

    const response = await prisma.hospitalityPremisesInfoSection.findMany({
      where: { userId: userId, deleted: 0 },
    });
    return NextResponse.json(response);
  } catch (error) {
    return  NextResponse.json( error);
  }
}
