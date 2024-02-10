// @ts-nocheck

'use client'
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import LoadingOverlay from "react-loading-overlay";

import html2canvas from "html2canvas";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import { LOGIN_URL } from '@/config';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
export default function Dashboard({ data }: any) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(LOGIN_URL);
    }
  })

  // let userRegion = session?.user?.regionId
  // let userDistrict = session?.user?.districtId

  // console.log(session);




  const waterSourceRef: any = useRef();
  const waterSourceConditionRef: any = useRef();
  const waterStorageConditionRef: any = useRef();

  const toiletAvailabilityRef: any = useRef();
  const toiletAdequacyRef: any = useRef();

  const toiletConditionRef: any = useRef();
  const wasteCollectorRegistrationRef: any = useRef();
  const wasteSortingRef: any = useRef();
  const wasteStorageReceptacleRef: any = useRef();
  const submissionsRef: any = useRef();



  const [loading, setLoading] = useState(false);

  const [districtsData, setDistrictsData] = useState([]);
  const [electoralAreasData, setElectoralAreasData] = useState([]);
  const [communitiesData, setCommunitiesData] = useState([]);

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [electoralArea, setElectoralArea] = useState("");
  const [community, setCommunity] = useState("");

  const [filterValue, setFilterValue] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()



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

  const getDistrictsByRegion = async (regionId: any) => {

    try {
      const response = await axios.get(
        `/api/primary-data/district?regionId=${regionId}&get_all=1`
      );

      setDistrictsData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  const getElectoralAreasByDistrict = async (districtId: any) => {
    try {
      const response = await axios.get(
        "/api/primary-data/electoral-area?districtId=" + districtId + "&get_all=1"
      );
      setElectoralAreasData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };
  const getCommunitiesByElectoralArea = async (electoralAreaId: any) => {
    try {
      const response = await axios.get(
        "/api/primary-data/community?electoralAreaId=" + electoralAreaId + "&get_all=1"
      );

      setCommunitiesData(response.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (e: any) => {
    try {
      e.preventDefault();


      if (filterBy == "national") {
        return router.push("/");
      }
      if (filterBy == "" || filterBy == null) {
        return toast.error("Please select a filter");
      }
      if (filterBy == "communityId" && community == null) {
        return toast.error("Please select community");
      }
      if (filterBy == "electoralAreaId" && electoralArea == null) {
        return toast.error("Please select electoral area");
      }
      if (filterBy == "districtId" && district == null || district == "") {
        return toast.error("Please select district");
      }
      if (filterBy == "regionId" && region == null) {
        return toast.error("Please select region");
      }





     let val = await returnFilterValue(filterBy);

      setLoading(true)

      router.push(
        `${pathname}?filterBy=${filterBy}&filterValue=${filterValue}&from=${from}&to=${to}`
      );

      setLoading(false);
    } catch (error) {
      console.log(error);

    }


    // const published = Number(searchParams.get('published'))

  };

  let submissionsChartData,
    reinspectionPieChartData,
    followupPieChartData,
    actionsTakenBarchartData,
    waterSourceBarchartData,
    waterSourceConditionBarchartData,
    waterStorageConditionBarchartData,
    toiletAvailabilityBarchartData,
    toiletConditionBarchartData,
    toiletAdequacyBarchartData,
    wasteCollectorBarchartData,
    wasteSortingBarchartData,
    approvedWasteReceptacleBarchartData;




  submissionsChartData = {
    labels: data?.dashboardData?.baselineSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of baseline submissions",
        data: data?.dashboardData?.baselineSummary?.map((x: any) => x.value),
        backgroundColor:   "#22BFAC",
        
        // [
        //   "#C15C76",
        //   "#6876B6",
        //   "#559CAD",
        //   "#F6CB3C",
        //   "#CC0000",
        //   "#22BFAC",
        //   "#7E06EF",
        //   "#089DD9",
        // ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
      {
        label: "# of reinspection submissions",
        data: data?.dashboardData?.reinspectionSummary?.map((x: any) => x.value),
        backgroundColor:  "#A33E57",
        // [
        //   "#A33E57",
        //   "#3C477C",
        //   "#427B8A",
        //   "#F4C015",
        //   "#A30000",
        //   "#1C9C8D",
        //   "#6905C7",
        //   "#0681B1",
        // ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
      {
        label: "# of followup submissions",
        data: data?.dashboardData?.followupSummary?.map((x: any) => x.value),
        backgroundColor:   "#045676",
        // [
        //   "#762D3F",
        //   "#2E3760",
        //   "#35626E",
        //   "#D6A70A",
        //   "#7A0000",
        //   "#12685E",
        //   "#4A048B",
        //   "#045676",
        // ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  reinspectionPieChartData = {
    labels: data?.dashboardData?.reinspectionSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.reinspectionSummary?.map((x: any) => x.value),
        backgroundColor: ["#DAB785",

          "#70A288",
          "#F0386B",
          "#04395E",

          "#D5896F",
          "#EB5E55",
          "#0D00A4",
          "#C879FF",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  followupPieChartData = {
    labels: data?.dashboardData?.followupSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.followupSummary?.map((x: any) => x.value),
        backgroundColor: ["#DAB785",

          "#70A288",
          "#F0386B",
          "#04395E",

          "#D5896F",
          "#EB5E55",
          "#0D00A4",
          "#C879FF",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  actionsTakenBarchartData = {
    labels: data?.dashboardData?.actionsTaken?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.actionsTaken?.map((x: any) => x.value),
        backgroundColor: ["#DAB785",

          "#70A288",
          "#F0386B",
          "#04395E",

          "#D5896F",
          "#EB5E55",
          "#0D00A4",
          "#C879FF",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  waterSourceBarchartData = {
    labels: data?.dashboardData?.waterSourceTypeSummary?.map((x: any) => x.name),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.waterSourceTypeSummary?.map((x: any) => x.count),
        backgroundColor: ["#DAB785",

          "#70A288",
          "#F0386B",
          "#04395E",

          "#D5896F",
          "#EB5E55",
          "#0D00A4",
          "#C879FF",
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  waterSourceConditionBarchartData = {
    labels: data?.dashboardData?.waterSourceConditionSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.waterSourceConditionSummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],

        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  waterStorageConditionBarchartData = {
    labels: data?.dashboardData?.waterStorageConditionSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.waterStorageConditionSummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],

        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  toiletAvailabilityBarchartData = {
    labels: data?.dashboardData?.toiletAvailabilitySummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.toiletAvailabilitySummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  toiletAdequacyBarchartData = {
    labels: data?.dashboardData?.toiletAdequacySummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.toiletAdequacySummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  toiletConditionBarchartData = {
    labels: data?.dashboardData?.toiletConditionSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.toiletConditionSummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  wasteCollectorBarchartData = {
    labels: data?.dashboardData?.wasteCollectorRegistrationSummary?.map(
      (x: any) => x.label
    ),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.wasteCollectorRegistrationSummary?.map(
          (x: any) => x.value
        ),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  wasteSortingBarchartData = {
    labels: data?.dashboardData?.wasteSortingSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.wasteSortingSummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };

  approvedWasteReceptacleBarchartData = {
    labels: data?.dashboardData?.wasteReceptacleSummary?.map((x: any) => x.label),
    datasets: [
      {
        label: "# of submissions",
        data: data?.dashboardData?.wasteReceptacleSummary?.map((x: any) => x.value),
        backgroundColor: ["#09814A", "#DB222A"],
        borderColor: ["white"],
        borderWidth: 1,
      },
    ],
  };




  let userSession: any = session;


  let nationalUser: any = userSession?.user?.userLevelId == 1;
  let regionalUser: any = userSession?.user?.userLevelId == 2;
  let districtUser: any = userSession?.user?.userLevelId == 3;


  const exportAsImage = async (element: any, imageFileName: any) => {
    setLoading(true);
    try {
      const html: any = document.getElementsByTagName("html")[0];
      const body: any = document.getElementsByTagName("body")[0];
      let htmlWidth = html.clientWidth;
      let bodyWidth = body.clientWidth;
      const newWidth = element.scrollWidth - element.clientWidth;
      if (newWidth > element.clientWidth) {
        htmlWidth += newWidth;
        bodyWidth += newWidth;
      }
      html.style.width = htmlWidth + "px";
      body.style.width = bodyWidth + "px";
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png", 1.0);
      downloadImage(image, imageFileName);
      html.style.width = null;
      body.style.width = null;
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const downloadImage = (blob: any, fileName: any) => {
    try {
      const fakeLink: any = window.document.createElement("a");
      fakeLink.style = "display:none;";
      fakeLink.download = fileName;

      fakeLink.href = blob;

      document.body.appendChild(fakeLink);
      fakeLink.click();
      document.body.removeChild(fakeLink);

      fakeLink.remove();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleFilterReset = () => {
    setRegion(null)
    setDistrict(null)
    setElectoralArea(null)
    setCommunity(null)

    router.push(
      `${pathname}`

    );
  }



  return (

    <main id="main" className="main">

      <div className="pagetitle">
        <h1>Dashboard</h1>
        {/* <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav> */}
      </div>

   
      <br />
      {/* End Page Title */}
      <section className="section dashboard" >
        <div className="row">
          {/* Left side columns */}
          <div className="col-lg-12"> 
           <LoadingOverlay
            active={loading}
            spinner={true}
            text="Loading. Please wait..."
          >
            <div className="row">
              {/* Sales Card */}


              <div className="col-xxl-3 col-md-4">
                <div className="card info-card revenue-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-bullseye" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.baselineCount}  </h6>

                        <span className="text-muted small pt-2 ps-1"> TRANSACTIONS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card customers-card">

                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-card-checklist

" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.reInspectionCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1">COMPLETED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card sales-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-arrow-left-right
" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.followUpCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1">PENDING</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-5">
                <div className="card info-card danger-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-x-square

" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.sanitationReportsCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1">CANCELLED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Sales Card */}


              <div className="col-xxl-3 col-md-4">
                <div className="card info-card revenue-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-arrow-down-left-square" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.baselineCount}  </h6>

                        <span className="text-muted small pt-2 ps-1"># BIODIGESTER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card customers-card">

                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-stack
" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.reInspectionCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"> # SEPTIC TANK</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card sales-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-water
" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.followUpCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"># WATER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-5">
                <div className="card info-card danger-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-trash
" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.sanitationReportsCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"># SP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Sales Card */}


              <div className="col-xxl-3 col-md-4">
                <div className="card info-card revenue-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-shield-check
" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.baselineCount}  </h6>

                        <span className="text-muted small pt-2 ps-1"># ADMINS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card customers-card">

                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people
" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.reInspectionCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"> # CUSTOMER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-4">
                <div className="card info-card sales-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-upc-scan

" />
                      </div>
                      <div className="ps-3">
                        <h6> {data?.dashboardData?.followUpCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"># SCANNER</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-5">
                <div className="card info-card danger-card">
                  <div className="filter">


                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {/* Sales <span>| Today</span> */}
                    </h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-patch-check
" />
                      </div>
                      <div className="ps-3">
                        <h6>{data?.dashboardData?.sanitationReportsCount}
                        </h6>

                        <span className="text-muted small pt-2 ps-1"># SP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LoadingOverlay>


            {/* end row */}

         
          </div>
        </div>


      </section>
    </main>

  )
}
