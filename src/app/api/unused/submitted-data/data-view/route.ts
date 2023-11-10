import { prisma } from "@/prisma/db";
import { logActivity } from "@/libs/log";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

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
        id:inspectionId
      },
    });
    await logActivity(`Published inspection ${inspectionId}`, userId);

    return NextResponse.json({ status: 200 });

  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: Request) {
  try {
    const res = await request.json();
    let inspectionId = res.id;


    // let { searchParams } = new URL(request.url);
    // let inspectionId: any = searchParams.get("id")?.toString();

    

    const session :any= await getServerSession(authOptions);

    let userId = session?.user?.id;
    let surname = session?.user?.surname;
    let districtId = session?.user?.districtId;
    let regionId = session?.user?.regionId;
    let userLevel = session?.user?.userLevelId;

    await prisma.inspection.update({
      data: {
        deleted: 1,
      },
      where: {
        id:inspectionId,
      },
    });

    return NextResponse.json(null, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

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
    await logActivity(`Visited dataview page for ${inspectionId}`, userId);

    

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
