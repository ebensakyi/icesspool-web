export type EateryInfo = {
  id: string;
  inspectionId: string;
  userId: number;
  facilityName: string;
  physicalStructureTypeId: number | null;

  eateryPremisesTypeId: number | null;
  eateryPremisesSubTypeId: number | null;
  designatedSmokingAreaId: number | null;

  drainsAvailabilityId: number | null;
  toiletAvailabilityId: number | null;
  urinalAvailabilityId: number | null;

  bathroomAvailabilityId: number | null;

  approvedHandwashingFacilityAvailabilityId: number | null;

  firstAidAvailabilityId: number | null;
  kitchenAvailabilityId: number | null;

  protectiveClothingUsedId: number | null;

  numberFoodHandling: number | null;

  numberFoodHandlingMedical: number | null;

  uncookedFoodStorageCondtionSafeId: number | null;

  cookedFoodStorageCondtionSafeId: number | null;
  disinfestationId: number | null;
  disinfestationFrequencyId: number | null;
  disinfectionId: number | null;

  disinfectionFrequencyId: number | null;
}

export interface FollowUpInspection {
  id: string;

  prevInspectionId: string;
  inspectionFormId: number;
  premisesCode: string;
  districtId: number;
  regionId: number;
  userId: number;
  community: string;
  electoralAreaId: number;
  electoralArea: string;
  ghanaPostGps: string;
  latitude: string;
  longitude: string;
  accuracy: string;
  respondentName: string;
  respondentPhoneNumber: string;
  respondentDesignationId: number;
  communityId: number;

  waterRating: number;
  solidWasteRating: number;
  liquidWasteRating: number;
  totalRating: number;

  officerComment: string;
  obnoxiousTradeExistFollowUpId: number | null;

  obnoxiousTrade: string;
  isNuisanceObservedId: number | null;
}

export interface FollowUpAction {
  id: string;

  inspectionId: string;
  userId: number;

  actionId: number;
}


export interface FollowUpNuisances{
  id: string;

  inspectionId: string;
  userId: number;

  nuisanceId: number ;
}