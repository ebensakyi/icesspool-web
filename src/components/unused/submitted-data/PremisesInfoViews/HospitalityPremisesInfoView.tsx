
const HospitalityPremisesInfoView = ({ data }:any) => {


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
                      HOSPITALITY INFORMATION SECTION
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card product">
                <div className="card-body">
                  <div className="row gy-3">
                    {data?.HospitalityPremisesInfoSection?.facilityName !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Facility Name</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection?.facilityName
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}{" "}
                    {data?.HospitalityPremisesInfoSection
                      ?.hospitalityPremisesTypeId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Premises Type</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.hospitalityPremisesType?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection?.physicalStructureType
                      .name != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Premises Structure
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.physicalStructureType?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection?.toiletAvailability !=
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
                            data?.HospitalityPremisesInfoSection
                              ?.toiletAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection?.urinalAvailability !=
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
                            data?.HospitalityPremisesInfoSection
                              ?.urinalAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.bathroomAvailability != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Bathroom facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.bathroomAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection?.drainsAvailability !=
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
                            data?.HospitalityPremisesInfoSection
                              ?.drainsAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.approvedHandwashingFacilityAvailability != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Handwashing facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.approvedHandwashingFacilityAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection?.numberMaleWorkers !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of male workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberMaleWorkers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.numberFemaleWorkers != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of female workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberFemaleWorkers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}




{data?.HospitalityPremisesInfoSection
                      ?.cookedFoodStorageCondtionSafeId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Cooked Food Storage Condtion Safe
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.cookedFoodStorageCondtionSafe?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.uncookedFoodStorageCondtionSafeId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Uncooked Food Storage Condtion Safe
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.uncookedFoodStorageCondtionSafe?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.designatedSmokingAreaId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Designated Smoking Area
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.designatedSmokingArea?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
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
                            data?.HospitalityPremisesInfoSection
                              ?.protectiveClothingUsed?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.firstAidAvailabilityId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        First Aid Availability
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.firstAidAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
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
                            data?.HospitalityPremisesInfoSection
                              ?.kitchenAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.numberMaleWorkers != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of male workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberMaleWorkers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.numberFemaleWorkers != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of female workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberFemaleWorkers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.HospitalityPremisesInfoSection
                      ?.numberFoodHandlingMedical != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of food Handling Medically Cert
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberFoodHandlingMedical
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}


{data?.HospitalityPremisesInfoSection
                      ?.numberFoodHandling != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of food Handling Staff
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberFoodHandling
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}


{data?.HospitalityPremisesInfoSection
                      ?.numberRooms != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of rooms
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.numberRooms
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

{data?.HospitalityPremisesInfoSection
                      ?.facilityCapacity != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                         Facility capacity
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.HospitalityPremisesInfoSection
                              ?.facilityCapacity
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

export default HospitalityPremisesInfoView;
