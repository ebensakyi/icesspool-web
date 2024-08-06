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







  const [loading, setLoading] = useState(false);

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



  let userSession: any = session;


  let nationalUser: any = userSession?.user?.userLevelId == 1;
  let regionalUser: any = userSession?.user?.userLevelId == 2;
  let districtUser: any = userSession?.user?.userLevelId == 3;


 
 



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

                <div className="pagetitle">
                  <h1>All Transactions</h1>

                </div>


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
                          <h6>{data?.dashboardData?.allTx?.allTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1"> ALL</span>
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
                          <h6> {data?.dashboardData?.allTx?.allCompletedTransactions}
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
                          <h6> {data?.dashboardData?.allTx?.allPendingTransactions}
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
                          <h6>{data?.dashboardData?.allTx?.allCancelledTransactions}
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

                <div className="pagetitle">
                  <h1>Biodigester</h1>

                </div>


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
                          <h6>{data?.dashboardData?.bTx?.bTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1"> ALL</span>
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
                        <h6>{data?.dashboardData?.bTx?.bCompletedTransactions}  </h6>
                        

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
                        <h6>{data?.dashboardData?.bTx?.bPendingTransactions}  </h6>

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
                          <h6>{data?.dashboardData?.bTx?.bCancelledTransactions}
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

                <div className="pagetitle">
                  <h1>Water Tanker</h1>

                </div>


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
                          <h6>{data?.dashboardData?.wTx?.wTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1"> ALL</span>
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
                        <h6>{data?.dashboardData?.wTx?.wCompletedTransactions}  </h6>

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
                        <h6>{data?.dashboardData?.wTx?.wPendingTransactions}  </h6>

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
                        <h6>{data?.dashboardData?.wTx?.wCancelledTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1">CANCELLED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Sales Card */}

                <div className="pagetitle">
                  <h1>Toilet Truck</h1>

                </div>


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
                        <h6>{data?.dashboardData?.tTx?.tTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1"> ALL</span>
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
                        <h6>{data?.dashboardData?.tTx?.tCompletedTransactions}  </h6>

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
                        <h6>{data?.dashboardData?.tTx?.tPendingTransactions}  </h6>

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
                        <h6>{data?.dashboardData?.tTx?.tCancelledTransactions}  </h6>

                          <span className="text-muted small pt-2 ps-1">CANCELLED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="pagetitle">
                  <h1>Users</h1>

                </div>




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
                          <h6>{data?.dashboardData?.users?.sp}  </h6>

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
                          <h6> {data?.dashboardData?.users?.client}
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
                          <h6> {data?.dashboardData?.users?.scanner}
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
                          <h6>{data?.dashboardData?.users?.sp}
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
