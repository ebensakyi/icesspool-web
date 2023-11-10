import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    const data = {
      id: res.id,

      inspectionId: res.inspectionId,
      userId: Number(res.userId),
      numberToiletSeats:
        res.numberToiletSeats == "null" ? null : Number(res.numberToiletSeats),
      numberUrinalCubicle:
        res.numberUrinalCubicle == "null"
          ? null
          : Number(res.numberUrinalCubicle),
      urinalCubicleConditionId:
        res.urinalCubicleConditionId == "null"
          ? null
          : Number(res.urinalCubicleConditionId),
      toiletAdequacyId:
        res.toiletAdequacyId == "null" ? null : Number(res.toiletAdequacyId),
      urinalAdequacyId:
        res.urinalAdequacyId == "null" ? null : Number(res.urinalAdequacyId),
      urinalGenderSensivityId:
        res.urinalGenderSensivityId == "null"
          ? null
          : Number(res.urinalGenderSensivityId),
      effluentManagementReportId:
        res.effluentManagementReportId == "null"
          ? null
          : Number(res.effluentManagementReportId),

      toiletConditionId:
        res.toiletConditionId == "null" ? null : Number(res.toiletConditionId),
      toiletGenderSensivityId:
        res.toiletGenderSensivityId == "null"
          ? null
          : Number(res.toiletGenderSensivityId),
      toiletDisabilityFriendlyId:
        res.toiletDisabilityFriendlyId == "null"
          ? null
          : Number(res.toiletDisabilityFriendlyId),
      urinalDisabilityFriendlyId:
        res.urinalDisabilityFriendlyId == "null"
          ? null
          : Number(res.urinalDisabilityFriendlyId),
      toiletDischargeId:
        res.toiletDischargeId == "null" ? null : Number(res.toiletDischargeId),
      toiletPitPositionId:
        res.toiletPitPositionId == "null"
          ? null
          : Number(res.toiletPitPositionId),
      containmentEmptiedId:
        res.containmentEmptiedId == "null"
          ? null
          : Number(res.containmentEmptiedId),
      sewerSystemId:
        res.sewerSystemId == "null" ? null : Number(res.sewerSystemId),
      wasteWaterContainmentId:
        res.wasteWaterContainmentId == "null"
          ? null
          : Number(res.wasteWaterContainmentId),
      easeYourselfWhereId:
        res.easeYourselfWhereId == "null"
          ? null
          : Number(res.easeYourselfWhereId),
      areaSeweredId:
        res.areaSeweredId == "null" ? null : Number(res.areaSeweredId),
      facilityConnectedSewerId:
        res.facilityConnectedSewerId == "null"
          ? null
          : Number(res.facilityConnectedSewerId),
      bathroomAdequacyId:
        res.bathroomAdequacyId == "null"
          ? null
          : Number(res.bathroomAdequacyId),
      bathroomConditionId:
        res.bathroomConditionId == "null"
          ? null
          : Number(res.bathroomConditionId),

      drainsConditionId:
        res.drainsConditionId == "null" ? null : Number(res.drainsConditionId),
      desiltingFrequencyId:
        res.desiltingFrequencyId == "null"
          ? null
          : Number(res.desiltingFrequencyId),
      stagnationEvidenceId:
        res.stagnationEvidenceId == "null"
          ? null
          : Number(res.stagnationEvidenceId),
      rating: res.rating == "null" ? null : Number(Math.ceil(res.rating)),
      toiletHouseholdNumberId:
        res.toiletHouseholdNumberId == "null"
          ? null
          : Number(res.toiletHouseholdNumberId),

      separateStaffUrinalId:
        res.separateStaffUrinalId == "null"
          ? null
          : Number(res.separateStaffUrinalId),

      availToiletFaciltyMgtId:
        res.availToiletFaciltyMgtId == "null"
          ? null
          : Number(res.availToiletFaciltyMgtId),

      analCleansingMaterialMgtId:
        res.analCleansingMaterialMgtId == "null"
          ? null
          : Number(res.analCleansingMaterialMgtId),

      numberUrinalSeats:
        res.numberUrinalSeats == "null" ? null : Number(res.numberUrinalSeats),

      numberBathroomCubicle:
        res.numberBathroomCubicle == "null"
          ? null
          : Number(res.numberBathroomCubicle),
    };

    const response = await prisma.liquidWasteSection.create({ data });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(error,{ status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));


    if (!userId) return NextResponse.json({});

    const response = await prisma.liquidWasteSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error,{ status: 500 });
  }
}
