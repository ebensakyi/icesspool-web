import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const data:any = {
      id: res.id,
      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      facilityName: res.facilityName,
      institutionPremisesTypeId:
        res.institutionPremisesTypeId == "null"
          ? ""
          : Number(res.institutionPremisesTypeId),
      institutionPremisesSubtypeId:
        res.institutionPremisesSubtypeId == "null"
          ? ""
          : Number(res.institutionPremisesSubtypeId),

      toiletAvailabilityId:
        res.toiletAvailabilityId == "null"
          ? ""
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

      firstAidAvailabilityId:
        res.firstAidAvailabilityId == "null"
          ? ""
          : Number(res.firstAidAvailabilityId),

      numberTeachingStaff:
        res.numberTeachingStaff == "null"
          ? null
          : Number(res.numberTeachingStaff),
      numberNonTeachingStaff:
        res.numberNonTeachingStaff == "null"
          ? null
          : Number(res.numberNonTeachingStaff),

      numberMaleStudents:
        res.numberMaleStudents == "null"
          ? null
          : Number(res.numberMaleStudents),

      numberFemaleStudents:
        res.numberFemaleStudents == "null"
          ? null
          : Number(res.numberFemaleStudents),

      kitchenAvailabilityId:
        res.kitchenAvailabilityId == "null"
          ? null
          : Number(res.kitchenAvailabilityId),

      uncookedFoodStorageCondtionSafeId:
        res.uncookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.uncookedFoodStorageCondtionSafeId),

      cookedFoodStorageCondtionSafeId:
        res.cookedFoodStorageCondtionSafeId == "null"
          ? null
          : Number(res.cookedFoodStorageCondtionSafeId),
      kitchenConditionId:
        res.kitchenConditionId == "null"
          ? null
          : Number(res.kitchenConditionId),
      protectiveClothingUsedId:
        res.protectiveClothingUsedId == "null"
          ? null
          : Number(res.protectiveClothingUsedId),
      numberFoodHandling:
        res.numberFoodHandling == "null"
          ? null
          : Number(res.numberFoodHandling),
      numberFoodHandlingMedicalId:
        res.numberFoodHandlingMedicalId == "null"
          ? null
          : Number(res.numberFoodHandlingMedicalId),
      numberClassRoomsId:
        res.numberClassRoomsId == "null"
          ? null
          : Number(res.numberClassRoomsId),
      shepClubExistenceId:
        res.shepClubExistenceId == "null"
          ? null
          : Number(res.shepClubExistenceId),

      numberOtherRooms:
        res.numberOtherRooms == "null" ? null : Number(res.numberOtherRooms),
      animalSpaceConditionId:
        res.animalSpaceConditionId == "null"
          ? null
          : Number(res.animalSpaceConditionId),
      animalSpaceAvailabilityId:
        res.animalSpaceAvailabilityId == "null"
          ? null
          : Number(res.animalSpaceAvailabilityId),
      premisesConditionId:
        res.premisesConditionId == "null"
          ? null
          : Number(res.premisesConditionId),
      slaughterAreaAvailabilityId:
        res.slaughterAreaAvailabilityId == "null"
          ? null
          : Number(res.slaughterAreaAvailabilityId),
      slaughterAreaConditionId:
        res.slaughterAreaConditionId == "null"
          ? null
          : Number(res.slaughterAreaConditionId),
      soundProofId:
        res.soundProofId == "null" ? null : Number(res.soundProofId),
      ablutionSlabId:
        res.ablutionSlabId == "null" ? null : Number(res.ablutionSlabId),
      ablutionSlabConditionId:
        res.ablutionSlabConditionId == "null"
          ? null
          : Number(res.ablutionSlabConditionId),

      facilityCapacity:
        res.facilityCapacity == "null" ? null : Number(res.facilityCapacity),
      multipleExitId:
        res.multipleExitId == "null" ? null : Number(res.multipleExitId),
      disabilityFriendlyId:
        res.disabilityFriendlyId == "null"
          ? null
          : Number(res.disabilityFriendlyId),
      emergencyExitId:
        res.emergencyExitId == "null" ? null : Number(res.emergencyExitId),
      emergencyAssemblyPointId:
        res.emergencyAssemblyPointId == "null"
          ? null
          : Number(res.emergencyAssemblyPointId),
      overcrowdingId:
        res.overcrowdingId == "null" ? null : Number(res.overcrowdingId),
      adequateLighteningId:
        res.adequateLighteningId == "null"
          ? null
          : Number(res.adequateLighteningId),

      adequateVentilationId:
        res.adequateVentilationId == "null"
          ? null
          : Number(res.adequateVentilationId),
      numberCompoundFoodVendor:
        res.numberCompoundFoodVendor == "null"
          ? null
          : Number(res.numberCompoundFoodVendor),
      numberFoodVendorMedicallyCertified:
        res.numberFoodVendorMedicallyCertified == "null"
          ? null
          : Number(res.numberFoodVendorMedicallyCertified),
      fireExtinguisherId:
        res.fireExtinguisherId == "null"
          ? null
          : Number(res.fireExtinguisherId),
      numberFireExtinguisher:
        res.numberFireExtinguisher == "null"
          ? null
          : Number(res.numberFireExtinguisher),
      buildingStructureConditionId:
        res.buildingStructureConditionId == "null"
          ? null
          : Number(res.buildingStructureConditionId),

      physicalStructureTypeId:
        res.physicalStructureTypeId == "null"
          ? null
          : Number(res.physicalStructureTypeId),
      foodVendorAvailabilityId:
        res.foodVendorAvailabilityId == "null"
          ? null
          : Number(res.foodVendorAvailabilityId),

      boardingHouseAvailabilityId:
        res.boardingHouseAvailabilityId == "null"
          ? null
          : Number(res.boardingHouseAvailabilityId),

      boardingHouseOvercrowdedId:
        res.boardingHouseOvercrowdedId == "null"
          ? null
          : Number(res.boardingHouseOvercrowdedId),

      separateBoardingBoysGirlsId:
        res.separateBoardingBoysGirlsId == "null"
          ? null
          : Number(res.separateBoardingBoysGirlsId),

      boardingHouseConditionId:
        res.boardingHouseConditionId == "null"
          ? null
          : Number(res.boardingHouseConditionId),
    };
    const response = await prisma.institutionPremisesInfoSection.create({
     data
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

    const response = await prisma.institutionPremisesInfoSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json( error);
  }
}
