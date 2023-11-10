import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const res = await request.json();
    

    const data = {
        id: res.id,
        inspectionId: res.inspectionId,
        userId: Number(res.userId),
        facilityName: res.facilityName,
        healthPremisesTypeId:
          res.healthPremisesTypeId == "null"
            ? null
            : Number(res.healthPremisesTypeId),
        separateWardId:
          res.separateWardId == "null"
            ? null
            : Number(res.separateWardId),
  
        toiletAvailabilityId:
          res.toiletAvailabilityId == "null"
            ? null
            : Number(res.toiletAvailabilityId),
        ownershipTypeId:
          res.ownershipTypeId == "null"
            ? null
            : Number(res.ownershipTypeId),
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
        ehoAvailabilityId:
          res.ehoAvailabilityId == "null"
            ? null
            : Number(res.ehoAvailabilityId),
        numberWards:
          res.numberWards == "null" ? null : Number(res.numberWards),
  
        numberBeds:
          res.numberBeds == "null" ? null : Number(res.numberBeds),
  
        placentaPitAvailabilityId:
          res.placentaPitAvailabilityId == "null"
            ? null
            : Number(res.placentaPitAvailabilityId),
  
        incineratorAvailabilityId:
          res.incineratorAvailabilityId == "null"
            ? null
            : Number(res.incineratorAvailabilityId),
  
        embalmingAreaConditionId:
          res.embalmingAreaConditionId == "null"
            ? null
            : Number(res.embalmingAreaConditionId),
        embalmingAreaAvailabilityId:
          res.embalmingAreaAvailabilityId == "null"
            ? null
            : Number(res.embalmingAreaAvailabilityId),
        bodyTraysAdequateId:
          res.bodyTraysAdequateId == "null"
            ? null
            : Number(res.bodyTraysAdequateId),
  
        coldRoomAvailabilityId:
          res.coldRoomAvailabilityId == "null"
            ? null
            : Number(res.coldRoomAvailabilityId),
  
        coldRoomConditionId:
          res.coldRoomConditionId == "null"
            ? null
            : Number(res.coldRoomConditionId),
      };
  
      const response = await prisma.healthPremisesInfoSection.create({
        data,
      });


    return new Response(
      JSON.stringify({
      response
      })
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ message: error.message }));
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = Number(searchParams.get('userId'))



    if (!userId) return NextResponse.json({});

    const response = await prisma.healthPremisesInfoSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return  NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error)
  }
}
