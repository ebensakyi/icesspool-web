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
        animalsPermitAvailabilityId:
          res.animalsPermitAvailabilityId == "null"
            ? null
            : Number(res.animalsPermitAvailabilityId),
        propertyRateAvailabilityId:
          res.propertyRateAvailabilityId == "null"
            ? null
            : Number(res.propertyRateAvailabilityId),
        buildingPermitAvailabilityId:
          res.buildingPermitAvailabilityId == "null"
            ? null
            : Number(res.buildingPermitAvailabilityId),
        businessLicenceAvailabilityId:
          res.businessLicenceAvailabilityId == "null"
            ? null
            : Number(res.businessLicenceAvailabilityId),
        habitationCertificateAvailabilityId:
          res.habitationCertificateAvailabilityId == "null"
            ? null
            : Number(res.habitationCertificateAvailabilityId),
        operatingLicenceAvailabilityId:
          res.operatingLicenceAvailabilityId == "null"
            ? null
            : Number(res.operatingLicenceAvailabilityId),
        structurePermitAvailabilityId:
          res.structurePermitAvailabilityId == "null"
            ? null
            : Number(res.structurePermitAvailabilityId),
        fumigationCertificateAvailabilityId:
          res.fumigationCertificateAvailabilityId == "null"
            ? null
            : Number(res.fumigationCertificateAvailabilityId),
       
        gtaOperatingLicenceAvailabilityId:
          res.gtaOperatingLicenceAvailabilityId == "null"
            ? null
            : Number(res.gtaOperatingLicenceAvailabilityId),
        suitabilityCertificateAvailabilityId:
          res.suitabilityCertificateAvailabilityId == "null"
            ? null
            : Number(res.suitabilityCertificateAvailabilityId),
        waterAnalysisReportId:
          res.waterAnalysisReportId == "null"
            ? null
            : Number(res.waterAnalysisReportId),
        regGeneralCertAvailabilityId:
          res.regGeneralCertAvailabilityId == "null"
            ? null
            : Number(res.regGeneralCertAvailabilityId),
        pharmacyCertAvailabilityId:
          res.pharmacyCertAvailabilityId == "null"
            ? null
            : Number(res.pharmacyCertAvailabilityId),
      };

      

      const response = await prisma.licencePermitSection.create({ data });


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

    const response = await prisma.licencePermitSection.findMany({
      where: { userId: userId, deleted: 0 },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
