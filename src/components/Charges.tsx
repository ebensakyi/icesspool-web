"use client"
import { LOGIN_URL } from '@/config';
// import { signal } from '@preact/signals';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ServiceCharges = ({ data }: any) => {
    const [id, setId] = useState(null);
    const [icesspoolCommission, setIcesspoolCommission] = useState("");
    const [platformCharges, setPlatformCharges] = useState("");
    const [paymentCharges, setPaymentCharges] = useState("");
    const [serviceArea, setServiceArea] = useState("");
    const [service, setService] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()



    const add = async (e: any) => {
        try {
            e.preventDefault();
            if (icesspoolCommission == "" || platformCharges == "" || paymentCharges == ""|| serviceArea == ""||service=="") {
                return toast.error("Please fill form");
            }

            let data = {
                icesspoolCommission, platformCharges, paymentCharges, serviceArea, service
            };
            const response = await axios.post("/api/configure/service-charges", data);
            setIcesspoolCommission("")
            setPaymentCharges("")
            setPlatformCharges("")
            setServiceArea("")
            setService("")
            setId(null)
            setIsEditing(false)
            toast.success("Commission and charges added");

            router.refresh()

        } catch (error: any) {
            toast.error("An error occured")
        }
    };

    const update = async (e: any) => {
        try {
            e.preventDefault();
            if (icesspoolCommission == "" || platformCharges == "" || paymentCharges == ""|| serviceArea == ""||service=="") {
                return toast.error("Please fill form");
            }

            let data = {
                id, icesspoolCommission, platformCharges, paymentCharges, serviceArea, service
            };
            const response = await axios.put("/api/configure/service-charges", data);
            setIcesspoolCommission("")
            setPaymentCharges("")
            setPlatformCharges("")
            setServiceArea("")
            setService("")
            setId(null)
            setIsEditing(false)
            toast.success("Commission and charges updated");

            router.refresh()

        } catch (error: any) {
            toast.error("An error occured")
        }
    };
   



    return (
        <main id="main" className="main">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="pagetitle">
                <h1>COMMISSION & CHARGES</h1>
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
                                <h5 className="card-title">Add</h5>
                                <div className="row">
                                    <div className="col-lg-2">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                ICESSPOOL Commission *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter commision(%)' value={icesspoolCommission} onChange={(e: any) => setIcesspoolCommission(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Platform Charges *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter platform charges(%)' value={platformCharges} onChange={(e: any) => setPlatformCharges(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Payment Charges *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter payment charges(%)' value={paymentCharges} onChange={(e: any) => setPaymentCharges(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-4">

                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Service Area *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setServiceArea(e.target.value);
                                                }}
                                                value={serviceArea}
                                            >
                                                <option value={""}>Select area * </option>

                                                {data?.serviceAreas?.response?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-4">

                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Service *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setService(e.target.value);
                                                }}
                                                value={service}
                                            >
                                                <option value={""}>Select service * </option>

                                                {data?.services?.response?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className=" mb-3">
                                    <div className="col-sm-10">


                                        <div className=" mb-3">
                                            <div className="col-sm-10">
                                                {isEditing ?
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={async (e) => {
                                                            update(e)
                                                        }}

                                                    >
                                                        Update
                                                    </button> : <button
                                                        className="btn btn-primary"
                                                        onClick={async (e) => {
                                                            add(e)
                                                        }}

                                                    >
                                                        Submit
                                                    </button>}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Icesspool Commission</th>
                                            <th scope="col">Platform Charges</th>
                                            <th scope="col">Payment Charges</th>

                                            <th scope="col">Service Area</th>
                                            <th scope="col">Service</th>

                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.serviceCharges?.response.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.icesspoolCommission}</td>
                                                    <td>{data?.platformCommission}</td>
                                                    <td>{data?.paymentCharges}</td>
                                                    <td>{data?.Service?.name}</td>
                                                    <td>{data?.ServiceArea?.name}</td>

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
                                                                                setIcesspoolCommission(data.icesspoolCommission)
                                                                                setPaymentCharges(data.paymentCharges)
                                                                                setPlatformCharges(data.platformCommission)

                                                                                setService(data.serviceId)
                                                                                setServiceArea(data.serviceAreaId);



                                                                                setIsEditing(true);

                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </li>

                                                                    <li>
                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();

                                                                                // _delete(data.id);
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
