'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname, redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRef, useState } from 'react';

import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/config";
import ReactPaginate from "react-paginate";
import Image from 'next/image'
import moment from "moment";
import Link from "next/link";
import Modal from "react-modal";
import { useCallback } from 'react';





export default function SanitationReport({ data }: any) {


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()



    const [reportId, setReportId] = useState(null);
    const [description, setDescription] = useState("");
    const [reportStatus, setReportStatus] = useState("");

    const [statusMessage, setStatusMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [imagePath, setImagePath] = useState("");

    const [sendSMS, setSendSMS] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("")

    const searchTextRef: any = useRef(null);
    const filterRef: any = useRef(null);


    // const { data: session } = useSession()


    const searchParams = useSearchParams()

    const searchtext = searchParams.get('searchText')
    const page = searchParams.get('page');


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




    const handlePagination = (page: any) => {

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchtext}`

        );
    };

   

    const handleExportAll = useCallback(async () => {
        try {
            let searchText = searchParams.get('searchText')
            const response = await axios.get(
                `/api/sanitation-report/export?searchText=${searchText}`
            );




            if (response.status == 200) {
                router.push(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleSearch = () => {
        try {
            let _searchText: any = searchTextRef?.current?.value
            let status: any = filterRef?.current?.value


            router.push(
                `${pathname}?searchText=${_searchText}&status=${status}&page=${page}`

            );

        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusUpdate = async (id: any) => {

        try {
            if (reportStatus == "") {
                return toast.error("Report status cannot be empty");
            }

            const response = await axios.put(`/api/sanitation-report`, {
                reportId: Number(reportId),
                reportStatus,
                statusMessage,
                sendSMS,
                phoneNumber
            });

            if (response.status == 200) {
                setShowForm(false)
                router.refresh()

                // router.push(
                //     `/submitted-data?published=${published}&formId=${formId}`
                // );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (e: any) => {
        e.preventDefault()

        console.log();

        try {
            const response = await axios.delete(`/api/sanitation-report/${reportId}`);

            if (response.status == 200) {
                // router.push(
                //     `/submitted-data?published=${published}&formId=${formId}`
                // );
                router.refresh()
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
                            You are about to delete this report.<br /> Deleted report cannot be recovered.
                            Click OK to proceed to delete or Cancel to dismiss
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-grid">
                                <button
                                    onClick={(e) => {
                                        handleDelete(e);
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
            <div className="pagetitle">
                <h1>REPORTS</h1>
                {showForm ?
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <Image
                                        className="gallery-img img-fluid mx-auto"
                                        src={`https://esicapps-images.s3.eu-west-2.amazonaws.com/${imagePath}`}
                                        alt=""
                                        height="256"
                                        width="256"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Update Report</h5>
                                    <div className=" mb-3">

                                        <div className="col-sm-12">

                                            <div className="alert alert-warning  fade show" role="alert">
                                                <h4 className="alert-heading">Report</h4>
                                                <p> {description}</p>

                                            </div>

                                        </div>
                                    </div>
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Update status *
                                        </label>
                                        <select
                                            className="form-control"
                                            aria-label="Default select example"
                                            onChange={(e: any) => {
                                                setReportStatus(e.target.value);
                                            }}
                                            value={reportStatus}
                                        >
                                            <option >Select status * </option>
                                            <option key={1} value={1}>
                                                Completed
                                            </option>
                                            <option key={2} value={2}>
                                                In progress
                                            </option>
                                        </select>
                                    </div>


                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Status Message
                                        </label>
                                        <div className="col-sm-12">
                                            <textarea className="form-control" style={{ height: 100 }} value={statusMessage} onChange={(e: any) => {
                                                setStatusMessage(e.target.value);
                                            }}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="gridCheck1" defaultChecked={sendSMS} onChange={(e) => {
                                            setSendSMS(!sendSMS)


                                        }} />
                                        <label className="form-check-label" htmlFor="gridCheck1">
                                            Send SMS to reporter
                                        </label>
                                    </div>
                                    <div className=" mb-3">
                                        <div className="col-sm-10">


                                            <div className=" mb-3">
                                                <div className="col-sm-10">


                                                    <button type="submit" className="btn btn-success" onClick={(e) => handleStatusUpdate(e)}>
                                                        Update
                                                    </button>   <button
                                                        className="btn btn-danger"
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            setShowForm(false);




                                                        }}
                                                    >
                                                        Cancel
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    : <></>
                }
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <form className="row g-3">
                                    {/* <div className="col-md-2">
                                <input type="text" className="form-control" placeholder="City" />
                            </div> */}
                                    <div className="col-md-2">
                                        <select ref={filterRef}
                                            id="filterRef"
                                            name="filterRef" className="form-select input-group" >
                                            <option value="" selected>
                                                Filter by{" "}
                                            </option>
                                            <option value="">
                                                All
                                            </option>
                                            <option value="1">
                                                Completed
                                            </option>
                                            <option value="2">
                                                In Progress
                                            </option>
                                            <option value="0">
                                                Pending
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder='Enter search term' ref={searchTextRef}
                                                id="searchText"
                                                name="searchText" />
                                            <span className="input-group-text" id="basic-addon2">  <button type="button" onClick={handleSearch} className="btn btn-sm btn-primary btn-label waves-effect right waves-light form-control"><i className="bi bi-search"></i></button></span>
                                        </div>

                                    </div>

                                    <div className="col-md-4">
                                        <div className="input-group mb-3">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success  "
                                                onClick={ handleExportAll}
                                            >
                                                <i className="ri-file-excel-2-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
                                                Export as excel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body">
                                {/* <h5 className="card-title">Reports</h5> */}
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Reported by</th>

                                            <th scope="col">District</th>

                                            <th scope="col">Location</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Reported at</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.reports?.response?.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.SanitationReportUser.phoneNumber}</td>
                                                    <td>{data?.District.name}</td>
                                                    <td>{data?.community}</td>
                                                    {/* <td>{data?.description}</td> */}
                                                    <td>{data?.status == 0 ? <span className="badge bg-danger">Pending</span> : data?.status == 1 ? <span className="badge bg-success">Completd</span> : <span className="badge bg-warning">In progress</span>}</td>
                                                    <td>   {moment(data?.createdAt).format(
                                                        "MMM Do YYYY, h:mm:ss a"
                                                    )}</td>

                                                    <td>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Button group with nested dropdown"
                                                        >
                                                            <div className="btn-group" role="group">
                                                                <button
                                                                    id="btnGroupDrop1"
                                                                    type="button"
                                                                    className="btn btn-success dropdown-toggle"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    Actions
                                                                </button>
                                                                <ul
                                                                    className="dropdown-menu"
                                                                    aria-labelledby="btnGroupDrop1"
                                                                >
                                                                    <li>

                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setDescription(data?.description)
                                                                                setImagePath(data?.image)

                                                                                setReportId(data.id);
                                                                                setPhoneNumber(data?.SanitationReportUser?.phoneNumber)
                                                                                setShowForm(true)



                                                                            }}
                                                                        >
                                                                            View & Update status
                                                                        </button>
                                                                    </li>
                                                                    <li>

                                                                        <Link
                                                                            className="dropdown-item btn btn-sm "
                                                                            href={{
                                                                                pathname: `http://www.google.com/maps/place/${data?.latitude},${data?.longitude}`,
                                                                                query: {},
                                                                            }}
                                                                            passHref
                                                                        >

                                                                            <span data-bs-toggle="tooltip" data-bs-placement="top" title={data?.latitude + "," + data?.longitude}>View on map</span>
                                                                            {/* {dt?.BasicInfoSection?.latitude},{dt?.BasicInfoSection?.longitude} */}
                                                                            <i className="ri-external-link-line align-bottom me-2 text-success" />
                                                                            {/* </a> */}
                                                                        </Link>

                                                                    </li>
                                                                    <li>

                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setReportId(data?.id);

                                                                                openModal(e)


                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </td>
                                                </tr>
                                            );
                                        })}

                                    </tbody>
                                </table>
                                <ReactPaginate
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    initialPage={data.reports?.curPage - 1}
                                    pageCount={data.reports?.maxPage}
                                    onPageChange={handlePagination}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}
