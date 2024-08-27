"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

export const MakeToiletTruckRequest = ({ data }: any) => {



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


    const [id, setId] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerLat, setCustomerLat] = useState("");
    const [customerLng, setCustomerLng] = useState("");
    const [truck, setTruck] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");

    const [pricing, setPricing] = useState([]);
    const [scheduleDate, setScheduleDate] = useState("");
    const [tripsNumber, setTripsNumber] = useState("1");
    const [timeFrame, setTimeFrame] = useState("");

    const [serviceArea, setServiceArea] = useState("");

    const [status, setStatus] = useState("Get Prices");



    const handlePagination = (page: any) => {
        let searchText = searchParams.get('searchText')

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchText}`

        );
    };


    function closeDeleteModal() {
        setDeleteTxModalIsOpen(false);
    }
    const getPricing = async () => {
        try {
            if (customerLat == "") {
                return toast.error("Please enter the customer's latitude.");
            }

            if (customerLng == "") {
                return toast.error("Please enter the customer's longitude.");
            }

            if (customerName == "") {
                return toast.error("Please enter the customer's name.");
            }

            if (location == "") {
                return toast.error("Please enter the location.");
            }

            if (phoneNumber == "") {
                return toast.error("Please enter the customer's phone number.");
            }

            if (serviceArea == "") {
                return toast.error("Please select a service area.");
            }


            if (scheduleDate == "") {
                return toast.error("Please select a date.");
            }

            if (timeFrame == "") {
                return toast.error("Please select a time frame.");
            }
            setPricing([])
            setStatus("Getting prices...");
            const response = await axios.get(`/api/pricing/toilet-truck-service/price?userLatitude=${customerLat}&userLongitude=${customerLng}&tripsNumber=${tripsNumber}&serviceArea=${serviceArea}`);
            setStatus("Get Prices");




            if (response.data.length != 0) {
                if (response.data[0].price == "Infinity") {
                    return toast.error("The distance from the tip off point to the request is too far.\nPlease check lat/lng and service area")
                }
                setPricing(response.data)
                return toast.success("Pricing available");


            }
            return toast.error("An error occurred while getting prices.\nTry again")

        } catch (error) {
            setStatus("Get Prices");
            return toast.error("An error occurred while getting prices.\nTry again")
        }

    }

    const sendRequest = async (e: any) => {
        try {
            e.preventDefault();
            if (customerLat == "") {
                return toast.error("Please enter the customer's latitude.");
            }

            if (customerLng == "") {
                return toast.error("Please enter the customer's longitude.");
            }

            if (customerName == "") {
                return toast.error("Please enter the customer's name.");
            }

            if (location == "") {
                return toast.error("Please enter the location.");
            }

            if (phoneNumber == "") {
                return toast.error("Please enter the customer's phone number.");
            }

            if (serviceArea == "") {
                return toast.error("Please select a service area.");
            }


            if (scheduleDate == "") {
                return toast.error("Please select a date.");
            }

            if (timeFrame == "") {
                return toast.error("Please select a time frame.");
            }
            if (pricing.length == 0) {
                return toast.error("Please select a pricing option.");
            }

            let data = {
                customerName: customerName,
                customerLat: Number(customerLat),
                customerLng: Number(customerLng),
                truck: Number(truck),
                price: Number(price),
                phoneNumber: phoneNumber,
                serviceArea: serviceArea,
                location: location,
                timeFrame: timeFrame,
                scheduledDate: scheduleDate,
            };
            console.log(data);


            const response = await axios.post("/api/web-request/toilet-truck", data);
            toast.success(response.data.message);
            // setId("")
            setCustomerLat("");
            setCustomerLng("");
            setCustomerName("");
            setPhoneNumber("");
            setTruck("");
            setPrice("");


            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
        }
    };

    const update = async (e: any) => {
        let response
        try {
            e.preventDefault();
            // if (name == "" || status == "" || latitude == null || longitude == null || address == "" || service == null || status == null) {
            //     return toast.error("Please fill form");
            // }

            let data = {
                id: Number(id),
                customerName: customerName,
                customerLat: Number(customerLat),
                customerLng: Number(customerLng),
                truck: Number(truck),
                price: Number(price),
                phoneNumber: phoneNumber
            };


            response = await axios.put("/api/pricing/water", data);
            toast.success(response.data.message);
            setId("")
            setId("")
            setCustomerLat("");
            setCustomerLng("");
            setCustomerName("");
            setPhoneNumber("");
            setTruck("");
            setPrice("");

            router.refresh()

        } catch (error: any) {
            console.log(error.response);

            // if (error.response.status == 401) {
            //     toast.error(error.response.data.message);
            // }
        }
    };
    function afterOpenDeleteModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = "#f00";
    }


    const handleDeleteTx = async (e: any) => {
        e.preventDefault();
        try {
            let data = {
                id: id,

            };

            const response = await axios.put("/api/web-request/toilet-truck", data);


            if (response.data.status) {
                toast.success("Transaction closed");
                setId("")


            }

            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
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
                <h1>TOILET TRUCK REQUEST</h1>
                <Modal
                    isOpen={deleteTxModalIsOpen}
                    onAfterOpen={afterOpenDeleteModal}
                    onRequestClose={closeDeleteModal}
                    style={customStyles}
                    contentLabel="Confirm deletion"
                >
                    <div className="alert alert-outline-danger alert-p" role="alert">
                        <span className="alert-content">
                            You are about to delete this transaction.<br />Deleted transaction cannot be recovered.
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

            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add</h5>


                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Customer name *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control" value={customerName} onChange={(e: any) => setCustomerName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Phone Number *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="tel" className="form-control" value={phoneNumber} onChange={(e: any) => setPhoneNumber(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Location *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="text" className="form-control" value={location} onChange={(e: any) => setLocation(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Number of trips *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" disabled className="form-control" placeholder=' Enter number of trips' value={tripsNumber} onChange={(e: any) => setTripsNumber(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-3  mb-3">
                                        <label className="col-sm-12 col-form-label">Select service area</label>

                                        <div className="col-sm-12">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setServiceArea(e.target.value)
                                                }}
                                                value={serviceArea}
                                            >
                                                <option >Select service area</option>

                                                {data?.serviceAreas?.response?.map((ul: any) => {
                                                    return (
                                                        <option key={ul.id} value={ul.id}>{ul.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Enter latitude *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Eg. 9.442' value={customerLat} onChange={(e: any) => setCustomerLat(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Enter longitude *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Eg. -0.7489082' value={customerLng} onChange={(e: any) => setCustomerLng(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Select schedule date *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="date" className="form-control" placeholder='Eg. -0.7489082' value={scheduleDate} onChange={(e: any) => setScheduleDate(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-lg-3  mb-3">
                                        <label className="col-sm-12 col-form-label">Select schedule date</label>

                                        <div className="col-sm-12">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setTimeFrame(e.target.value)
                                                }}
                                                value={timeFrame}
                                            >
                                                <option >Select schedule</option>

                                                {data?.timeFrames?.map((tf: any) => {
                                                    return (
                                                        <option key={tf.id} value={tf.id}>{tf.time_schedule}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                .
                                            </label>
                                            <button type="button" className="form-control btn btn-outline-success" onClick={async (e: any) => {
                                                if (customerLat != "" && customerLng != "") {
                                                    return await getPricing()
                                                }
                                                return toast.error("Enter lat and lng of customer first")
                                            }}>  {status}</button>
                                        </div>
                                    </div>
                                    {pricing.length > 0 ?
                                        <div className="col-lg-3">

                                            <div className="mb-3">
                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                    Select Truck/Pricing *
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    onChange={(e: any) => {
                                                        const [price, id] = e.target.value.split("-");
                                                        setPrice(price);
                                                        setTruck(id);
                                                    }}
                                                    value={`${truck ? `${price}-${truck}` : ''}`}
                                                >
                                                    <option value={""}>Select truck *</option>

                                                    {pricing?.map((data: any) => (
                                                        <option key={data.id} value={`${data.price}-${data.id}`}>
                                                            {data.name}{" - GHS "}{data.price}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div> : <></>}
                                </div>

                                <div className="text-right">


                                    <button
                                        className="btn btn-primary"
                                        onClick={async (e) => {
                                            // if (id) {
                                            //     return update(e)
                                            // }
                                            sendRequest(e)

                                        }}

                                    >
                                        Submit
                                    </button>

                                    {" "}

                                    <button
                                        className="btn btn-danger"
                                        onClick={async (e) => {

                                            setId("")
                                            setCustomerLat("");
                                            setCustomerLng("");
                                            setCustomerName("");
                                            setPhoneNumber("");
                                            setTruck("");
                                            setPrice("");


                                        }}

                                    >
                                        Clear Form
                                    </button>



                                </div>

                            </div>
                        </div>
                    </div>

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
                                                        <span className="badge bg-danger">{data?.TxStatus?.name}</span>
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

                                                                                // viewTx()
                                                                            }}
                                                                        >
                                                                            View Tx
                                                                        </button>
                                                                    </li>


                                                                    {data.currentStatus == 3 || data.currentStatus == 4 ?
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
                                                                        </li> : <></>}
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
