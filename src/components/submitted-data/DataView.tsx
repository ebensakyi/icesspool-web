// @ts-nocheck
'use client'
import axios from 'axios';
import Link from 'next/link';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import EateryPremisesInfoView from './PremisesInfoViews/EateryPremisesInfoView';
import HealthPremisesInfoView from './PremisesInfoViews/HealthPremisesInfoView';
import HospitalityPremisesInfoView from './PremisesInfoViews/HospitalityPremisesInfoView';
import IndustryPremisesInfoView from './PremisesInfoViews/IndustryPremisesInfoView';
import InstitutionPremisesInfoView from './PremisesInfoViews/InstitutionPremisesInfoView';
import MarketPremisesInfoView from './PremisesInfoViews/MarketPremisesInfoView';
import ResidentialPremisesInfoView from './PremisesInfoViews/ResidentialPremisesInfoView';
import SanitaryPremisesInfoView from './PremisesInfoViews/SanitaryPremisesInfoView';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { LOGIN_URL } from '@/config';
import Modal from "react-modal";

export default function DataView({ data }: any) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    let userSession :any = session;


    let inspectionDeletionAllowed: any = userSession?.user?.UserRole?.inspectionDeletionAllowed
    let inspectionPublishAllowed: any = userSession?.user?.UserRole?.inspectionPublishAllowed
    let inspectionUpdatesAllowed: any = userSession?.user?.UserRole?.inspectionUpdatesAllowed


    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(e: any) {
        e.preventDefault();
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }



    const router = useRouter();

    const pathname = usePathname()
    const searchParams = useSearchParams()

    const formId = Number(searchParams.get("formId"))
    const published = Number(searchParams.get('published'))
    const page = Number(searchParams.get('page'))
    const searchtext = searchParams.get('searchText')

    const handlePublish = async (id: any) => {
        try {
            const response = await axios.post(`/api/submitted-data/data-view`, {
                id: id,
            });
            if (response.status == 200) {

                router.push(
                    `/submitted-data?published=${published}&formId=${formId}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id: any) => {        

        try {
            const response = await axios.put(`/api/submitted-data/data-view`, {
                id: id,
            });
            
            if (response.status == 200) {
                router.push(
                    `/submitted-data?published=${published}&formId=${formId}`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const downloadInspection = async () => {
        const printContents = document.getElementById("printableArea").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        router.refresh();
    };

    const handleTitle = () => {
        try {
            if (formId == 1) {
                return <h5 className="card-title mb-0">RESIDENTIAL PREMISES</h5>;
            } else if (formId == 2) {
                return <h5 className="card-title mb-0">EATING & DRINKING PREMISES</h5>;
            } else if (formId == 3) {
                return <h5 className="card-title mb-0">HEALTH PREMISES</h5>;
            } else if (formId == 4) {
                return <h5 className="card-title mb-0">HOSPITALITY PREMISES</h5>;
            } else if (formId == 5) {
                return <h5 className="card-title mb-0">INSTITUTION PREMISES</h5>;
            } else if (formId == 6) {
                return <h5 className="card-title mb-0">INDUSTRY PREMISES</h5>;
            } else if (formId == 7) {
                return (
                    <h5 className="card-title mb-0">MARKETS & LORRY PARK PREMISES</h5>
                );
            } else if (formId == 8) {
                return <h5 className="card-title mb-0">SANITARY FACILITY PREMISES</h5>;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };


    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>                                                        DATA VIEW
                </h1>
                {/* <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Tables</li>
                <li className="breadcrumb-item active">Data</li>
            </ol>
        </nav> */}

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Confirm deletion"
                >
                    <>


                     

                        <div className="alert alert-outline-danger alert-p" role="alert">
                            <span className="alert-content">
                            You are about to delete this inspection.<br/> Deleted inspection cannot be recovered.
                                Click OK to proceed to delete or Cancel to dismiss
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-grid">
                                    <button
                                        onClick={(e) => {
                                            handleDelete(data?.submittedData?.id);
                                            closeModal();
                                        }}
                                        className="btn btn-success"
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-grid">
                                    <button onClick={closeModal} className="btn btn-danger">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                </Modal>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                        {/* End Page Title */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-label waves-effect right waves-light rounded-pill"
                                                    onClick={() => downloadInspection()}
                                                >
                                                    <i className="ri-file-pdf-line label-icon align-middle rounded-pill fs-16 ms-2"></i>{" "}
                                                    Download Inspection
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body table-responsive">
                                        {/* <h5 className="card-title">Datatables</h5> */}

                                        <div className="row">
                                            <div className="col-12">

                                                <div id="printableArea">
                                                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                                        <h4 className="mb-sm-0">{handleTitle()}</h4>
                                                        <div className="page-title-right">
                                                            <ol className="breadcrumb m-0">
                                                                <li className="breadcrumb-item">
                                                                    <Link
                                                                    href="#"
                                                                        // href={{
                                                                        //     pathname: `/submitted-data?formId=${formId}&published=${published}`,

                                                                        // }}
                                                                    >
                                                                        Go to Data list
                                                                    </Link>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">
                                                                                    BASIC INFORMATION SECTION
                                                                                </h5>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="card ">
                                                                        <div className="card-body">
                                                                            <div className="row">

                                                                                <div className="col-sm-3 mb-3">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Premises Code
                                                                                    </label>
                                                                                    <div className="col-sm-12">

                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            value={data?.submittedData?.premisesCode}
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Region</label>
                                                                                    <div className="col-sm-12">

                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.BasicInfoSection?.Community?.District
                                                                                                    ?.Region.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">District</label>
                                                                                    <div className="col-sm-12">
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.BasicInfoSection?.Community != null
                                                                                                    ? data?.submittedData?.BasicInfoSection?.Community?.District
                                                                                                        ?.name
                                                                                                    : ""
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Electoral Area
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={data?.submittedData?.ElectoralArea?.name}
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">Community</label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={data?.submittedData?.BasicInfoSection?.Community?.name}
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                {/* <div className="col-lg-3 col-sm-6">
                             <label htmlFor="inputText" className="col-sm-12 col-form-label">
                              GhanaPost GPS
                            </label>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="invoicenoInput"
                              value={data?.BasicInfoSection?.ghanaPostGps}
                              readOnly={true}
                            />
                          </div> */}
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Name of respondent
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={data?.submittedData?.BasicInfoSection?.respondentName}
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Respondent designation
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.BasicInfoSection?.RespondentDesignation
                                                                                                ?.name
                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>{" "}
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Respondent phone number
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.BasicInfoSection?.respondentPhoneNumber
                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* end col */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {formId == 1 ? <ResidentialPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 2 ? <EateryPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 3 ? <HealthPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 4 ? <HospitalityPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 5 ? <InstitutionPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 6 ? <IndustryPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 7 ? <MarketPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    {formId == 8 ? <SanitaryPremisesInfoView data={data?.submittedData} /> : <></>}
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">
                                                                                    LICENCES & PERMITS SECTION
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-sm-auto">
                  <a
                    href="apps-ecommerce-products.html"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping
                  </a>
                </div> */}
                                                                    </div>
                                                                    <div className="card product">
                                                                        <div className="card-body">
                                                                            <div className="row gy-3">
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.animalsPermitAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Animal permit
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.animalsPermitAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.buildingPermitAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Building permit
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.buildingPermitAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.habitationCertificateAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Certificate of habitation
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.habitationCertificateAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.propertyRateAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Property rate payment
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.propertyRateAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.suitabilityCertificateAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Suitability Certificate
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.suitabilityCertificateAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.structurePermitAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Structure permit
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.structurePermitAvailability.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}

                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.fumigationCertificateAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Fumigation certificate
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.fumigationCertificateAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.businessLicenceAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Business operating permit
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.businessLicenceAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.structurePermitAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Temporal structure permit
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                id="invoicenoInput"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.structurePermitAvailability?.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection?.waterAnalysisReport !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water analysis report
                                                                                        </label>
                                                                                        <div className="col-sm-12">  <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LicencePermitSection
                                                                                                    ?.waterAnalysisReport?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.regGeneralCertAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Registrar General operating certificate
                                                                                        </label>
                                                                                        <div className="col-sm-12">
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control bg-light border-0"
                                                                                                value={
                                                                                                    data?.submittedData?.LicencePermitSection
                                                                                                        ?.regGeneralCertAvailability.name
                                                                                                }
                                                                                                readOnly={true}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}

                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.gtaOperatingLicenceAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Ghana Tourism Authority operating license
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LicencePermitSection
                                                                                                    ?.gtaOperatingLicenceAvailability?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}

                                                                                {data?.submittedData?.LicencePermitSection
                                                                                    ?.pharmacyCertAvailability != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            HEFRA/PHARMACY COUNCIL operating license
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LicencePermitSection
                                                                                                    ?.pharmacyCertAvailability?.value
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
                                                                {/* end col */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">WATER SECTION</h5>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="card product">
                                                                        <div className="card-body">
                                                                            <div className="row gy-3">
                                                                                {data?.submittedData?.WaterSection?.PremisesWaterSources.length !=
                                                                                    0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label >
                                                                                            Water source
                                                                                        </label>
                                                                                        {data?.submittedData?.WaterSection?.PremisesWaterSources.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.WaterSourceType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.PremisesWaterSupply.length !=
                                                                                    0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water supply
                                                                                        </label>
                                                                                        {data?.submittedData?.WaterSection?.PremisesWaterSupply.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.WaterSupplyType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.waterSourceCondition != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water source condition
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.WaterSection?.waterSourceCondition?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}

                                                                                {data?.submittedData?.WaterSection?.PremisesWaterStorage.length !=
                                                                                    0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water storage
                                                                                        </label>
                                                                                        {data?.submittedData?.WaterSection?.PremisesWaterStorage.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.WaterStorageType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.waterStorageConditionSafe !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Safe Water storage receptacle condition
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.WaterSection?.waterStorageConditionSafe
                                                                                                    .name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.PremisesWaterTreatmentType
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water treatment type
                                                                                        </label>
                                                                                        {data?.submittedData?.WaterSection?.PremisesWaterTreatmentType?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.WaterTreatmentType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.PremisesDrinkingWaterSources
                                                                                    .length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Drinking water source
                                                                                        </label>
                                                                                        {data?.submittedData?.WaterSection?.PremisesDrinkingWaterSources?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.DrinkingWaterSourceType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.WaterSection?.WaterFlowFrequency != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Water flow frequency
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.WaterSection?.WaterFlowFrequency?.name
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
                                                                {/* end col */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">LIQUID WASTE SECTION</h5>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-sm-auto">
                  <a
                    href="apps-ecommerce-products.html"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping


                  </a>
                </div> */}
                                                                    </div>
                                                                    <div className="card product">
                                                                        <div className="card-body">
                                                                            <div className="row gy-3">
                                                                                {data?.submittedData?.LiquidWasteSection?.numberToiletSeats !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Number Toilet Seats
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.numberToiletSeats
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.numberUrinalSeats !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Number Urinal Seats
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.numberUrinalSeats
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.toiletAdequacy != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Toilet Adequacy
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.toiletAdequacy?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.bathroomAdequacy !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Bathroom Adequacy
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.bathroomAdequacy
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {/* {data?.LiquidWasteSection?.separateStaffUrinal != null ? (
                      <div className="col-lg-3 col-sm-6">
                         <label htmlFor="inputText" className="col-sm-12 col-form-label">
                          Separate Staff Urinal
                        </label>
                        <input
                          type="text"
                          className="form-control bg-light border-0"
                          id="invoicenoInput"
                          value={
                            data?.submittedData?.LiquidWasteSection?.separateStaffUrinal.name
                          }
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <></>
                    )} */}
                                                                                {data?.submittedData?.LiquidWasteSection?.toiletPitPosition !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Toilet Pit Position
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.toiletPitPosition
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.drainsCondition != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Drains Condition
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.drainsCondition
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.stagnationEvidence !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Stagnation Evidence
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.stagnationEvidence
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.analCleansingMaterialMgt !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Anal Cleansing Material
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection
                                                                                                    ?.analCleansingMaterialMgt?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.toiletCondition != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Toilet Condition
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.toiletCondition
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.toiletDischarge != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Toilet Discharge
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.toiletDischarge
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.containmentEmptied !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Containment Emptied
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.containmentEmptied
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.sewerSystem != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Sewer System
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.sewerSystem?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.EaseYourselfWhere !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Ease Yourself Where
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.EaseYourselfWhere
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.DesiltingFrequency !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Desilting Frequency
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.LiquidWasteSection?.DesiltingFrequency
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.PremisesDrainType
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">Drain Type</label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesDrainType?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.DrainType?.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.PremisesEffluentManagement
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Effluent Management
                                                                                        </label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesEffluentManagement?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.EffluentManagement.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.PremisesExcretaContainment
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Excreta Containment
                                                                                        </label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesExcretaContainment.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.ExcretaContainment.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection
                                                                                    ?.PremisesExcretaDisposalMethod?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Excreta Disposal Method
                                                                                        </label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesExcretaDisposalMethod?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.ExcretaDisposalMethod.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.PremisesGreyWaterDisposal
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Grey Water Disposal
                                                                                        </label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesGreyWaterDisposal?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.GreyWaterDisposal.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.LiquidWasteSection?.PremisesToiletType
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Toilet Type
                                                                                        </label>
                                                                                        {data?.submittedData?.LiquidWasteSection?.PremisesToiletType?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x.ToiletType.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* end col */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">SOLID WASTE SECTION</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card product">
                                                                        <div className="card-body">
                                                                            <div className="row gy-3">
                                                                                {data?.submittedData?.SolidWasteSection
                                                                                    ?.wasteServiceProviderRegistration != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Service Provider Registration
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.wasteServiceProviderRegistration?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.wasteCollectorName !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Collector Name
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection?.wasteCollectorName
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.SolidWasteSection?.wasteSortingAvailability !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Sorting Availability
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.wasteSortingAvailability?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection
                                                                                    ?.approvedWasteStorageReceptacle != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Approved Waste Storage Receptacle
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.approvedWasteStorageReceptacle?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection
                                                                                    ?.adequateWasteStorageReceptacle != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Adequate Waste Storage Receptacle
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.adequateWasteStorageReceptacle?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.WasteCollectionType !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Collection Type
                                                                                        </label>

                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection?.WasteCollectionType
                                                                                                    .name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.PremisesWasteReceptacle
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Collection Receptacle
                                                                                        </label>
                                                                                        {data?.submittedData?.SolidWasteSection?.PremisesWasteReceptacle?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x?.SolidWasteReceptacle?.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.UnservicedWasteDisposal !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Unserviced Waste Disposal
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.UnservicedWasteDisposal?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.wastePaymentEvidence !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Payment Evidence
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection?.wastePaymentEvidence
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.ContainerVolume != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Container Volume
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection?.ContainerVolume?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.SolidWasteSection?.wasteProviderAccreditted !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Waste Provider Accreditted
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.SolidWasteSection
                                                                                                    ?.wasteProviderAccreditted?.name
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
                                                                {/* end col */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">
                                                                                    ACTIONS & CONCLUSION SECTION
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card product">
                                                                        <div className="card-body">
                                                                            <div className="row gy-3">
                                                                                {data?.submittedData?.ConclusionSection?.obnoxiousTradeExist !=
                                                                                    null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Obnoxious Trade Exist
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={
                                                                                                data?.submittedData?.ConclusionSection?.obnoxiousTradeExist
                                                                                                    ?.name
                                                                                            }
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.ConclusionSection?.PremisesNuisanceDetected
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Nuisance Observed
                                                                                        </label>
                                                                                        {data?.submittedData?.ConclusionSection?.PremisesNuisanceDetected?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x?.Nuisance?.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.ConclusionSection?.officerComment != null ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Office Comment
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control bg-light border-0"
                                                                                            id="invoicenoInput"
                                                                                            value={data?.submittedData?.ConclusionSection?.officerComment}
                                                                                            readOnly={true}
                                                                                        />
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                                {data?.submittedData?.ConclusionSection?.PremisesActionTaken
                                                                                    ?.length != 0 ? (
                                                                                    <div className="col-lg-3 col-sm-6">
                                                                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                            Action Taken
                                                                                        </label>
                                                                                        {data?.submittedData?.ConclusionSection?.PremisesActionTaken?.map(
                                                                                            (x: any) => (
                                                                                                <input
                                                                                                    key={x.id}
                                                                                                    type="text"
                                                                                                    className="form-control bg-light border-0"
                                                                                                    id="invoicenoInput"
                                                                                                    value={x?.Action?.name}
                                                                                                    readOnly={true}
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    <></>
                                                                                )}
                                                                            </div>
                                                                            <div className="col-lg-3 col-sm-6">
                                                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                    Reporting Officer
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control bg-light border-0"
                                                                                    id="invoicenoInput"
                                                                                    value={`${data?.submittedData?.User?.otherNames} ${data?.submittedData?.User?.surname}`}
                                                                                    readOnly={true}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {data?.InspectionPictures.map((ip) => {
     return <figure className="figure">
        <img
          src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip}`}
          className="figure-img img-fluid rounded"
          alt="..."
        />
        <figcaption className="figure-caption">
          A caption for the above image.
        </figcaption>
      </figure>
         })} */}
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">PICTURES</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row gallery-wrapper">
                                                                        {data?.submittedData?.InspectionPictures?.map((ip: any) => {
                                                                            return (
                                                                                <div
                                                                                    key={ip.id}
                                                                                    className="element-item col-xxl-3 col-xl-4 col-sm-6 project designing development"
                                                                                    data-category="designing development"
                                                                                >
                                                                                    <div className="gallery-box card">
                                                                                        <div className="gallery-container">
                                                                                            {/* <Link
                                                                                            className="image-popup"
                                                                                            href={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip.imagePath}`}
                                                                                            title=""
                                                                                        > */}
                                                                                            <Image
                                                                                                className="gallery-img img-fluid mx-auto"
                                                                                                src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${ip.imagePath}`}
                                                                                                alt=""
                                                                                                height="256"
                                                                                                width="256"
                                                                                            />
                                                                                            <div className="gallery-overlay">
                                                                                                <h5 className="overlay-caption">
                                                                                                    {ip.FormSectionImage.name}
                                                                                                </h5>
                                                                                            </div>
                                                                                            {/* </Link> */}
                                                                                        </div>

                                                                                        {/* <div className="box-content">
                                                                                        <div className="d-flex align-items-center mt-1">
                                                                                            <div className="flex-grow-1 text-muted">
                                                                                                <Link
                                                                                                    href=""
                                                                                                    className="text-body text-truncate"
                                                                                                >
                                                                                                    {ip.FormSectionImage.name}
                                                                                                </Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> */}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                                {inspectionPublishAllowed?
                                                                <div className="col-sm-auto">
                                                                    {data?.submittedData?.isPublished == 0 ? (
                                                                        <button
                                                                            className="btn btn-success"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();

                                                                                handlePublish(data?.submittedData?.id);
                                                                            }}
                                                                        >
                                                                            Publish
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();

                                                                                handlePublish(data?.submittedData?.id);
                                                                            }}
                                                                        >
                                                                            Unpublish
                                                                        </button>
                                                                    )}
                                                                </div>:<></>}
                                                                {inspectionDeletionAllowed?
                                                                <div className="col-sm-auto">
                                                                    {data?.submittedData?.isPublished == 0 ? (
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                openModal(e)
                                                                                // handleDelete(data?.submittedData?.id);
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    ) : (
                                                                        <></>
                                                                    )}
                                                                </div>:<></>}
                                                                <div className="col-sm-auto">
                                                                    {inspectionUpdatesAllowed?
                                                                    <Link
                                                                        className="btn btn-primary"
                                                                        href={{
                                                                            pathname: `/submitted-data/data-edit`,
                                                                            query: {
                                                                                id: data?.submittedData?.id,
                                                                                formId: formId,
                                                                                published: published,
                                                                            },
                                                                        }}
                                                                    >
                                                                        {/* <a className="btn btn-primary">
                                                                            <i className="ri-edit-fill align-bottom me-2 text-muted" />{" "} */}
                                                                        Edit
                                                                        {/* </a> */}
                                                                    </Link>:<></>}
                                                                </div>
                                                                {/* <div className="col-sm-auto">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();

                          handleEdit(data?.id);
                        }}
                      >
                        Edit
                      </button>
                   
                  </div> */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </main >
    )
}
