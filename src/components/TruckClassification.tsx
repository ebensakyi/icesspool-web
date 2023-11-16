"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const TruckClassification = ({ data }: any) => {

    console.log(data);

    const [id, setId] = useState("");
    const [region, setRegion] = useState("");
    const [service, setService] = useState("");
    const [status, setStatus] = useState("");
    const [tankCapacity, setTankCapacity] = useState("");
    const [name, setName] = useState("");

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()



    const add = async (e: any) => {
       // try {
            e.preventDefault();
            if (service == "" || status == "" || region == "") {
                return toast.error("Please fill form");
            }

            let data = {
                name: name,
                status: status,
                regionId: region,
                tankCapacity: tankCapacity,
                serviceId: service,
            };
            const response = await axios.post("/api/truck-classification", data);
            toast.success(response.data.message);
            setService("")
            setStatus("");
            setRegion("")


            router.refresh()

        // } catch (error: any) {
        //     console.log(error);

        //     toast.error(error.response.data.message);

        // }
    };

    const update = async (e: any) => {
        try {
            e.preventDefault();
            if (region == "" || status == "" || service == "") {
                return toast.error("Please fill form");
            }

            let data = {
                id: Number(id),
                name,
                status,
            };
            const response = await axios.put("/api/truck-classification", data);
            toast.success(response.data.message);
            setId("")
            setRegion("")
            setStatus("");
            setService("")

            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
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
                <h1>TRUCK CLASSIFICATION</h1>
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
                                        Name *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter name' />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Truck capacity *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter capacity' />
                                    </div>
                                </div>


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
                                        <option value={0}>Select service * </option>

                                        {data?.services?.response?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Location *
                                    </label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={(e: any) => {
                                            setRegion(e.target.value);
                                        }}
                                        value={region}
                                    >
                                        <option value={0}>Select location * </option>


                                        {data?.regions?.response?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                        <option value={0}>Select status * </option>
                                        <option value={1}>Active </option>
                                        <option value={2}>Inactive </option>

                                        {/* {data?.sendingTypes?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))} */}
                                    </select>
                                </div>


                                <div className=" mb-3">
                                    <div className="col-sm-10">


                                        <div className=" mb-3">
                                            <div className="col-sm-10">

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

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Tank Capacity</th>

                                            <th scope="col">Region</th>
                                            <th scope="col">Service</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.truckClassifications?.response.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.tankCapacity}</td>

                                                    <td>{data?.Region?.name}</td>
                                                    <td>{data?.Service?.name}</td>

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
                                                                                setRegion(data.Region.name)
                                                                                setService(data.Service.name)
                                                                                setStatus(data.status)
                                                                                // setSendingType(data.sendingType)
                                                                                // setDistrictId(data.districtId);



                                                                                // setIsEditing(true);

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
