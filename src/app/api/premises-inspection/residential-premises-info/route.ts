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
      drainsAvailabilityId:
        res.drainsAvailabilityId == "null"
          ? null
          : Number(res.drainsAvailabilityId),
      toiletAvailabilityId:
        res.toiletAvailabilityId == "null"
          ? ""
          : Number(res.toiletAvailabilityId),

      bathroomAvailabilityId:
        res.bathroomAvailabilityId == "null"
          ? null
          : Number(res.bathroomAvailabilityId),
      approvedHandwashingFacilityAvailabilityId:
        res.approvedHandwashingFacilityAvailabilityId == "null"
          ? null
          : Number(res.approvedHandwashingFacilityAvailabilityId),
      householdNumber: Number(res.householdNumber),
      maleOccupantNumber:
        res.maleOccupantNumber == "null"
          ? null
          : Number(res.maleOccupantNumber),
      femaleOccupantNumber:
        res.femaleOccupantNumber == "null"
          ? null
          : Number(res.femaleOccupantNumber),

      animalNumber:
        res.animalNumber == "null" ? null : Number(res.animalNumber),

      animalAvailabilityId:
        res.animalAvailabilityId == "null"
          ? null
          : Number(res.animalAvailabilityId),

      otherAnimal: res.otherAnimal,
      animalSpaceConditionId:
        res.animalSpaceConditionId == "null"
          ? null
          : Number(res.animalSpaceConditionId),

      vaccinationProofId:
        res.vaccinationProofId == "null"
          ? null
          : Number(res.vaccinationProofId),
    };

    const response = await prisma.residentialPremisesInfoSection.create({
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

    const response = await prisma.residentialPremisesInfoSection.findMany({
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
