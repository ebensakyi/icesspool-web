export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import { logActivity } from "@/utils/log";

import { getServerSession } from "next-auth";
import AWS from "aws-sdk";
import fs from "fs";
import { authOptions } from "../../auth/[...nextauth]/options";
const XLSX = require("xlsx");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session: any = await getServerSession(authOptions);
    const selectedDistrict =
      searchParams.get("districtId") == null || ""
        ? undefined
        : Number(searchParams.get("districtId"));

    const searchText =
      searchParams.get("searchText")?.toString() == "undefined"
        ? ""
        : searchParams.get("searchText")?.toString();

    const formId =
      searchParams.get("formId")?.toString() == "undefined"
        ? undefined
        :  Number(searchParams.get("formId")?.toString());

    const published =
      searchParams.get("published")?.toString() == "undefined"
        ? undefined
        : Number(searchParams.get("published")?.toString());

    const fileName =
      searchParams.get("fileName")?.toString() == "undefined"
        ? ""
        : searchParams.get("fileName")?.toString();

    const userLevel = session?.user?.userLevelId;
    const userDistrict = session?.user?.districtId;
    const userRegion = session?.user?.regionId;

    console.log("published==> ", published);

    let query = {};
    let count = 0;

    if (userLevel == 1) {
      let response = await prisma.basicInfoSection.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    Inspection: {
                      premisesCode: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    Inspection: {
                      Region: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      District: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        surname: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        otherNames: {
                          contains: searchText,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                  {
                    Inspection: {
                      Community: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      ElectoralArea: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },

                  // {
                  //   Community: {
                  //     name: { contains: searchText, mode: "insensitive" },
                  //   },
                  // },
                ],

                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              }
            : {
                deleted: 0,
                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              },

        include: {
          RespondentDesignation: true,
          Inspection: {
            include: {
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
            },
          },
          Community: { include: { District: { include: { Region: true } } } },
          User: true,
        },
      } as any);

      let url = await export2Excel(response,fileName);

      return NextResponse.json(url);
    } else if (userLevel == 2) {
      let response = await prisma.basicInfoSection.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    Inspection: {
                      premisesCode: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    Inspection: {
                      Region: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      District: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        surname: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        otherNames: {
                          contains: searchText,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                  {
                    Inspection: {
                      Community: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      ElectoralArea: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },

                  // {
                  //   Community: {
                  //     name: { contains: searchText, mode: "insensitive" },
                  //   },
                  // },
                ],

                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              }
            : {
                deleted: 0,
                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              },

        include: {
          RespondentDesignation: true,
          Inspection: {
            include: {
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
            },
          },
          Community: { include: { District: { include: { Region: true } } } },
          User: true,
        },
      } as any);

      let url = await export2Excel(response,fileName);

      return NextResponse.json(url);
    } else if (userLevel == 3) {
      const response = await prisma.basicInfoSection.findMany({
        where:
          searchText != ""
            ? {
                OR: [
                  {
                    Inspection: {
                      premisesCode: {
                        contains: searchText,
                        mode: "insensitive",
                      },
                    },
                  },
                  {
                    Inspection: {
                      Region: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      District: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        surname: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      User: {
                        otherNames: {
                          contains: searchText,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                  {
                    Inspection: {
                      Community: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },
                  {
                    Inspection: {
                      ElectoralArea: {
                        name: { contains: searchText, mode: "insensitive" },
                      },
                    },
                  },

                  // {
                  //   Community: {
                  //     name: { contains: searchText, mode: "insensitive" },
                  //   },
                  // },
                ],

                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              }
            : {
                deleted: 0,
                Inspection: {
                  isPublished: published,
                  inspectionFormId: formId,
                },
              },

        include: {
          RespondentDesignation: true,
          Inspection: {
            include: {
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
            },
          },
          Community: { include: { District: { include: { Region: true } } } },
          User: true,
        },
      } as any);

      let url = await export2Excel(response,fileName);

      return NextResponse.json(url);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}

const export2Excel = async (data: any,fileName:any) => {
  try {
    let flatData = await flattenArray(data);

    const workSheet = XLSX.utils.json_to_sheet(flatData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
    let filePath = `./public/temp/${fileName}.xlsx`;
    XLSX.writeFile(workBook, filePath);

    let url = await uploadFile(`${fileName}.xlsx`);

    return url;
  } catch (error) {
    console.log("error NextResponse=> ", error);
  }
};

const flattenArray = async (data: any) => {
  let newData = [];

  for (let i = 0; i < data?.length; i++) {
    newData?.push({
      "Inspection Id": data[i]?.inspectionId,
      "Inspection Date": data[i]?.Inspection?.createdAt,

      "Inspection Officer": `${data[i]?.User?.surname} ${data[i]?.User?.otherNames}`,
      "Premises Code": data[i]?.Inspection?.premisesCode,
      "Premises Rating": data[i]?.Inspection?.totalRating,
      Region: data[i]?.Community?.District?.Region?.name,
      District: data[i]?.Community?.District?.name,
      "Electoral Area": data[i]?.electoralArea,

      Community: data[i]?.community,
      "Ghana Post GPS": data[i]?.ghanaPostGps,
      Latitude: data[i]?.latitude,
      Longitude: data[i]?.longitude,
      Accuracy: data[i]?.accuracy,
      "Respondent Name": data[i]?.respondentName,
      "Respondent Designation": data[i]?.RespondentDesignation?.name,

      "Animals Permit Availability":
        data[i]?.Inspection?.LicencePermitSection?.animalsPermitAvailability
          ?.name,
      "Building Permit Availability":
        data[i]?.Inspection?.LicencePermitSection?.buildingPermitAvailability
          ?.name,

      "Business Licence Availability":
        data[i]?.Inspection?.LicencePermitSection?.businessLicenceAvailability
          ?.name,
      "Fumigation Certificate Availability":
        data[i]?.Inspection?.LicencePermitSection
          ?.fumigationCertificateAvailability?.name,
      "Habitation Certificate Availability":
        data[i]?.Inspection?.LicencePermitSection
          ?.habitationCertificateAvailability?.name,
      "Operating Licence Availability":
        data[i]?.Inspection?.LicencePermitSection
          ?.operatingLicenceAvailability?.name,
      "Property Rate Availability":
        data[i]?.Inspection?.LicencePermitSection?.propertyRateAvailability
          ?.name,
      "Structure Permit Availability":
        data[i]?.Inspection?.LicencePermitSection?.structurePermitAvailability
          ?.name,
      "GTA Operating Licence Availability":
        data[i]?.Inspection?.LicencePermitSection
          ?.gtaOperatingLicenceAvailability?.name,
      "Water Analysis Report":
        data[i]?.Inspection?.LicencePermitSection?.waterAnalysisReport?.name,
      "Reg General Cert Availability":
        data[i]?.Inspection?.LicencePermitSection?.regGeneralCertAvailability
          ?.name,
      "Suitability Certificate Availability":
        data[i]?.Inspection?.LicencePermitSection
          ?.suitabilityCertificateAvailability?.name,
      "Pharmacy Cert Availability":
        data[i]?.Inspection?.LicencePermitSection?.pharmacyCertAvailability
          ?.name,

      "Water Flow Frequency":
        data[i]?.Inspection?.WaterSection?.WaterFlowFrequency?.name,
      "Water Storage Condition Safe":
        data[i]?.Inspection?.WaterSection?.waterStorageConditionSafe?.name,
      "Water Source Condition":
        data[i]?.Inspection?.WaterSection?.waterSourceCondition?.name,
      "Safe Distance Water Storage Sanitary":
        data[i]?.Inspection?.WaterSection?.safeDistanceWaterStorageSanitary
          ?.name,
      "Premises Drinking Water Sources": data[
        i
      ]?.Inspection?.WaterSection?.PremisesDrinkingWaterSources?.map(
        (data: any) => data?.DrinkingWaterSourceType?.name
      ).toString(),
      "Premises Water Sources": data[
        i
      ]?.Inspection?.WaterSection?.PremisesWaterSources?.map(
        (data: any) => data?.WaterSourceType?.name
      ).toString(),
      "Premises Water Storage": data[
        i
      ]?.Inspection?.WaterSection?.PremisesWaterStorage?.map(
        (data: any) => data?.WaterStorageType?.name
      ).toString(),
      "Premises Water Supply": data[
        i
      ]?.Inspection?.WaterSection?.PremisesWaterSupply?.map(
        (data: any) => data?.WaterSupplyType?.name
      ).toString(),
      "Premises Water Treatment Type": data[
        i
      ]?.Inspection?.WaterSection?.PremisesWaterTreatmentType?.map(
        (data: any) => data?.WaterTreatmentType?.name
      ).toString(),

      ///LIQUID  WASTE

      "Toilet Adequate":
        data[i]?.Inspection?.LiquidWasteSection?.toiletAdequacy?.name,
      "Anal Cleansing Material Mgt":
        data[i]?.Inspection?.LiquidWasteSection?.analCleansingMaterialMgt
          ?.name,
      "Area Sewered":
        data[i]?.Inspection?.LiquidWasteSection?.areaSewered?.name,
      "Toilet Facilty Mgt Available":
        data[i]?.Inspection?.LiquidWasteSection?.availToiletFaciltyMgt?.name,
      "Bathroom Adequacy":
        data[i]?.Inspection?.LiquidWasteSection?.bathroomAdequacy?.name,
      "Containment Emptied":
        data[i]?.Inspection?.LiquidWasteSection?.containmentEmptied?.name,
      "Desilting Frequency":
        data[i]?.Inspection?.LiquidWasteSection?.DesiltingFrequency?.name,
      "Drains Condition":
        data[i]?.Inspection?.LiquidWasteSection?.drainsCondition?.name,
      "Ease Yourself Where":
        data[i]?.Inspection?.LiquidWasteSection?.EaseYourselfWhere?.name,
      "Premises Effluent Management": data[
        i
      ]?.Inspection?.LiquidWasteSection?.PremisesEffluentManagement?.map(
        (data: any) => data?.EffluentManagement?.name
      ).toString(),

      "Premises Excreta Disposal Method": data[
        i
      ]?.Inspection?.LiquidWasteSection?.PremisesExcretaDisposalMethod?.map(
        (data: any) => data?.ExcretaDisposalMethod?.name
      ).toString(),
      "Premises Excreta Containment": data[
        i
      ]?.Inspection?.LiquidWasteSection?.PremisesExcretaContainment?.map(
        (data: any) => data?.ExcretaContainment?.name
      ).toString(),
      "Premises Grey Water Disposal": data[
        i
      ]?.Inspection?.LiquidWasteSection?.PremisesGreyWaterDisposal?.map(
        (data: any) => data?.GreyWaterDisposal?.name
      ).toString(),
      "Premises Toilet Type": data[
        i
      ]?.Inspection?.LiquidWasteSection?.PremisesToiletType?.map(
        (data: any) => data?.ToiletType?.name
      ).toString(),

      "Facility Connected Sewer":
        data[i]?.Inspection?.LiquidWasteSection?.facilityConnectedSewer?.name,
      "Bathroom Condition":
        data[i]?.Inspection?.LiquidWasteSection?.bathroomCondition?.name,
      "Separate Staff Urinal":
        data[i]?.Inspection?.LiquidWasteSection?.separateStaffUrinal?.name,
      "Sewer System":
        data[i]?.Inspection?.LiquidWasteSection?.sewerSystem?.name,
      "Stagnation Evidence":
        data[i]?.Inspection?.LiquidWasteSection?.stagnationEvidence?.name,
      "Toilet Condition":
        data[i]?.Inspection?.LiquidWasteSection?.toiletCondition?.name,
      "Toilet Disability Friendly":
        data[i]?.Inspection?.LiquidWasteSection?.toiletDisabilityFriendly
          ?.name,
      "Toilet Discharge":
        data[i]?.Inspection?.LiquidWasteSection?.toiletDischarge?.name,
      "Toilet Pit Position":
        data[i]?.Inspection?.LiquidWasteSection?.toiletPitPosition?.name,

      ///SOLID WASTE
      "Waste Service Provider Registration":
        data[i]?.Inspection?.SolidWasteSection
          ?.wasteServiceProviderRegistration?.name,
      "Waste Sorting Availability":
        data[i]?.Inspection?.SolidWasteSection?.wasteSortingAvailability
          ?.name,
      "Waste Collection Frequency":
        data[i]?.Inspection?.SolidWasteSection?.wasteCollectionFrequency
          ?.name,
      "Approved Waste Storage Receptacle":
        data[i]?.Inspection?.SolidWasteSection?.approvedWasteStorageReceptacle
          ?.name,
      "Adequate Waste Storage Receptacle":
        data[i]?.Inspection?.SolidWasteSection?.adequateWasteStorageReceptacle
          ?.name,
      "Waste Collection Type":
        data[i]?.Inspection?.SolidWasteSection?.WasteCollectionType?.name,
      "Unserviced Waste Disposal":
        data[i]?.Inspection?.SolidWasteSection?.UnservicedWasteDisposal?.name,
      "Waste Payment Evidence":
        data[i]?.Inspection?.SolidWasteSection?.wastePaymentEvidence?.name,
      "Container Volume":
        data[i]?.Inspection?.SolidWasteSection?.ContainerVolume?.name,
      "Waste Provider Accreditted":
        data[i]?.Inspection?.SolidWasteSection?.wasteProviderAccreditted
          ?.name,

      PremisesHazardousWasteDisposal: data[
        i
      ]?.Inspection?.SolidWasteSection?.PremisesHazardousWasteDisposal?.map(
        (data: any) => data?.HazardousWasteDisposalMethod?.name
      ).toString(),
      PremisesWasteReceptacle: data[
        i
      ]?.Inspection?.SolidWasteSection?.PremisesWasteReceptacle?.map(
        (data: any) => data?.SolidWasteReceptacle?.name
      ).toString(),

      ///CONCLUSION
      "Obnoxious Trade ":
        data[i]?.Inspection?.ConclusionSection?.obnoxiousTrade,
      "Officer Comment":
        data[i]?.Inspection?.ConclusionSection?.officerComment,
      Nuisance: data[
        i
      ]?.Inspection?.ConclusionSection?.PremisesNuisanceDetected?.map(
        (data: any) => data?.Nuisance?.name
      ).toString(),
      "Premises Action Taken": data[
        i
      ]?.Inspection?.ConclusionSection?.PremisesActionTaken?.map(
        (data: any) => data?.Action?.name
      ).toString(),
    });
  }

  return newData;
};

const uploadFile = async (fileName: any) => {
  try {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    var s3 = new AWS.S3();

    var filePath = `./public/temp/${fileName}`;

    var params = {
      Bucket: "esicapps-exports",
      Body: fs.createReadStream(filePath),
      // Key: prefix + "/" + fileName,
      Key: fileName,
    };

    let stored = await s3.upload(params).promise();

    return stored.Location;
  } catch (error) {
    console.log("Upload File Error ", error);
    return error;
  }
};
