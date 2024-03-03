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
import { services } from '../../prisma/seeds/services';
export const Charges = ({ data }: any) => {
    const [id, setId] = useState(null);
    const [icesspoolCommission, setIcesspoolCommission] = useState("");
    const [platformCharges, setPlatformCharges] = useState("");
    const [paymentCharges, setPaymentCharges] = useState("");
    const [serviceArea, setServiceArea] = useState("");
    const [service, setService] = useState("");



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
            if (icesspoolCommission == "" || platformCharges == "" || paymentCharges == "") {
                return toast.error("Please fill form");
            }

            let data = {
                icesspoolCommission, platformCharges, paymentCharges,serviceArea,service
            };
            const response = await axios.post("/api/config/charges", data);
            toast.success("Fine added");

            router.refresh()

        } catch (error: any) {
            toast.error("An error occured")
        }
    };

    // const update = async (e: any) => {
    //     try {
    //         e.preventDefault();
    //         if (fine == "" ) {
    //             return toast.error("Please fill form");
    //         }

    //         let data = {
    //             id:Number(id),
    //             fine,
    //         };
    //         const response = await axios.post("/api/penalty", data);
    //         toast.success(response.data.message);


    //         router.refresh()

    //     } catch (error: any) {
    //         if (error.response.status == 401) {
    //             toast.error(error.response.data.message);
    //         }
    //     }
    // };




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

                                                <button
                                                    className="btn btn-primary"
                                                    onClick={async (e) => {
                                                        add(e)
                                                    }}

                                                >
                                                    Submit
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}
