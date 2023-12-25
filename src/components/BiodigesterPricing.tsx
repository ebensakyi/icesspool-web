"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const BiodigesterPricing = ({ data }: any) => {


    const [id, setId] = useState("");
    const [biodigesterService, setBiodigesterService] = useState("");
    const [cost, setCost] = useState("");
    const [serviceArea, setServiceArea] = useState("");
    const [status, setStatus] = useState("");

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
            // if (name == "" || status == "") {
            //     return toast.error("Please fill form");
            // }

            let data = {
                biodigesterService: Number(biodigesterService),
                cost: Number(cost),
                serviceArea: Number(serviceArea),
                status: Number(status),
            };
            const response = await axios.post("/api/pricing/biodigester", data);
            toast.success(response.data.message);
            setId("")
            setBiodigesterService("")
            setCost("");

            setServiceArea("");
            setStatus("");


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
                biodigesterService: Number(biodigesterService),
                cost: Number(cost),
                serviceArea: Number(serviceArea),
                status: Number(status),
            };


            response = await axios.put("/api/pricing/emptying", data);
            toast.success(response.data.message);
            setId("")
            setBiodigesterService("")
            setCost("");

            setServiceArea("");
            setStatus("");
            router.refresh()

        } catch (error: any) {
            console.log(error.response);

            // if (error.response.status == 401) {
            //     toast.error(error.response.data.message);
            // }
        }
    };




    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>BIODIGESTER PRICING</h1>
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
                                {/* <div className="row">
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Name *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Name *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Name *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-lg-3 col-md-4">

                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Biodigester Service *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setBiodigesterService(e.target.value);
                                                }}
                                                value={biodigesterService}
                                            >
                                                <option value={""}>Select service * </option>

                                                {data?.biodigesterServices?.response?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4">
                                            <div className=" mb-3">
                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                    Cost *
                                                </label>
                                                <div className="col-sm-12">
                                                    <input type="number" className="form-control" placeholder='Enter cost' value={cost} onChange={(e: any) => setCost(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4">

                                            <div className=" mb-3">
                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                    Status *
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    onChange={(e: any) => {
                                                        setStatus(e.target.value);
                                                    }}
                                                    value={status}
                                                >
                                                    <option value={""}>Select status * </option>
                                                    <option value={1}>Active </option>
                                                    <option value={2}>Inactive </option>


                                                </select>
                                            </div>
                                        </div>


                                        <div className="col-lg-3 col-md-4">

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
                                        <div className="text-right">


                                            <button
                                                className="btn btn-primary"
                                                onClick={async (e) => {
                                                    if (id) {
                                                        return update(e)
                                                    }
                                                    add(e)

                                                }}

                                            >
                                                Submit
                                            </button>

                                            {" "}

                                            <button
                                                className="btn btn-danger"
                                                onClick={async (e) => {

                                                    setId("")

                                                    setServiceArea("");
                                                    setBiodigesterService("");
                                                    setStatus("");
                                                    setCost("");



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
                                    <div className="card-body" style={{
                                        "display": "block",
                                        "overflowX": "auto",
                                        "whiteSpace": "nowrap"
                                    }}>
                                        <h5 className="card-title">List</h5>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Area</th>
                                                    <th scope="col">Service</th>

                                                    <th scope="col">Cost</th>

                                                    <th scope="col">Status</th>
                                                    <th scope="col">Created Date</th>

                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.pricing?.response.map((data: any) => {
                                                    return (
                                                        <tr key={data?.id}>
                                                            <td>{data?.ServiceArea?.name}</td>


                                                            <td>{data?.BiodigesterService?.name}</td>
                                                            <td>{data?.cost}</td>

                                                            <td>{data?.status == 1 ? <span className="badge bg-primary">Active</span> : <span className="badge bg-danger">Inactive</span>}</td>
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

                                                                                        setCost(data.cost)
                                                                                        setBiodigesterService(data.biodigesterServiceId);



                                                                                        setServiceArea(data.serviceAreaId)
                                                                                        setStatus(data.status)
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
                    </div>
            </section>
        </main>
    )
}
