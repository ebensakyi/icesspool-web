import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    const session :any= await getServerSession(authOptions);

    // console.log("Session ", session);
    let userId = session?.user?.id;
    let surname = session?.user?.surname;

    let { searchParams } = new URL(request.url);
    let inspectionId: any = searchParams.get("id")?.toString();
    // let published: string | undefined = searchParams
    //   .get("published")
    //   ?.toString();

    // let inspectionFormId: string | undefined = searchParams
    //   .get("inspectionFormId")
    //   ?.toString();
    await logActivity(`Visited data edit page for ${inspectionId}`, userId);

    const data = await prisma.inspection.findFirst({
      where: {
        // deleted: 0,

        id: inspectionId,
      },

      include: {
        User: true,
        ElectoralArea: true,

        BasicInfoSection: {
          include: {
            Community: { include: { District: { include: { Region: true } } } },
            RespondentDesignation: true,
          },
        },

        LicencePermitSection: {
          include: {
            animalsPermitAvailability: true,
            buildingPermitAvailability: true,

            businessLicenceAvailability: true,
            fumigationCertificateAvailability: true,
            habitationCertificateAvailability: true,
            operatingLicenceAvailability: true,
            propertyRateAvailability: true,
            structurePermitAvailability: true,
            gtaOperatingLicenceAvailability: true,
            waterAnalysisReport: true,
            regGeneralCertAvailability: true,
            suitabilityCertificateAvailability: true,
            pharmacyCertAvailability: true,
          },
        },
        ResidentialPremisesInfoSection: {
          include: {
            PremisesAnimal: {
              include: {
                AnimalType: true,
              },
            },
            animalAvailability: true,
            toiletAvailability: true,
            vaccinationProof: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,
            animalSpaceCondition: true,
          },
        },
        EateryPremisesInfoSection: {
          include: {
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            eateryPremisesSubType: true,
            eateryPremisesType: true,
            firstAidAvailability: true,
            kitchenAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,
            physicalStructureType: true,
            cookedFoodStorageCondtionSafe: true,
            uncookedFoodStorageCondtionSafe: true,
            disinfestation: true,
            disinfestationFrequency: true,
            disinfection: true,
            disinfectionFrequency: true,
            protectiveClothingUsed: true,
          },
        },
        HealthPremisesInfoSection: {
          include: {
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,

            /////////
            ehoAvailability: true,
            incineratorAvailability: true,
            placentaPitAvailability: true,
            healthPremisesType: true,
            separateWard: true,
            ownershipType: true,
            embalmingAreaCondition: true,
            embalmingAreaAvailability: true,
            bodyTraysAdequate: true,
            coldRoomAvailability: true,
            coldRoomCondition: true,
          },
        },
        HospitalityPremisesInfoSection: {
          include: {
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,
            hospitalityPremisesType: true,
            physicalStructureType: true,
            cookedFoodStorageCondtionSafe: true,
            uncookedFoodStorageCondtionSafe: true,
            ////////
            designatedSmokingArea: true,
            protectiveClothingUsed: true,
            firstAidAvailability: true,
            kitchenAvailability: true,
          },
        },

        IndustryPremisesInfoSection: {
          include: {
            byProductsStorageAreaCond: true,
            productionRoomCondition: true,
            staffChangingRoom: true,
            storeRoomAvailability: true,
            flyScreenNetAvailability: true,
            protectiveClothingUsed: true,
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,
            PremisesType: true,
            PremisesSubtype: true,
            physicalStructureType: true,
            firstAidAvailability: true,
          },
        },
        InstitutionPremisesInfoSection: {
          include: {
            ablutionSlabCondition: true,
            ablutionSlab: true,
            animalSpaceAvailability: true,
            animalSpaceCondition: true,
            cookedFoodStorageCondtionSafe: true,
            drainsAvailability: true,
            firstAidAvailability: true,
            foodVendorAvailability: true,
            PremisesSubtype: true,
            PremisesType: true,
            kitchenAvailability: true,
            physicalStructureType: true,
            shepClubExistence: true,
            slaughterAreaAvailability: true,
            slaughterAreaCondition: true,
            soundProof: true,
            uncookedFoodStorageCondtionSafe: true,
            urinalAvailability: true,
            toiletAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,
            protectiveClothingUsed: true,
          },
        },
        MarketPremisesInfoSection: {
          include: {
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,

            marketPremisesType: true,
            firstAidAvailability: true,
            ownershipType: true,

            derattingFrequency: true,
            cleanupFrequency: true,
            physicalStructureType: true,
            generalSanitaryCondition: true,
          },
        },
        SanitaryPremisesInfoSection: {
          include: {
            toiletAvailability: true,
            urinalAvailability: true,
            drainsAvailability: true,
            approvedHandwashingFacilityAvailability: true,
            bathroomAvailability: true,

            //////////////
            physicalStructureType: true,
            sanitaryPremisesType: true,
            staffChangingRoom: true,
            ownershipType: true,
            sanitaryFacilityMgt: true,
            disinfectionFrequency: true,
            disinfestationQuarterly: true,
            protectiveClothing: true,
            slaughterAreaAvailability: true,
            storeRoomAvailability: true,
            condemnationRoomAvailability: true,
            cloakRoomAvailability: true,
            comfortRoomAvailability: true,
            wheelbathAvailability: true,
            footbathAvailability: true,
            leachateMgt: true,
            safeHazardousWasteMgt: true,
            sextonManagement: true,
            sextonOffice: true,
            properLayout: true,
            cremationPracticed: true,
            workersOfficeAvailability: true,
            cremationPlatform: true,
            sanitaryAshesDisposal: true,
            siteFenced: true,
          },
        },
        WaterSection: {
          include: {
            WaterFlowFrequency: true,
            waterSourceCondition: true,
            waterStorageConditionSafe: true,
            safeDistanceWaterStorageSanitary: true,
            PremisesDrinkingWaterSources: {
              include: { DrinkingWaterSourceType: true },
            },
            PremisesWaterSources: {
              include: { WaterSourceType: true },
            },
            PremisesWaterStorage: {
              include: { WaterStorageType: true },
            },
            PremisesWaterSupply: {
              include: { WaterSupplyType: true },
            },
            PremisesWaterTreatmentType: {
              include: { WaterTreatmentType: true },
            },
          },
        },
        LiquidWasteSection: {
          include: {
            toiletAdequacy: true,
            analCleansingMaterialMgt: true,
            areaSewered: true,
            availToiletFaciltyMgt: true,
            bathroomAdequacy: true,
            containmentEmptied: true,
            DesiltingFrequency: true,
            PremisesDrainType: {
              include: {
                DrainType: true,
              },
            },
            drainsCondition: true,
            EaseYourselfWhere: true,
            PremisesEffluentManagement: {
              include: {
                EffluentManagement: true,
              },
            },
            PremisesExcretaDisposalMethod: {
              include: {
                ExcretaDisposalMethod: true,
              },
            },
            PremisesExcretaContainment: {
              include: {
                ExcretaContainment: true,
              },
            },
            PremisesGreyWaterDisposal: {
              include: {
                GreyWaterDisposal: true,
              },
            },
            PremisesToiletType: {
              include: {
                ToiletType: true,
              },
            },
            facilityConnectedSewer: true,
            bathroomCondition: true,
            separateStaffUrinal: true,
            sewerSystem: true,
            stagnationEvidence: true,
            toiletCondition: true,
            toiletDisabilityFriendly: true,
            toiletDischarge: true,
            toiletPitPosition: true,
          },
        },
        SolidWasteSection: {
          include: {
            wasteServiceProviderRegistration: true,
            wasteSortingAvailability: true,
            wasteCollectionFrequency: true,
            approvedWasteStorageReceptacle: true,
            adequateWasteStorageReceptacle: true,
            WasteCollectionType: true,
            UnservicedWasteDisposal: true,
            wastePaymentEvidence: true,
            ContainerVolume: true,
            wasteProviderAccreditted: true,
            PremisesHazardousWasteDisposal: {
              include: { HazardousWasteDisposalMethod: true },
            },

            PremisesWasteReceptacle: {
              include: { SolidWasteReceptacle: true },
            },
          },
        },
        ConclusionSection: {
          include: {
            obnoxiousTradeExist: true,
            PremisesNuisanceDetected: {
              include: { Nuisance: true },
            },
            PremisesActionTaken: {
              include: { Action: true },
            },
          },
        },

        InspectionPictures: {
          include: { FormSectionImage: true },
        },
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(">>>>>>> ", error);

    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session :any= await getServerSession(authOptions);

    // console.log("Session ", session);
    let userId = session?.user?.id;

    const res = await request.json();

    let inspectionId = res.id;

    let inspection = await prisma.inspection.findFirst({
      where: {
        id: inspectionId,
      },
    });
    let isPublished = inspection?.isPublished || 0;

    await prisma.inspection.update({
      data: {
        isPublished: Math.abs(isPublished - 1),
        publishedById: Number(userId),
      },
      where: {
        id: inspectionId,
      },
    });
    await logActivity(`Published inspection ${inspectionId}`, userId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}
export async function PUT(request: Request) {
  // try {
  const res = await request.json();


  let inspectionId = res.inspectionId;

  let liquidWasteSectionHistory: any;
  let waterSectionHistory: any;
  let solidWasteSectionHistory: any;
  let conclusionSectionHistory: any;
  let userId: any;

  //////////////////////////GET CURRENT DATA//////////////////////
  let inspectionCurrent = await prisma.inspection.findFirst({
    where: { id: inspectionId },
  });

  userId = inspectionCurrent?.userId;

  let basicInfoSectionCurrent = await prisma.basicInfoSection.findFirst({
    where: { inspectionId },
  });
  let licencePermitSectionCurrent = await prisma.licencePermitSection.findFirst(
    {
      where: { inspectionId },
    }
  );
  let liquidWasteSectionCurrent = await prisma.liquidWasteSection?.findFirst({
    where: { inspectionId },
  });
  let solidWasteSectionCurrent = await prisma.solidWasteSection.findFirst({
    where: { inspectionId },
  });
  let waterSectionCurrent = await prisma.waterSection.findFirst({
    where: { inspectionId },
  });
  let conclusionSectionCurrent = await prisma.conclusionSection.findFirst({
    where: { inspectionId },
  });

  let residentialPremisesInfoSectionCurrent =
    await prisma.residentialPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let healthPremisesInfoSectionCurrent =
    await prisma.healthPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let hospitalityPremisesInfoSectionCurrent =
    await prisma.hospitalityPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let sanitaryPremisesInfoSectionCurrent =
    await prisma.sanitaryPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let marketPremisesInfoSectionCurrent =
    await prisma.marketPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let institutionPremisesInfoSectionCurrent =
    await prisma.institutionPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let industryPremisesInfoSectionCurrent =
    await prisma.industryPremisesInfoSection.findFirst({
      where: { inspectionId },
    });
  let eateryPremisesInfoSectionCurrent =
    await prisma.eateryPremisesInfoSection.findFirst({
      where: { inspectionId },
    });

  let premisesExcretaContainmentCurrent =
    await prisma.premisesExcretaContainment.findMany({
      where: { inspectionId },
    });
  let premisesGreyWaterDisposalCurrent =
    await prisma.premisesGreyWaterDisposal.findMany({
      where: { inspectionId },
    });
  let premisesWasteReceptacleCurrent =
    await prisma.premisesWasteReceptacle.findMany({
      where: { inspectionId },
    });
  let premisesPestSignsCurrent = await prisma.premisesPestSigns.findMany({
    where: { inspectionId },
  });
  let premisesAnimalCurrent = await prisma.premisesAnimal.findMany({
    where: { inspectionId },
  });
  let premisesDrainTypeCurrent = await prisma.premisesDrainType.findMany({
    where: { inspectionId },
  });
  let premisesDrainBadConditionCurrent =
    await prisma.premisesDrainBadCondition.findMany({
      where: { inspectionId },
    });
  let premisesHazardousWasteDisposalCurrent =
    await prisma.premisesHazardousWasteDisposal.findMany({
      where: { inspectionId },
    });
  let premisesActionTakenCurrent = await prisma.premisesActionTaken.findMany({
    where: { inspectionId },
  });

  let premisesNuisanceDetectedCurrent =
    await prisma.premisesNuisanceDetected.findMany({
      where: { inspectionId },
    });

  /////////////////CREATE HISTORY OF CURRENT DATA///////////////////

  let inspectionHistory = await prisma.inspectionHistory.create({
    data: inspectionCurrent,
  } as any);

  let historyId: any = inspectionHistory.historyId;

  //////SPREAD HISTORY ID
  licencePermitSectionCurrent =
    licencePermitSectionCurrent != null
      ? ({ ...licencePermitSectionCurrent, historyId } as any)
      : null;

  liquidWasteSectionCurrent =
    liquidWasteSectionCurrent != null
      ? ({ ...liquidWasteSectionCurrent, historyId } as any)
      : null;
  solidWasteSectionCurrent =
    solidWasteSectionCurrent != null
      ? ({ ...solidWasteSectionCurrent, historyId } as any)
      : null;
  basicInfoSectionCurrent =
    basicInfoSectionCurrent != null
      ? ({ ...basicInfoSectionCurrent, historyId } as any)
      : null;
  waterSectionCurrent =
    waterSectionCurrent != null
      ? ({ ...waterSectionCurrent, historyId } as any)
      : null;
  conclusionSectionCurrent =
    conclusionSectionCurrent != null
      ? ({ ...conclusionSectionCurrent, historyId } as any)
      : null;

  residentialPremisesInfoSectionCurrent =
    residentialPremisesInfoSectionCurrent != null
      ? ({
          ...residentialPremisesInfoSectionCurrent,
          historyId,
        } as any)
      : null;
  eateryPremisesInfoSectionCurrent =
    eateryPremisesInfoSectionCurrent != null
      ? ({ ...eateryPremisesInfoSectionCurrent, historyId } as any)
      : null;
  healthPremisesInfoSectionCurrent =
    healthPremisesInfoSectionCurrent != null
      ? ({ ...healthPremisesInfoSectionCurrent, historyId } as any)
      : null;
  hospitalityPremisesInfoSectionCurrent =
    hospitalityPremisesInfoSectionCurrent != null
      ? ({
          ...hospitalityPremisesInfoSectionCurrent,
          historyId,
        } as any)
      : null;
  sanitaryPremisesInfoSectionCurrent =
    sanitaryPremisesInfoSectionCurrent != null
      ? ({ ...sanitaryPremisesInfoSectionCurrent, historyId } as any)
      : null;
  marketPremisesInfoSectionCurrent =
    marketPremisesInfoSectionCurrent != null
      ? ({ ...marketPremisesInfoSectionCurrent, historyId } as any)
      : null;
  institutionPremisesInfoSectionCurrent =
    institutionPremisesInfoSectionCurrent != null
      ? ({
          ...institutionPremisesInfoSectionCurrent,
          historyId,
        } as any)
      : null;
  industryPremisesInfoSectionCurrent =
    industryPremisesInfoSectionCurrent != null
      ? ({ ...industryPremisesInfoSectionCurrent, historyId } as any)
      : null;

  premisesExcretaContainmentCurrent = premisesExcretaContainmentCurrent?.map(
    (d) => {
      return { ...d, historyId };
    }
  );
  premisesGreyWaterDisposalCurrent = premisesGreyWaterDisposalCurrent?.map(
    (d) => {
      return { ...d, historyId };
    }
  );
  premisesWasteReceptacleCurrent = premisesWasteReceptacleCurrent?.map((d) => {
    return { ...d, historyId };
  });
  premisesPestSignsCurrent = premisesPestSignsCurrent?.map((d) => {
    return { ...d, historyId };
  });
  premisesAnimalCurrent = premisesAnimalCurrent?.map((d) => {
    return { ...d, historyId };
  });
  premisesDrainTypeCurrent = premisesDrainTypeCurrent?.map((d) => {
    return { ...d, historyId };
  });

  premisesHazardousWasteDisposalCurrent =
    premisesHazardousWasteDisposalCurrent?.map((d) => {
      return { ...d, historyId };
    });
  premisesActionTakenCurrent = premisesActionTakenCurrent?.map((d) => {
    return { ...d, historyId };
  });

  premisesNuisanceDetectedCurrent = premisesNuisanceDetectedCurrent?.map(
    (d) => {
      return { ...d, historyId };
    }
  );

  ///////////////////////SAVE HISTORY

  if (basicInfoSectionCurrent != null) {
    await prisma.basicInfoSectionHistory.create({
      data: basicInfoSectionCurrent,
    } as any);
  }
  if (licencePermitSectionCurrent != null) {
    await prisma.licencePermitSectionHistory.create({
      data: licencePermitSectionCurrent,
    } as any);
  }
  if (liquidWasteSectionCurrent != null) {
    liquidWasteSectionHistory = await prisma.liquidWasteSectionHistory.create({
      data: liquidWasteSectionCurrent,
    } as any);
  }
  if (solidWasteSectionCurrent != null) {
    solidWasteSectionHistory = await prisma.solidWasteSectionHistory.create({
      data: solidWasteSectionCurrent,
    } as any);
  }
  if (waterSectionCurrent != null) {
    waterSectionHistory = await prisma.waterSectionHistory.create({
      data: waterSectionCurrent,
    } as any);
  }

  if (conclusionSectionCurrent != null) {
    conclusionSectionHistory = await prisma.conclusionSectionHistory.create({
      data: conclusionSectionCurrent,
    } as any);
  }
  if (residentialPremisesInfoSectionCurrent != null) {
    await prisma.residentialPremisesInfoSectionHistory.create({
      data: residentialPremisesInfoSectionCurrent,
    } as any);
  }
  if (eateryPremisesInfoSectionCurrent != null) {
    await prisma.eateryPremisesInfoSectionHistory.create({
      data: eateryPremisesInfoSectionCurrent,
    } as any);
  }
  if (healthPremisesInfoSectionCurrent != null) {
    await prisma.healthPremisesInfoSectionHistory.create({
      data: healthPremisesInfoSectionCurrent,
    } as any);
  }
  if (hospitalityPremisesInfoSectionCurrent != null) {
    await prisma.hospitalityPremisesInfoSectionHistory.create({
      data: hospitalityPremisesInfoSectionCurrent,
    } as any);
  }
  if (sanitaryPremisesInfoSectionCurrent != null) {
    await prisma.sanitaryPremisesInfoSectionHistory.create({
      data: sanitaryPremisesInfoSectionCurrent,
    } as any);
  }
  if (marketPremisesInfoSectionCurrent != null) {
    await prisma.marketPremisesInfoSectionHistory.create({
      data: marketPremisesInfoSectionCurrent,
    } as any);
  }
  if (institutionPremisesInfoSectionCurrent != null) {
    await prisma.institutionPremisesInfoSectionHistory.create({
      data: institutionPremisesInfoSectionCurrent,
    } as any);
  }
  if (industryPremisesInfoSectionCurrent != null) {
    await prisma.industryPremisesInfoSectionHistory.create({
      data: industryPremisesInfoSectionCurrent,
    } as any);
  }

  await prisma.premisesExcretaContainmentHistory.createMany({
    data: premisesExcretaContainmentCurrent,
  } as any);

  await prisma.premisesGreyWaterDisposalHistory.createMany({
    data: premisesGreyWaterDisposalCurrent,
  } as any);
  await prisma.premisesWasteReceptacleHistory.createMany({
    data: premisesWasteReceptacleCurrent,
  } as any);
  await prisma.premisesPestSignsHistory.createMany({
    data: premisesPestSignsCurrent,
  } as any);
  await prisma.premisesAnimalHistory.createMany({
    data: premisesAnimalCurrent,
  } as any);
  await prisma.premisesDrainTypeHistory.createMany({
    data: premisesDrainTypeCurrent,
  } as any);
  await prisma.premisesDrainBadConditionHistory.createMany({
    data: premisesDrainBadConditionCurrent,
  } as any);
  await prisma.premisesHazardousWasteDisposalHistory.createMany({
    data: premisesHazardousWasteDisposalCurrent,
  } as any);
  await prisma.premisesActionTakenHistory.createMany({
    data: premisesActionTakenCurrent,
  } as any);
  await prisma.premisesNuisanceDetectedHistory.createMany({
    data: premisesNuisanceDetectedCurrent,
  } as any);

  //////////////////////////PREPARE DATA FOR DATA UPDATE

  let newBasicInfoSection = {
    latitude: Number(res?.basicInfoSection.latitude),
    longitude: Number(res?.basicInfoSection.longitude),
    accuracy: res?.basicInfoSection.accuracy,
    respondentName: res?.basicInfoSection.respondentName,
    respondentPhoneNumber: res?.basicInfoSection.respondentPhoneNumber,
    // respondentDesignationId: Number(res?.respondentDesignationId),
  };

  let newLicencePermitSection = {
    animalsPermitAvailabilityId:
      res?.licencePermitSection.animalsPermitAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.animalsPermitAvailability),
    propertyRateAvailabilityId:
      res?.licencePermitSection.propertyRateAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.propertyRateAvailability),
    buildingPermitAvailabilityId:
      res?.licencePermitSection.buildingPermitAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.buildingPermitAvailability),
    businessLicenceAvailabilityId:
      res?.licencePermitSection.businessLicenceAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.businessLicenceAvailability),
    habitationCertificateAvailabilityId:
      res?.licencePermitSection.habitationCertificateAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.habitationCertificateAvailability),
    operatingLicenceAvailabilityId:
      res?.licencePermitSection.operatingLicenceAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.operatingLicenceAvailability),
    structurePermitAvailabilityId:
      res?.licencePermitSection.structurePermitAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.structurePermitAvailability),
    fumigationCertificateAvailabilityId:
      res?.licencePermitSection.fumigationCertificateAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.fumigationCertificateAvailability),

    gtaOperatingLicenceAvailabilityId:
      res?.licencePermitSection.gtaOperatingLicenceAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.gtaOperatingLicenceAvailability),
    suitabilityCertificateAvailabilityId:
      res?.licencePermitSection.suitabilityCertificateAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.suitabilityCertificateAvailability),
    waterAnalysisReportId:
      res?.licencePermitSection.waterAnalysisReport == undefined
        ? null
        : Number(res?.licencePermitSection.waterAnalysisReport),
    regGeneralCertAvailabilityId:
      res?.licencePermitSection.regGeneralCertAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.regGeneralCertAvailability),
    pharmacyCertAvailabilityId:
      res?.licencePermitSection.pharmacyCertAvailability == undefined
        ? null
        : Number(res?.licencePermitSection.pharmacyCertAvailability),
  };

  // waterSupply: selectedWaterSupply?.map((x) => x.value),
  // waterSource: selectedWaterSource?.map((x) => x.value),
  // waterStorage: selectedWaterStorage?.map((x) => x.value),
  // waterTreatment: selectedWaterTreatment?.map((x) => x.value),
  // drinkingWaterSource: selectedDrinkingWaterSource?.map((x) => x.value),

  let newWaterSection = {
    waterStorageConditionId:
      res?.waterSection.waterStorageCondition == undefined
        ? null
        : Number(res?.waterSection.waterStorageCondition),
    waterFlowFrequencyId:
      res?.waterSection.waterFlowFrequency == undefined
        ? null
        : Number(res?.waterSection.waterFlowFrequency),
    waterSourceConditionId:
      res?.waterSection.waterSourceCondition == undefined
        ? null
        : Number(res?.waterSection.waterSourceCondition),
    //   safeDistanceWaterStorageSanitaryId:
    // res?.waterSection.safeDistanceWaterStorageSanitaryId ==undefined
    //   ? null
    //   : Number(res?.safeDistanceWaterStorageSanitaryId),
    // rating: res?.rating == undefined ? null : Number(res?.rating),
  };

  let newSolidWasteSection = {
    wasteServiceProviderRegistrationId:
      res?.solidWasteSection.wasteServiceProviderRegistration == undefined
        ? null
        : Number(res?.solidWasteSection.wasteServiceProviderRegistration),
    wasteCollectorName:
      res?.solidWasteSection.wasteCollectorName == undefined
        ? null
        : res?.solidWasteSection.wasteCollectorName,
    wasteSortingAvailabilityId:
      res?.solidWasteSection.wasteSortingAvailability == undefined
        ? null
        : Number(res?.solidWasteSection.wasteSortingAvailability),
    wasteCollectionFrequencyId:
      res?.solidWasteSection.wasteCollectionFrequency == undefined
        ? null
        : Number(res?.solidWasteSection.wasteCollectionFrequency),
    approvedWasteStorageReceptacleId:
      res?.solidWasteSection.approvedWasteStorageReceptacle == undefined
        ? null
        : Number(res?.solidWasteSection.approvedWasteStorageReceptacle),
    adequateWasteStorageReceptacleId:
      res?.solidWasteSection.adequateWasteStorageReceptacle == undefined
        ? null
        : Number(res?.solidWasteSection.adequateWasteStorageReceptacle),
    wasteCollectionTypeId:
      res?.solidWasteSection.wasteCollectionType == undefined
        ? null
        : Number(res?.solidWasteSection.wasteCollectionType),
    unservicedWasteDisposalId:
      res?.solidWasteSection.unservicedWasteDisposal == undefined
        ? null
        : Number(res?.solidWasteSection.unservicedWasteDisposal),
    wastePaymentEvidenceId:
      res?.solidWasteSection.wastePaymentEvidence == undefined
        ? null
        : Number(res?.solidWasteSection.wastePaymentEvidence),
    wasteContainerVolumeId:
      res?.solidWasteSection.containerVolume == undefined
        ? null
        : Number(res?.solidWasteSection.containerVolume),
    wasteProviderAccredittedId:
      res?.solidWasteSection.wasteProviderAccreditted == undefined
        ? null
        : Number(res?.solidWasteSection.wasteProviderAccreditted),
    containerNumber:
      res?.solidWasteSection.containerNumber == undefined
        ? null
        : Number(res?.solidWasteSection.containerNumber),
    wasteServicePhoneNumber: res?.solidWasteSection.wasteServicePhoneNumber,
  };

  let newLiquidWasteSection = {
    numberToiletSeats:
      res?.liquidWasteSection?.numberToiletSeats == undefined
        ? null
        : Number(res?.liquidWasteSection?.body?.numberToiletSeats),
    toiletConditionId:
      res?.liquidWasteSection?.toiletCondition == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletCondition),

    toiletDischargeId:
      res?.liquidWasteSection?.toiletDischarge == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletDischarge),
    numberUrinalCubicle:
      res?.liquidWasteSection?.numberUrinalSeats == undefined
        ? null
        : Number(res?.liquidWasteSection?.numberUrinalSeats),
    bathroomAdequacyId:
      res?.liquidWasteSection?.bathroomAdequacy == undefined
        ? null
        : Number(res?.liquidWasteSection?.bathroomAdequacy),

    stagnationEvidenceId:
      res?.liquidWasteSection?.stagnationEvidence == undefined
        ? null
        : Number(res?.liquidWasteSection?.stagnationEvidence),

    containmentEmptiedId:
      res?.liquidWasteSection?.containmentEmptied == undefined
        ? null
        : Number(res?.liquidWasteSection?.containmentEmptied),
    sewerSystemId:
      res?.liquidWasteSection?.sewerSystem == undefined
        ? null
        : Number(res?.liquidWasteSection?.sewerSystem),

    // urinalCubicleConditionId:
    //   res?.urinalCubicleConditionId == undefined
    //     ? null
    //     : Number(res?.urinalCubicleConditionId),
    toiletAdequacyId:
      res?.liquidWasteSection?.toiletAdequacy == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletAdequacy),
    urinalAdequacyId:
      res?.liquidWasteSection?.urinalAdequacy == undefined
        ? null
        : Number(res?.liquidWasteSection?.urinalAdequacy),
    urinalGenderSensivityId:
      res?.liquidWasteSection?.urinalGenderSensivity == undefined
        ? null
        : Number(res?.liquidWasteSection?.urinalGenderSensivity),

    effluentManagementReportId:
      res?.liquidWasteSection?.effluentManagementReport == undefined
        ? null
        : Number(res?.liquidWasteSection?.effluentManagementReport),

    toiletGenderSensivityId:
      res?.liquidWasteSection?.toiletGenderSensivity == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletGenderSensivity),
    toiletDisabilityFriendlyId:
      res?.liquidWasteSection?.toiletDisabilityFriendly == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletDisabilityFriendly),
    urinalDisabilityFriendlyId:
      res?.liquidWasteSection?.urinalDisabilityFriendly == undefined
        ? null
        : Number(res?.liquidWasteSection?.urinalDisabilityFriendly),

    toiletPitPositionId:
      res?.liquidWasteSection?.toiletPitPosition == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletPitPosition),

    wasteWaterContainmentId:
      res?.liquidWasteSection?.wasteWaterContainment == undefined
        ? null
        : Number(res?.liquidWasteSection?.wasteWaterContainment),
    easeYourselfWhereId:
      res?.liquidWasteSection?.easeYourselfWhere == undefined
        ? null
        : Number(res?.liquidWasteSection?.easeYourselfWhere),
    areaSeweredId:
      res?.liquidWasteSection?.areaSewered == undefined
        ? null
        : Number(res?.liquidWasteSection?.areaSewered),
    facilityConnectedSewerId:
      res?.liquidWasteSection?.facilityConnectedSewer == undefined
        ? null
        : Number(res?.liquidWasteSection?.facilityConnectedSewer),

    bathroomConditionId:
      res?.liquidWasteSection?.bathroomCondition == undefined
        ? null
        : Number(res?.liquidWasteSection?.bathroomCondition),

    drainsConditionId:
      res?.liquidWasteSection?.drainsCondition == undefined
        ? null
        : Number(res?.liquidWasteSection?.drainsCondition),
    desiltingFrequencyId:
      res?.liquidWasteSection?.desiltingFrequency == undefined
        ? null
        : Number(res?.liquidWasteSection?.desiltingFrequency),

    // rating: res?.rating == undefined ? null : Number(res?.rating),
    toiletHouseholdNumberId:
      res?.liquidWasteSection?.toiletHouseholdNumber == undefined
        ? null
        : Number(res?.liquidWasteSection?.toiletHouseholdNumber),

    separateStaffUrinalId:
      res?.liquidWasteSection?.separateStaffUrinal == undefined
        ? null
        : Number(res?.liquidWasteSection?.separateStaffUrinal),

    availToiletFaciltyMgtId:
      res?.liquidWasteSection?.availToiletFaciltyMgt == undefined
        ? null
        : Number(res?.liquidWasteSection?.availToiletFaciltyMgt),

    analCleansingMaterialMgtId:
      res?.liquidWasteSection?.analCleansingMaterialMgt == undefined
        ? null
        : Number(res?.analCleansingMaterialMgt),

    numberUrinalSeats:
      res?.liquidWasteSection?.numberUrinalSeats == undefined
        ? null
        : Number(res?.liquidWasteSection?.numberUrinalSeats),

    numberBathroomCubicle:
      res?.liquidWasteSection?.numberBathroomCubicle == undefined
        ? null
        : Number(res?.liquidWasteSection?.numberBathroomCubicle),
  };

  let newConclusionSection = {
    officerComment:
      res?.conclusionSection.officerComment == undefined
        ? null
        : res?.conclusionSection.officerComment,

    obnoxiousTradeExistId:
      res?.conclusionSection.obnoxiousTradeExist == undefined
        ? null
        : Number(res?.conclusionSection.obnoxiousTradeExist),

    obnoxiousTrade: res?.conclusionSection.obnoxiousTrade,
  };
  /////////////////////////UPDATE DATA/////////////

  ////delete
  await prisma.premisesToiletType.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesToiletType = res?.liquidWasteSection?.toiletType?.map(
    (d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        toiletTypeId: d,
        liquidWasteSectionId: liquidWasteSectionHistory.id,
      };
    }
  );
  
  ///create new
  await prisma.premisesToiletType.createMany({
    data: newPremisesToiletType,
  } as any);



  ////delete
  await prisma.premisesDrainType.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesDrainType = res?.liquidWasteSection?.drainType?.map(
    (d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        drainTypeId: d,
        liquidWasteSectionId: liquidWasteSectionHistory.id,
      };
    }
  );

  ///create new
  await prisma.premisesDrainType.createMany({
    data: newPremisesDrainType,
  } as any);

  ////delete
  await prisma.premisesExcretaContainment.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesExcretaContainment =
    res?.liquidWasteSection?.excretaContainment?.map((d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        excretaContainmentId: d,
        liquidWasteSectionId: liquidWasteSectionHistory.id,
      };
    });

  ///create new
  await prisma.premisesExcretaContainment.createMany({
    data: newPremisesExcretaContainment,
  } as any);

  ////delete
  await prisma.premisesGreyWaterDisposal.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesGreyWaterDisposal =
    res?.liquidWasteSection?.greyWaterDisposal?.map((d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        greyWaterDisposalId: d,
        liquidWasteSectionId: liquidWasteSectionHistory.id,
      };
    });
  ///create new
  await prisma.premisesGreyWaterDisposal.createMany({
    data: newPremisesGreyWaterDisposal,
  } as any);

  ////delete
  await prisma.premisesWasteReceptacle.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesWasteReceptacle = res?.solidWasteSection?.wasteReceptacle?.map(
    (d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        solidWasteReceptacleId: d,
        solidWasteSectionId: solidWasteSectionHistory.id,
      };
    }
  );
  ///create new
  await prisma.premisesWasteReceptacle.createMany({
    data: newPremisesWasteReceptacle,
  } as any);

  // ////delete
  // await prisma.premisesDrainBadCondition.deleteMany({
  //   where: {
  //     inspectionId,
  //   },
  // } as any);

  // ////process data
  // let newPremisesDrainBadCondition =
  //   res?.liquidWasteSection?.wasteReceptacle?.map((d: any) => {
  //     return {
  //       inspectionId,
  //       solidWasteReceptacleId: d,
  //       liquidWasteSectionId: liquidWasteSectionHistory.id,
  //     };
  //   });
  // ///create new
  // await prisma.premisesDrainBadCondition.createMany({
  //   data: newPremisesDrainBadCondition,
  // } as any);


  ////delete
  await prisma.premisesActionTaken.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesActionTaken = res?.conclusionSection?.action?.map((d: any) => {
    return {
      id: uuidv4(),
      userId: userId,
      inspectionId,
      actionId: d,
      conclusionSectionId: conclusionSectionHistory.id,
    };
  });

  // ///create new
  await prisma.premisesActionTaken.createMany({
    data: newPremisesActionTaken,
  } as any);




  ////delete
  await prisma.premisesNuisanceDetected.deleteMany({
    where: {
      inspectionId,
    },
  } as any);

  ////process data
  let newPremisesNuisanceDetected = res?.conclusionSection?.nuisanceDetected?.map(
    (d: any) => {
      return {
        id: uuidv4(),
        userId: userId,
        inspectionId,
        nuisanceId: d,
        conclusionSectionId: conclusionSectionHistory.id,
      };
    }
  );

  // ///create new
  await prisma.premisesNuisanceDetected.createMany({
    data: newPremisesNuisanceDetected,
  } as any);

  // await prisma.premisesAnimal.createMany({ data: premisesAnimal } as any);

  // await prisma.premisesHazardousWasteDisposal.createMany({
  //   data: premisesHazardousWasteDisposal,
  // } as any);

  await prisma.basicInfoSection.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newBasicInfoSection,
  });

  await prisma.licencePermitSection.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newLicencePermitSection,
  });

  await prisma.waterSection.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newWaterSection,
  });

  await prisma.solidWasteSection.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newSolidWasteSection,
  });

  await prisma.liquidWasteSection?.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newLiquidWasteSection,
  });

  await prisma.conclusionSection.update({
    where: {
      inspectionId: inspectionId,
    },
    data: newConclusionSection,
  });

  return NextResponse.json(null, { status: 200 });
  // } catch (error) {
  //   console.log(error);

  //   return NextResponse.json(error, { status: 500 });
  // }
}
export async function DELETE(request: Request) {
  // try {
  //   const res = await request.json();
  //   let inspectionId = res.id;
  //   // let { searchParams } = new URL(request.url);
  //   // let inspectionId: any = searchParams.get("id")?.toString();
  //   // console.log("inp=======>",searchParams);
  //   const session :any= await getServerSession(authOptions);
  //   // console.log("Session ", session);
  //   let userId = session?.user?.id;
  //   let surname = session?.user?.surname;
  //   let districtId = session?.user?.districtId;
  //   let regionId = session?.user?.regionId;
  //   let userLevel = session?.user?.userLevelId;
  //   await prisma.inspection.update({
  //     data: {
  //       deleted: 1,
  //     },
  //     where: {
  //       id:inspectionId,
  //     },
  //   });
  //   return NextResponse.json(null, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json(error, { status: 500 });
  // }
}
