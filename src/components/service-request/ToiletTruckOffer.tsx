"use client"
import { LOGIN_URL } from '@/config';
// import { signal } from '@preact/signals';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import ReactPaginate from 'react-paginate';

export const ToiletTruckOffer = ({ data }: any) => {



    const [id, setId] = useState(null);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const page = searchParams.get('page');

    const [deleteTxModalIsOpen, setDeleteTxModalIsOpen] = useState(false);
    const [closeTxModalIsOpen, setCloseTxModalIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const url = `${pathname}/?searchText=${searchText}&page=${page}`;
        router.push(url);

    }, [searchText]);

    function openDeleteTxModal(e: any) {
        e.preventDefault();
        setDeleteTxModalIsOpen(true);
    }

    function afterOpenDeleteModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }

    function closeDeleteModal() {
        setDeleteTxModalIsOpen(false);
    }

    const handlePagination = (page: any) => {
        let searchText = searchParams.get('searchText')

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchText}`

        );
    };

    function openCloseTxModal(e: any) {
        e.preventDefault();
        setCloseTxModalIsOpen(true);
    }

    function afterOpenCloseTxModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }

    function closeCloseTxModal() {
        setCloseTxModalIsOpen(false);
    }

    const handleCloseTx = async (e: any) => {
        e.preventDefault();
        try {
            let data = {
                id: id,

            };

            const response = await axios.put("/api/service-request/toilet-truck/close-transaction/admin", data);


            if (response.data.status) {
                toast.success("Transaction closed");
                setId(null)


            }

            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
        }
    };


    const handleDeleteTx = async (e: any) => {
        e.preventDefault();
        try {
            let data = {
                id: id,

            };

            const response = await axios.put("/api/service-request/toilet-truck/delete-transaction/admin", data);


            if (response.data.status) {
                toast.success("Transaction closed");
                setId(null)


            }

            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
        }
    };

    // const handleCloseTx = async (e: any) => {
    //     e.preventDefault();
    //     try {
    //         let data = {
    //             id: id,

    //         };

    //         const response = await axios.put("/api/service-request/biodigester/delete-transaction/admin", data);


    //         if (response.data.status) {
    //             toast.success("Transaction closed");
    //             setId(null)


    //         }

    //         router.refresh()

    //     } catch (error: any) {
    //         if (error.response.status == 401) {
    //             toast.error(error.response.data.message);
    //         }
    //     }
    // };
    const viewTx = async () => {
        throw new Error('Function not implemented.');
    }

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
                <h1>TOILET TRUCK OFFERS</h1>

                <Modal
                    isOpen={deleteTxModalIsOpen}
                    onAfterOpen={afterOpenDeleteModal}
                    onRequestClose={closeDeleteModal}
                    style={customStyles}
                    contentLabel="Confirm deletion"
                >
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
                                    onClick={(e: any) => {
                                        handleDeleteTx(e);
                                        closeDeleteModal();
                                    }}
                                    className="btn btn-success"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-grid">
                                <button onClick={closeDeleteModal} className="btn btn-danger">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={closeTxModalIsOpen}
                    onAfterOpen={afterOpenCloseTxModal}
                    onRequestClose={closeCloseTxModal}
                    style={customStyles}
                    contentLabel="Confirm deletion"
                >
                    <div className="alert alert-outline-danger alert-p" role="alert">
                        <span className="alert-content">
                            You are about to close this offer.<br />Closed offer cannot be recovered.
                            Click OK to close or Cancel to dismiss
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-grid">
                                <button
                                    onClick={(e: any) => {
                                        handleCloseTx(e);
                                        closeCloseTxModal();
                                    }}
                                    className="btn btn-success"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-grid">
                                <button onClick={closeCloseTxModal} className="btn btn-danger">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">Forms</li>
                <li className="breadcrumb-item active">Elements</li>
            </ol>
        </nav> */}
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List</h5>
                                <div className="col-sm-3  mb-3">

                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Search here' value={searchText}
                                            onChange={(e: any) => {
                                                setSearchText(e.target.value);
                                            }} />
                                    </div>
                                </div>
                                <table className="table table-bordered">

                                    <thead>
                                        <tr>
                                            <th scope="col">Tx.Id</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Provider Name</th>
                                            <th scope="col">Area</th>
                                            <th scope="col">Cost</th>

                                            <th scope="col">Current Status</th>

                                            {/* <th scope="col">Offer Details</th> */}
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.offers?.response?.map((data: any) => {

                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.id}</td>
                                                    <td>{data?.Customer?.firstName} {data?.Customer?.lastName}</td>
                                                    <td>{data?.ServiceProvider?.firstName} {data?.ServiceProvider?.lastName}</td>
                                                    <td>{data?.ServiceArea?.name}</td>
                                                    <td>GHS {data?.discountedCost} </td>

                                                    <td>{data?.currentStatus == 1 ? (
                                                        <span className="badge bg-primary">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 2 ? (
                                                        <span className="badge bg-success">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 3 ? (
                                                        <span className="badge bg-success">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 4 ? (
                                                        <span className="badge bg-danger">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 5 ? (
                                                        <span className="badge bg-warning">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 6 ? (
                                                        <span className="badge bg-info">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 7 ? (
                                                        <span className="badge bg-light text-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 8 ? (
                                                        <span className="badge bg-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 9 ? (
                                                        <span className="badge bg-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 10 ? (
                                                        <span className="badge bg-success">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 40 ? (
                                                        <span className="badge bg-white text-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 41 ? (
                                                        <span className="badge bg-white text-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 50 ? (
                                                        <span className="badge bg-white text-dark">{data?.TxStatus?.name}</span>
                                                    ) : data?.currentStatus == 51 ? (
                                                        <span className="badge bg-white text-dark">{data?.TxStatus?.name}</span>
                                                    ) : (
                                                        <span className="badge bg-secondary">{data?.TxStatus?.name}</span>
                                                    )}
                                                    </td>
                                                    {/* <td>{data?.BiodigesterTransaction.name}</td> */}

                                                    <td>  {moment(data?.createdAt).format(
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
                                                                                setId(data.id);

                                                                                viewTx()
                                                                            }}
                                                                        >
                                                                            View Tx
                                                                        </button>
                                                                    </li>
                                                                    {/* {data?.currentStatus == 4 || data.currentStatus == 5?  <li>

                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setId(data.id);
                                                                                setCloseTxModalIsOpen(true);
                                                                                // closeTx()

                                                                            }}
                                                                        >
                                                                            Close Tx
                                                                        </button>
                                                                    </li>:<></>} */}

                                                                    <li>

                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setId(data.id);
                                                                                setCloseTxModalIsOpen(true);
                                                                                // closeTx()

                                                                            }}
                                                                        >
                                                                            Close Tx
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setId(data.id);
                                                                                setDeleteTxModalIsOpen(true);
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
                                    initialPage={data?.offers?.curPage - 1}
                                    pageCount={data?.offers?.maxPage}
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
