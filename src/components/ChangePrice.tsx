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
export const ChangePrice = ({ data }: any) => {
    const [id, setId] = useState(null);
    const [newAmount, setNewAmount] = useState("")
    const [transactionId, setTransactionId] = useState("")


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()





    const update = async (e: any) => {
        try {
            e.preventDefault();
            if (transactionId == "" || newAmount == "") {
                return toast.error("Please fill form");
            }

            let data = {
                newAmount, transactionId
            };
            const response = await axios.put("/api/service-request/change-price", data);
            toast.success("Amount update");
            setNewAmount("")
            setTransactionId("");

            router.refresh()

        } catch (error: any) {
            toast.error("Amount no updated. Check transaction id")
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
                <h1>CHANGE PRICE(TESTING ONLY)</h1>
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
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add</h5>
                                <div className="row">
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Enter Transaction Id *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Enter transactionid' value={transactionId} onChange={(e: any) => setTransactionId(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Enter new amount *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter new amount' value={newAmount} onChange={(e: any) => setNewAmount(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className=" mb-3">
                                        <div className="col-sm-10">


                                            <div className=" mb-3">
                                                <div className="col-sm-10">

                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={async (e) => {
                                                            update(e)
                                                        }}

                                                    >
                                                        Update Amount
                                                    </button>

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
        </main>
    )
}
