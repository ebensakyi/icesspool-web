// @ts-nocheck
'use client'
import axios from 'axios';
import Link from 'next/link';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { LOGIN_URL } from '@/config';
import Modal from "react-modal";

export default function FollowUpView({ data }: any) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    let userSession: any = session;


    let inspectionDeletionAllowed: any = userSession?.user?.UserRole?.inspectionDeletionAllowed
    let inspectionPublishAllowed: any = userSession?.user?.UserRole?.inspectionPublishAllowed
    let inspectionUpdatesAllowed: any = userSession?.user?.UserRole?.inspectionUpdatesAllowed


    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(e: any) {
        e.preventDefault();
        setIsOpen(true);
    }

   

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
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
                <h1>  FOLLOW-UP  DATA VIEW</h1>
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
                                You are about to delete this inspection.<br /> Deleted inspection cannot be recovered.
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
                                                        {/* <div className="page-title-right">
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
                                                        </div> */}
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="row mb-3">
                                                                <div className="col-xl-12">
                                                                    {/* <div className="row align-items-center gy-3 mb-3">
                                                                        <div className="col-sm">
                                                                            <div>
                                                                                <h5 className="fs-14 mb-0">
                                                                                    BASIC INFORMATION SECTION
                                                                                </h5>
                                                                            </div>
                                                                        </div>

                                                                    </div> */}
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
                                                                                                data?.submittedData?.District
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
                                                                                                data?.submittedData?.District != null
                                                                                                    ? data?.submittedData?.District
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
                                                                                        value={data?.submittedData?.Community?.name}
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>

                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                        Name of respondent
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={data?.submittedData?.respondentName}
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                       Water Rating
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.waterRating
                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>{" "}
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                    Solid Waste Rating
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.solidWasteRating

                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                    Liquid Waste Rating
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.liquidWasteRating

                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>

                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                    Obnoxious Trade
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.obnoxiousTrade

                                                                                        }
                                                                                        readOnly={true}
                                                                                    /></div>

                                                                                </div>
                                                                                <div className="col-lg-3 col-sm-6">
                                                                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                                                   Officer Comment
                                                                                    </label>
                                                                                    <div className="col-sm-12"> <input
                                                                                        type="text"
                                                                                        className="form-control bg-light border-0"
                                                                                        id="invoicenoInput"
                                                                                        value={
                                                                                            data?.submittedData?.officerComment

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
                                                                {/* {inspectionPublishAllowed ?
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
                                                                    </div> : <></>} */}
                                                                {inspectionDeletionAllowed ?
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
                                                                    </div> : <></>}
                                                                {/* <div className="col-sm-auto">
                                                                    {inspectionUpdatesAllowed ?
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
                                                                         
                                                                            Edit
                                                                        </Link> : <></>}
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
