import { prisma } from "@/prisma/db";
import { EateryInfo } from "@/typings";
import { logActivity } from "@/utils/log";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data: EateryInfo = {
      id: res.id,
      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      facilityName: res.facilityName,
      physicalStructureTypeId:
        res.physicalStructureTypeId == "null"
          ? null
          : Number(res.physicalStructureTypeId),
      eateryPremisesTypeId:
        res.eateryPremisesTypeId == "null"
          ? null
          : Number(res.eateryPremisesTypeId),
      eateryPremisesSubTypeId:
        res.eateryPremisesSubTypeId == "null"
          ? null
          : Number(res.eateryPremisesSubTypeId),
      designatedSmokingAreaId:
        res.designatedSmokingAreaId == "null"
          ? null
          : Number(res.designatedSmokingAreaId),

      drainsAvailabilityId:
        res.drainsAvailabilityId == "null"
          ? null
          : Number(res.drainsAvailabilityId),
      toiletAvailabilityId:
        res.toiletAvailabilityId == "null"
          ? null
          : Number(res.toiletAvailabilityId),
      urinalAvailabilityId:
        res.urinalAvailabilityId == "null"
          ? null
          : Number(res.urinalAvailabilityId),

      bathroomAvailabilityId:
        res.bathroomAvailabilityId == "null"
          ? null
          : Number(res.bathroomAvailabilityId),

      approvedHandwashingFacilityAvailabilityId:
        res.approvedHandwashingFacilityAvailabilityId == "null"
          ? null
          : Number(res.approvedHandwashingFacilityAvailabilityId),

      firstAidAvailabilityId:
        res.firstAidAvailabilityId == "null"
          ? null
          : Number(res.firstAidAvailabilityId),
      kitchenAvailabilityId:
        res.kitchenAvailabilityId == "null"
          ? null
          : Number(res.kitchenAvailabilityId),

      protectiveClothingUsedId:
        res.protectiveClothingUsedId == "null"
          ? null
          : Number(res.protectiveClothingUsedId),

      numberFoodHandling:
        res.numberFoodHandling == "null"
          ? null
          : Number(res.numberFoodHandling),

      numberFoodHandlingMedical:
        res.numberFoodHandlingMedical == "null"
          ? null
          : Number(res.numberFoodHandlingMedical),

      uncookedFoodStorageCondtionSafeId:
        res.uncookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.uncookedFoodStorageCondtionSafeId),

      cookedFoodStorageCondtionSafeId:
        res.cookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.cookedFoodStorageCondtionSafeId),
      disinfestationId:
        res.disinfestationId == "null" ? null : Number(res.disinfestationId),
      disinfestationFrequencyId:
        res.disinfestationFrequencyId == "null"
          ? null
          : Number(res.disinfestationFrequencyId),
      disinfectionId:
        res.disinfectionId == "null" ? null : Number(res.disinfectionId),

      disinfectionFrequencyId:
        res.disinfectionFrequencyId == "null"
          ? null
          : Number(res.disinfectionFrequencyId),
    };

    const response = await prisma.eateryPremisesInfoSection.create({ data });

    return new Response(
      JSON.stringify({
        action: 0,
        message: [],
      })
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});

    const data = await prisma.eateryPremisesInfoSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return  NextResponse.json(data);
  } catch (error) {}
}
