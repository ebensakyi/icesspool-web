'use client'
import axios from 'axios';
import { usePathname, useRouter, useSearchParams, redirect } from 'next/navigation';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import ActionSummary from './templates/ActionSummary';
import ApprovedWasteReceptacle from './templates/ApprovedWasteReceptacle';
import DrainAvailability from './templates/DrainAvailability';
import WaterCondition from './templates/WaterCondition';
import SubmissionSummary from './templates/SubmissionSummary';
import ToiletAdequacy from './templates/ToiletAdequacy';
import ToiletAvailability from './templates/ToiletAvailability';
import WasteCollectionType from './templates/WasteCollectionType';
import WasteReceptacle from './templates/WasteReceptacle';
import WaterSources from './templates/WaterSources';
import { useSession } from 'next-auth/react';
import { LOGIN_URL } from '@/config';

export default function GeneralReports({ data }: any) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    console.log(data);
    

    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [reportType, setReportType] = useState(null);

    const [reportData, setReportData] = useState([]);
    const [submissionSummaryVisibility, setSubmissionSummaryVisibility] =
        useState(false);
    const [actionSummaryVisibility, setActionSummaryVisibility] = useState(false);
    const [waterSourceSummaryVisibility, setWaterSourceSummaryVisibility] =
        useState(false);
    const [waterConditionVisibility, setWaterConditionVisibility] =
        useState(false);

    const [toiletAvailabilityVisibility, setToiletAvailabilityVisibility] =
        useState(false);
    const [drainAvailabilityVisibility, setDrainAvailabilityVisibility] =
        useState(false);
    const [toiletAdequacyVisibility, setToiletAdequacyVisibility] =
        useState(false);

    const [
        approvedWasteReceptacleVisibility,
        setApprovedWasteReceptacleVisibility,
    ] = useState(false);
    const [wasteCollectionTypeVisibility, setWasteCollectionTypeVisibility] =
        useState(false);
    const [wasteReceptacleVisibility, setWasteReceptacleVisibility] =
        useState(false);

    const [level, setLevel] = useState();
    const [form, setForm] = useState("");
    const [searchText, setSearchText] = useState();
    const [districtsData, setDistrictsData] = useState([]);
    const [electoralAreasData, setElectoralAreasData] = useState([]);
    const [communitiesData, setCommunitiesData] = useState([]);

    const [region, setRegion] = useState("");
    const [district, setDistrict] = useState("");
    const [electoralArea, setElectoralArea] = useState("");
    const [community, setCommunity] = useState("");

    const [filterValue, setFilterValue] = useState("");

    const [filterLabel, setFilterLabel] = useState("");

    const [filterBy, setFilterBy] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");


    // const query = router.query;

    // let formId = query.inspectionFormId;
    // let published = query.published;

    const handleUrl = async (report: any) => {
        if (report == 1) {            
            return "/api/report/submission-summaries";
        }
        if (report == 2) {
            return "/api/report/action-summaries";
        }
        if (report == 11) {
            return "/api/report/water-sources";
        }
        if (report == 12) {
            return "/api/report/water-condition";
        }
        if (report == 21) {
            return "/api/report/toilet-availability";
        }
        if (report == 22) {
            return "/api/report/toilet-adequacy";
        }
        if (report == 23) {
            return "/api/report/drain-availability";
        }
        if (report == 31) {
            return "/api/report/waste-collection-type";
        }
        if (report == 32) {
            return "/api/report/approved-waste-receptacle";
        }
        if (report == 33) {
            return "/api/report/waste-receptacle";
        }
    };

    const handleVisibility = async (report: any) => {
        if (report == 1) {
            setSubmissionSummaryVisibility(true);
            setActionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 2) {
            setActionSummaryVisibility(true);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 11) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(true);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 12) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(true);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 21) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(true);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 22) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(true);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 23) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(true);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 31) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(true);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(false);
        }
        if (report == 32) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(true);
            setWasteReceptacleVisibility(false);
        }
        if (report == 33) {
            setActionSummaryVisibility(false);
            setSubmissionSummaryVisibility(false);
            setWaterSourceSummaryVisibility(false);
            setWaterConditionVisibility(false);
            setToiletAvailabilityVisibility(false);
            setToiletAdequacyVisibility(false);
            setDrainAvailabilityVisibility(false);
            setWasteCollectionTypeVisibility(false);
            setApprovedWasteReceptacleVisibility(false);
            setWasteReceptacleVisibility(true);
        }
    };

    let userSession :any = session;


    let nationalUser: any = userSession?.user?.userLevelId == 1 ;
    let regionalUser: any = userSession?.user?.userLevelId == 2;
    let districtUser: any = userSession?.user?.userLevelId == 3;
    // let loggedInUserType =1;

    //     const handleResetFilters = async () => {
    //       if (loggedInUserType == 1 || loggedInUserType == 2) {
    //         if (filterBy == null) {
    //           setFilterBy("regionId");
    //         }

    //         if (filterValue == null || filterValue == 0) {
    //           setFilterValue(undefined);
    //         }
    //       }
    //       if (loggedInUserType == 3 || loggedInUserType == 4) {
    //         if (filterBy == null) {
    //           setFilterBy("regionId");
    //         }

    //         if (filterValue == null || filterValue == 0) {
    //           setFilterValue(undefined);
    //         }
    //       }
    //       if (loggedInUserType == 5 || loggedInUserType == 6) {
    //         if (filterBy == null) {
    //           setFilterBy("districtId");
    //         }

    //         if (filterValue == null || filterValue == 0) {
    //           setFilterValue(undefined);
    //         }
    //       }
    //     };

    const generateReport = async (e: any) => {
        try {
            e.preventDefault();

            //     await handleResetFilters();

            let data: any = {
                reportType,
                filterBy,
                filterValue,
                from,
                to,
            };
            

            let url: any = await handleUrl(reportType);

            const response = await axios.post(url, data);



            if (response.status == 200) {
                handleVisibility(reportType);
                //setReportData(response.data.data);

                setReportData(response.data);
            }

            // router.replace(router.asPath);

            return toast.success("Report Generated");
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };

    const returnFilterValue = async (filterBy: any) => {
        if (filterBy == "regionId") {
            setFilterValue(region);
            return region;
        }
        if (filterBy == "districtId") {
            setFilterValue(district);
            return district;
        }
        if (filterBy == "electoralAreaId") {
            setFilterValue(electoralArea);
            return electoralArea;
        }
        if (filterBy == "community") {
            setFilterValue(community);
            return community;
        }
    };
    const handleFilter = async (e: any) => {
        e.preventDefault();



        const formId = searchParams.get("formId")
        const published = searchParams.get('published')

        let page = searchParams.get('page')
        await returnFilterValue(filterBy);


        router.push(
            `${pathname}?published=${published}&formId=${formId}&filterBy=${filterBy}&filterValue=${filterValue}&from=${from}&to=${to}`
        );
    };

    const getDistrictsByRegion = async (regionId: any) => {
        try {
            const response = await axios.get(
                `/api/primary-data/district?regionId=${regionId}&get_all=1`
            );
            setDistrictsData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };
    const getElectoralAreasByDistrict = async (districtId: any) => {
        try {
            const response = await axios.get(
                `/api/primary-data/electoral-area?districtId=${districtId}&get_all=1`
            );
            setElectoralAreasData(response?.data?.response);
        } catch (error) {
            console.log(error);
        }
    };
    const getCommunitiesByElectoralArea = async (electoralAreaId: any) => {
        try {
            const response = await axios.get(
                `/api/primary-data/community?electoralAreaId=${electoralAreaId}&get_all=1`
            );

            setCommunitiesData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main id="main" className="main">
            <div className="row">

                <div className="col-lg-12">
                    <div className="col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">GENERATE REPORT</h5>
                            </div>
                            <div className="card-body">
                                {/* <h6 className="card-title">Add Community</h6> */}
                                <div className="row gy-4">
                                    <div className="row row-cols-lg-auto g-3 align-items-center">
                                        <div className="col-md-2">
                                            <label className="form-label mb-0">Report Type</label>
                                            <select
                                                className="form-control"
                                                onChange={(e: any) => {
                                                    setReportType(e.target.value);
                                                }}
                                            >
                                                <option value="">Choose a report</option>
                                                <optgroup label="General">
                                                    <option value="1">Total Submissions Summary</option>
                                                    <option value="2">Action Taken Summary</option>
                                                    {/* <option value="Liverpool">Liverpool</option> */}
                                                </optgroup>
                                                <optgroup label="Water">
                                                    <option value="11">Water Sources</option>
                                                    <option value="12">Water Condition</option>
                                                    {/* <option value="Marseille">Marseille</option> */}
                                                </optgroup>
                                                <optgroup label="Liquid Waste">
                                                    <option value="21">Toilet Availability</option>
                                                    <option value="22">Toilet Adequacy</option>
                                                    <option value="23">Drain Availability</option>
                                                </optgroup>
                                                <optgroup label="Solid Waste">
                                                    <option value="31">Waste Collection Type</option>
                                                    <option value="32">Approved Waste Receptacle</option>
                                                    <option value="33">Waste Receptacle</option>

                                                    {/* <option value="Michigan">Michigan</option> */}
                                                </optgroup>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label mb-0">Select level</label>

                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setFilterBy(e.target.value);


                                                    if (regionalUser) {
                                                        getDistrictsByRegion("");
                                                    }

                                                    if (districtUser) {
                                                        getElectoralAreasByDistrict("");
                                                    }
                                                }}
                                                value={filterBy}
                                            >
                                                <option selected value="regionId">
                                                    Filter by{" "}
                                                </option>
                                                <option hidden={!nationalUser} value="regionId">
                                                    Region
                                                </option>
                                                <option
                                                    hidden={!nationalUser && !regionalUser}
                                                    value="districtId"
                                                >
                                                    District
                                                </option>
                                                <option
                                                    hidden={!nationalUser && !regionalUser && !districtUser}
                                                    value="electoralAreaId"
                                                >
                                                    Electoral Area
                                                </option>
                                                <option
                                                    hidden={!nationalUser && !regionalUser && !districtUser}
                                                    value="communityId"
                                                >
                                                    Community
                                                </option>
                                            </select>
                                        </div>

                                        {filterBy == "regionId" ? (
                                            <div className="col-md-2">
                                                <label className="form-label mb-0">Select region</label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    onChange={async (e: any) => {
                                                        setRegion(e.target.value);
                                                        setFilterValue(e.target.value);
                                                        var id = e.nativeEvent.target.selectedIndex;
                                                        var text = e.nativeEvent.target[id].text;

                                                        setFilterLabel(text);
                                                    }}
                                                    value={region}
                                                >
                                                    {" "}
                                                    <option selected>Select region </option>
                                                    {data.regions?.map((data: any) => (
                                                        <option key={data.id} value={data.id}>
                                                            {data.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        {filterBy == "districtId" ? (
                                            <>
                                                {nationalUser ? (
                                                    <div className="col-md-2">
                                                        <label className="form-label mb-0">
                                                            Select region
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            aria-label="Default select example"
                                                            onChange={async (e: any) => {
                                                                setRegion(e.target.value);

                                                                setFilterValue(e.target.value);
                                                                var id = e.nativeEvent.target.selectedIndex;
                                                                var text = e.nativeEvent.target[id].text;

                                                                setFilterLabel(text);
                                                                await getDistrictsByRegion(e.target.value);
                                                            }}
                                                            value={region}
                                                        >
                                                            {" "}
                                                            <option selected>Select region </option>
                                                            {data?.regions?.map((data: any) => (
                                                                <option key={data.id} value={data.id}>
                                                                    {data.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="col-md-2">
                                                    <label className="form-label mb-0">
                                                        Select district
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        onChange={(e: any) => {
                                                            setDistrict(e.target.value);

                                                            setFilterValue(e.target.value);
                                                            var id = e.nativeEvent.target.selectedIndex;
                                                            var text = e.nativeEvent.target[id].text;

                                                            setFilterLabel(text);
                                                        }}
                                                        value={district}
                                                    >
                                                        {" "}
                                                        <option selected>Select district </option>
                                                        {districtsData?.map((data: any) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {filterBy == "electoralAreaId" ? (
                                            <>
                                                {nationalUser ? (
                                                    <div className="col-md-2">
                                                        <label className="form-label mb-0">
                                                            Select region
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            aria-label="Default select example"
                                                            value={region}
                                                            onChange={async (e: any) => {
                                                                setRegion(e.target.value);

                                                                setFilterValue(e.target.value);
                                                                var id = e.nativeEvent.target.selectedIndex;
                                                                var text = e.nativeEvent.target[id].text;

                                                                setFilterLabel(text);
                                                                await getDistrictsByRegion(e.target.value);
                                                            }}
                                                        >
                                                            {" "}
                                                            <option selected>Select region </option>
                                                            {data?.regions?.map((data: any) => (
                                                                <option key={data.id} value={data.id}>
                                                                    {data.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                {nationalUser || regionalUser ? (
                                                    <div className="col-md-2">
                                                        <label className="form-label mb-0">
                                                            Select district
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            aria-label="Default select example"
                                                            onChange={async (e: any) => {
                                                                setDistrict(e.target.value);

                                                                setFilterValue(e.target.value);
                                                                var id = e.nativeEvent.target.selectedIndex;
                                                                var text = e.nativeEvent.target[id].text;

                                                                setFilterLabel(text);
                                                                await getElectoralAreasByDistrict(e.target.value);
                                                            }}
                                                            value={district}
                                                        >
                                                            {" "}
                                                            <option selected>Select district </option>
                                                            {districtsData?.map((data: any) => (
                                                                <option key={data.id} value={data.id}>
                                                                    {data.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="col-md-2">
                                                    <label className="form-label mb-0">
                                                        Select Electoral Area
                                                    </label>
                                                    <select
                                                        className=" form-control "
                                                        aria-label="Default select example"
                                                        onChange={async (e: any) => {
                                                            setElectoralArea(e.target.value);

                                                            setFilterValue(e.target.value);
                                                            var id = e.nativeEvent.target.selectedIndex;
                                                            var text = e.nativeEvent.target[id].text;

                                                            setFilterLabel(text);
                                                            await getCommunitiesByElectoralArea(e.target.value);
                                                        }}
                                                        value={electoralArea}
                                                    >
                                                        {" "}
                                                        <option selected> Select Electoral Area </option>
                                                        {electoralAreasData?.map((data: any) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {filterBy == "communityId" ? (
                                            <>
                                                {nationalUser || regionalUser ? (
                                                    <div className="col-md-2">
                                                        <label className="form-label mb-0">
                                                            Select region
                                                        </label>
                                                        <select
                                                            className="form-control"
                                                            aria-label="Default select example"
                                                            onChange={async (e: any) => {
                                                                setRegion(e.target.value);

                                                                setFilterValue(e.target.value);
                                                                var id = e.nativeEvent.target.selectedIndex;
                                                                var text = e.nativeEvent.target[id].text;

                                                                setFilterLabel(text);
                                                                await getDistrictsByRegion(e.target.value);
                                                            }}
                                                            value={region}
                                                        >
                                                            {" "}
                                                            <option selected>Select region </option>
                                                            {data?.regions?.map((data: any) => (
                                                                <option key={data.id} value={data.id}>
                                                                    {data.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}

                                                <div className="col-md-2">
                                                    <label className="form-label mb-0">
                                                        Select district
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        onChange={async (e: any) => {
                                                            setDistrict(e.target.value);

                                                            setFilterValue(e.target.value);
                                                            var id = e.nativeEvent.target.selectedIndex;
                                                            var text = e.nativeEvent.target[id].text;

                                                            setFilterLabel(text);
                                                            await getElectoralAreasByDistrict(e.target.value);
                                                        }}
                                                        value={district}
                                                    >
                                                        {" "}
                                                        <option selected>Select district </option>
                                                        {districtsData?.map((data: any) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-md-2">
                                                    <label className="form-label mb-0">
                                                        Select Electoral Area
                                                    </label>
                                                    <select
                                                        className=" form-control "
                                                        aria-label="Default select example"
                                                        onChange={async (e: any) => {
                                                            setElectoralArea(e.target.value);

                                                            setFilterValue(e.target.value);

                                                            var id = e.nativeEvent.target.selectedIndex;
                                                            var text = e.nativeEvent.target[id].text;

                                                            setFilterLabel(text);

                                                            await getCommunitiesByElectoralArea(e.target.value);
                                                        }}
                                                        value={electoralArea}
                                                    >
                                                        {" "}
                                                        <option selected> Select Electoral Area </option>
                                                        {electoralAreasData?.map((data: any) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>{" "}
                                                <div className="col-md-2">
                                                    <label className="form-label mb-0">
                                                        Select community
                                                    </label>
                                                    <select
                                                        className=" form-control "
                                                        aria-label="Default select example"
                                                        onChange={(e: any) => {
                                                            setCommunity(e.target.value);

                                                            setFilterValue(e.target.value);

                                                            var id = e.nativeEvent.target.selectedIndex;
                                                            var text = e.nativeEvent.target[id].text;

                                                            setFilterLabel(text);
                                                        }}
                                                        value={community}
                                                    >
                                                        {" "}
                                                        <option selected>Select community </option>
                                                        {communitiesData?.map((data: any) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}

                                        <div className="col-md-12">
                                            <label className="form-label mb-0">Start Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                onChange={(e: any) => setFrom(e.target.value)}
                                                value={from}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label mb-0">End Date</label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                onChange={(e: any) => setTo(e.target.value)}
                                                value={to}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label mb-0">.</label>
                                            <button
                                                type="submit"
                                                className="form-control btn btn-primary"
                                                onClick={(e: any) => generateReport(e)}
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {submissionSummaryVisibility ? (
                        <SubmissionSummary data={reportData} level={filterLabel} />
                    ) : (
                        <></>
                    )}
                    {actionSummaryVisibility ? (
                        <ActionSummary data={reportData} level={filterLabel} />
                    ) : (
                        <></>
                    )}
                    {waterSourceSummaryVisibility ? (
                        <WaterSources data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}
                    {waterConditionVisibility ? (
                        <WaterCondition data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}
                    {toiletAvailabilityVisibility ? (
                        <ToiletAvailability data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}

                    {toiletAdequacyVisibility ? (
                        <ToiletAdequacy data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}
                    {drainAvailabilityVisibility ? (
                        <DrainAvailability data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}

                    {wasteCollectionTypeVisibility ? (
                        <WasteCollectionType data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}

                    {approvedWasteReceptacleVisibility ? (
                        <ApprovedWasteReceptacle data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}

                    {wasteReceptacleVisibility ? (
                        <WasteReceptacle data={reportData} level={filterValue} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </main>
    );
};

