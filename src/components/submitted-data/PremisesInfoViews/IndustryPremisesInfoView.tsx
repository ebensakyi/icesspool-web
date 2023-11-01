const IndustryPremisesInfoView = ({ data }:any) => {

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-3">
            <div className="col-xl-12">
              <div className="row align-items-center gy-3 mb-3">
                <div className="col-sm">
                  <div>
                    <h5 className="fs-14 mb-0">INDUSTRY INFORMATION SECTION</h5>
                  </div>
                </div>
              </div>
              <div className="card product">
                <div className="card-body">
                  <div className="row gy-3">
                    {data?.IndustryPremisesInfoSection?.facilityName != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Facility Name</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection?.facilityName
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} {data?.IndustryPremisesInfoSection
                      ?.industryPremisesTypeId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">Premises Type</label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.Type?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.industryPremisesSubtypeId != null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Industry Premises Subtype
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.Subtype?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.toiletAvailability !=
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
                            data?.IndustryPremisesInfoSection
                              ?.toiletAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.urinalAvailability !=
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
                            data?.IndustryPremisesInfoSection
                              ?.urinalAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.bathroomAvailability !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Bathroom facility availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.bathroomAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.drainsAvailability !=
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
                            data?.IndustryPremisesInfoSection
                              ?.drainsAvailability?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.approvedHandwashingFacilityAvailabilityIndustry !=
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
                            data?.IndustryPremisesInfoSection
                              ?.approvedHandwashingFacilityAvailabilityIndustry
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                   
                    {data?.IndustryPremisesInfoSection
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
                            data?.IndustryPremisesInfoSection
                              ?.physicalStructureType?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.otherIndustryFacility !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Other Industry Facility
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.otherIndustryFacility
                             
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.protectiveClothingUsedId !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Protective Clothing Used
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.protectiveClothingUsed
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.productionRoomConditionId !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Production Room Condition
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.productionRoomCondition
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.flyScreenNetAvailabilityId !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Fly Screen Net Availability
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.flyScreenNetAvailability
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection
                      ?.storeRoomAvailabilityId !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Store Room availabilty
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.storeRoomAvailability
                              ?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}


                   {data?.IndustryPremisesInfoSection?.manufacturedServices !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Manufactured Products / Services
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection?.manufacturedServices
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.majorByProducts !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        Major By-Products
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.majorByProducts
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.IndustryPremisesInfoSection?.numberWorkers !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.numberWorkers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} 



{data?.IndustryPremisesInfoSection?.byProductsStorageAreaCondId !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                        By Products Storage Area Condition
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.byProductsStorageAreaCond?.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} 
                     {data?.IndustryPremisesInfoSection?.numberFoodHandlers !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of food handlers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.numberFoodHandlers
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} 
                     {data?.IndustryPremisesInfoSection?.numberFoodHandlersCert !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of Food Handlers with Certificate
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.numberFoodHandlersCert
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} 
                     {data?.IndustryPremisesInfoSection?.numberWorkers !=
                    null ? (
                      <div className="col-lg-3 col-sm-6">
                        <label htmlFor="invoicenoInput">
                          Number of workers
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.IndustryPremisesInfoSection
                              ?.numberWorkers
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

export default IndustryPremisesInfoView;
