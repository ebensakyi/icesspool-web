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
export const Penalty = ({ data }: any) => {
    const [id, setId] = useState(null);
    const [fine, setFine] = useState("");

    

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
      
          setFine(data?.penalty);
     
      },[data.penalty]);



    const add = async (e: any) => {
        try {
            e.preventDefault();
            if (fine == "") {
                return toast.error("Please fill form");
            }

            let data = {
                fine,
            };
            const response = await axios.post("/api/configure/penalty", data);
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
                <h1>PENALTY</h1>
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
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Add</h5>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Fine *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter fine' value={fine} onChange={(e: any) => setFine(e.target.value)} />
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
