const InstitutionPremisesInfoView = ({ data }:any) => {

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-xl-12">
              <div className="row align-items-center gy-3 mb-3">
                <div className="col-sm">
                  <div>
                    <h5 className="fs-14 mb-0">
                      INSTITUTION INFORMATION SECTION
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card product">
                <div className="card-body">
                  <div className="row gy-3">
                    {data?.InstitutionPremisesInfoSection?.facilityName !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Facility Name</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection.facilityName
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.Type != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Premises Type</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection.Type?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.Subtype != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Premises Subtype</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection.Subtype?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.toiletAvailability !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Toilet facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              .toiletAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.urinalAvailability !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Urinal facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              .urinalAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection
                      ?.bathroomAvailabilityId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Bathroom facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              ?.bathroomAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.drainsAvailability !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Drains availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              ?.drainsAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection
                      ?.approvedHandwashingFacilityAvailabilityInstitution !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Handwashing facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              ?.approvedHandwashingFacilityAvailabilityInstitution
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection
                      ?.numberNonTeachingStaff != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of non teaching staff
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              ?.numberNonTeachingStaff
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection
                      ?.numberTeachingStaff != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of teaching staff
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              .numberTeachingStaff
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection?.numberMaleStudents !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of male students
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              ?.numberMaleStudents
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.InstitutionPremisesInfoSection
                      ?.numberFemaleStudents != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of female students
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.InstitutionPremisesInfoSection
                              .numberFemaleStudents
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                 

                  {data?.InstitutionPremisesInfoSection?.ablutionSlabId !=
                  null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">Ablution Slab</label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection?.ablutionSlab
                            ?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  {data?.InstitutionPremisesInfoSection
                    ?.ablutionSlabConditionId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Ablution slab condition
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.ablutionSlabCondition?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  {data?.InstitutionPremisesInfoSection
                    ?.animalSpaceAvailabilityId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Animal space availabilty
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.animalSpaceAvailability?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.animalSpaceConditionId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Animal space condition
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.animalSpaceCondition?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.cookedFoodStorageCondtionSafeId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Cooked food condition safe
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.cookedFoodStorageCondtionSafe?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.uncookedFoodStorageCondtionSafeId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Uncooked food condition safe
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.uncookedFoodStorageCondtionSafe?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.foodVendorAvailabilityId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Food Vendor Availability
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.foodVendorAvailability?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.kitchenAvailabilityId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Kitchen Availability
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.kitchenAvailability?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.physicalStructureTypeId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Physical Structure Type
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.physicalStructureType?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection?.shepClubExistenceId !=
                  null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Shep Club Existence
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection?.shepClubExistence
                            ?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.slaughterAreaAvailabilityId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Slaughter Area Availability
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.slaughterAreaAvailability?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.slaughterAreaCondition != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Slaughter Area condition
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.slaughterAreaCondition?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection?.soundProofId !=
                  null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">Sound Proof</label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection?.soundProof?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {data?.InstitutionPremisesInfoSection
                    ?.protectiveClothingUsedId != null ? (
                    <div className="col-lg-3 col-sm-6">
                      <label htmlFor="invoicenoInput">
                        Protective Clothing Used
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        value={
                          data?.InstitutionPremisesInfoSection
                            ?.protectiveClothingUsed?.name
                        }
                        readOnly={true}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default InstitutionPremisesInfoView;
