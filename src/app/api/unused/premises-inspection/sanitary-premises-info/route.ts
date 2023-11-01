import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();

    const data: any = {
      id: res.id,
      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      facilityName: res.facilityName,
      physicalStructureTypeId:
        res.physicalStructureTypeId == "null"
          ? null
          : Number(res.physicalStructureTypeId),
      sanitaryPremisesSubtypeId:
        res.sanitaryPremisesSubtypeId == "null"
          ? null
          : Number(res.sanitaryPremisesSubtypeId),

      sanitaryPremisesTypeId:
        res.sanitaryPremisesTypeId == "null"
          ? null
          : Number(res.sanitaryPremisesTypeId),
      toiletAvailabilityId:
        res.toiletAvailabilityId == "null"
          ? null
          : Number(res.toiletAvailabilityId),
      staffChangingRoomId:
        res.staffChangingRoomId == "null"
          ? null
          : Number(res.staffChangingRoomId),

      ownershipTypeId:
        res.ownershipTypeId == "null" ? null : Number(res.ownershipTypeId),

      sanitaryFacilityMgtId:
        res.sanitaryFacilityMgtId == "null"
          ? null
          : Number(res.sanitaryFacilityMgtId),

      disinfectionFrequencyId:
        res.disinfectionFrequencyId == "null"
          ? null
          : Number(res.disinfectionFrequencyId),

      disinfestationQuarterlyId:
        res.disinfestationQuarterlyId == "null"
          ? null
          : Number(res.disinfestationQuarterlyId),

      protectiveClothingUsedId:
        res.protectiveClothingUsedId == "null"
          ? null
          : Number(res.protectiveClothingUsedId),

      slaughterAreaAvailabilityId:
        res.slaughterAreaAvailabilityId == "null"
          ? null
          : Number(res.slaughterAreaAvailabilityId),

      storeRoomAvailabilityId:
        res.storeRoomAvailabilityId == "null"
          ? null
          : Number(res.storeRoomAvailabilityId),

      condemnationRoomAvailabilityId:
        res.condemnationRoomAvailabilityId == "null"
          ? null
          : Number(res.condemnationRoomAvailabilityId),

      cloakRoomAvailabilityId:
        res.cloakRoomAvailabilityId == "null"
          ? null
          : Number(res.cloakRoomAvailabilityId),
      comfortRoomAvailabilityId:
        res.comfortRoomAvailabilityId == "null"
          ? null
          : Number(res.comfortRoomAvailabilityId),
      wheelbathAvailabilityId:
        res.wheelbathAvailabilityId == "null"
          ? null
          : Number(res.wheelbathAvailabilityId),
      footbathAvailabilityId:
        res.footbathAvailabilityId == "null"
          ? null
          : Number(res.footbathAvailabilityId),

      // wasteSortingId:
      //   res.wasteSortingId == "null"
      //     ? null
      //     : Number(res.wasteSortingId),

      leachateMgtId:
        res.leachateMgtId == "null" ? null : Number(res.leachateMgtId),
      safeHazardousWasteMgtId:
        res.safeHazardousWasteMgtId == "null"
          ? null
          : Number(res.safeHazardousWasteMgtId),
      sextonManagementId:
        res.sextonManagementId == "null"
          ? null
          : Number(res.sextonManagementId),

      sextonOfficeId:
        res.sextonOfficeId == "null" ? null : Number(res.sextonOfficeId),
      properLayoutId:
        res.properLayoutId == "null" ? null : Number(res.properLayoutId),
      siteFencedId:
        res.siteFencedId == "null" ? null : Number(res.siteFencedId),

      cremationPracticedId:
        res.cremationPracticedId == "null"
          ? null
          : Number(res.cremationPracticedId),
      workersOfficeAvailabilityId:
        res.workersOfficeAvailabilityId == "null"
          ? null
          : Number(res.workersOfficeAvailabilityId),

      transferStationCapacity:
        res.transferStationCapacity == "null"
          ? null
          : Number(res.transferStationCapacity),
      numberContainer:
        res.numberContainer == "null" ? null : Number(res.numberContainer),
      containerAttendantName:
        res.containerAttendantName == "null"
          ? null
          : Number(res.containerAttendantName),
      containerAttendantPhoneNumber:
        res.containerAttendantPhoneNumber == "null"
          ? null
          : res.containerAttendantPhoneNumber == ""
          ? null
          : res.containerAttendantPhoneNumber,

      ///////////////New////
      numberWorkers:
        res.numberWorkers == "null" ? null : Number(res.numberWorkers),
      cremationPlatformId:
        res.cremationPlatformId == "null"
          ? null
          : Number(res.cremationPlatformId),
      sanitaryAshesDisposalId:
        res.sanitaryAshesDisposalId == "null"
          ? null
          : Number(res.sanitaryAshesDisposalId),
      numberCarcassHandlers:
        res.numberCarcassHandlers == "null"
          ? null
          : Number(res.numberCarcassHandlers),
      numberCarcassHandlersMedicalCert:
        res.numberCarcassHandlersMedicalCert == "null"
          ? null
          : Number(res.numberCarcassHandlersMedicalCert),
    };
    const response = await prisma.sanitaryPremisesInfoSection.create({
      data,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});

    const response = await prisma.sanitaryPremisesInfoSection.findMany({
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
