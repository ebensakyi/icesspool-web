import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const res = await request.json();

    



 // await logActivity("Toilet Availabilty Report generated",  userCookie.id);

 let report = await getToiletAvailability(res);
  
      return NextResponse.json(report);
    } catch (error: any) {
      console.log(error);
  
      return NextResponse.json(error);
    }
  }
  

  const getToiletAvailability = async (res:any) => {
    let filterBy = res?.filterBy;
      let filterValue = Number(res?.filterValue);
      let fromDate = new Date(res?.from);
      let toDate = new Date(res?.to);
  
    const resAvailCount = await prisma.residentialPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
  
        toiletAvailabilityId: 1,
      },
    });
    const resNotAvailCount = await prisma.residentialPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
  
    const eateryAvailCount = await prisma.eateryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const eateryNotAvailCount = await prisma.eateryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
  
    const healthAvailCount = await prisma.healthPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const healthNotAvailCount = await prisma.healthPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
  
    const hospAvailCount = await prisma.hospitalityPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const hospNotAvailCount = await prisma.hospitalityPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
  
  
    const industryAvailCount = await prisma.industryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const industryNotAvailCount = await prisma.industryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
    const institutionAvailCount = await prisma.institutionPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const institutionNotAvailCount = await prisma.institutionPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
    const marketAvailCount = await prisma.marketPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const marketNotAvailCount = await prisma.marketPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
    const sanitaryAvailCount = await prisma.sanitaryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 1,
      },
    });
    const sanitaryNotAvailCount = await prisma.sanitaryPremisesInfoSection.count({
      where: {
        Inspection: {
          [filterBy]: filterValue,
        },
        toiletAvailabilityId: 2,
      },
    });
    let report = [
      {
        name: "Residential Premises",
        available: resAvailCount,
        notAvailable: resNotAvailCount,
      },
      {
        name: "Eating & Drinking Premises",
        available: eateryAvailCount,
        notAvailable: eateryNotAvailCount,
      },
      {
        name: "Health Premises",
        available: healthAvailCount,
        notAvailable: healthNotAvailCount,
      },
      {
        name: "Hospitality Premises",
        available: hospAvailCount,
        notAvailable: hospNotAvailCount,
      },
      {
        name: "Industry Premises",
        available: industryAvailCount,
        notAvailable: industryNotAvailCount,
      },  {
        name: "Institution Premises",
        available: institutionAvailCount,
        notAvailable: institutionNotAvailCount,
      },  {
        name: "Sanitary Premises",
        available: sanitaryAvailCount,
        notAvailable: sanitaryNotAvailCount,
      },  {
        name: "Markets & Lorry Parks Premises",
        available: marketAvailCount,
        notAvailable: marketNotAvailCount,
      },
    ];
  
    return report
   
  };