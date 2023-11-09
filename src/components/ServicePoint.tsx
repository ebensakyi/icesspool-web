"use client"
import { LOGIN_URL } from '@/config';
import { signal } from '@preact/signals';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ServicePoint = ({ data }: any) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [address, setAddress] = useState("");
    const [service, setService] = useState("");
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
            if (name == "" || status == "") {
                return toast.error("Please fill form");
            }

            let data = {
                name,
                latitude: Number(latitude),
                longitude: Number(longitude),
                address,
                service: Number(service),
                status: Number(status),
            };
            const response = await axios.post("/api/service-points", data);
            toast.success(response.data.message);
            setId("")
            setName("")
            setAddress("");

            setLatitude("");
            setLongitude("");
            setService("");
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
            if (name == "" || status == "" || latitude == null || longitude == null || address == "" || service == null || status == null) {
                return toast.error("Please fill form");
            }

            let data = {
                id: Number(id),
                name,
                latitude: Number(latitude),
                longitude: Number(longitude),
                address,
                service: Number(service),
                status: Number(status),
            };
             response = await axios.put("/api/service-points", data);
            toast.success(response.data.message);
            setId("")
            setName("")
            setAddress("");

            setLatitude("");
            setLongitude("");
            setService("");
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
                <h1>SERVICE POINTS</h1>
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
                                        <input type="text" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Latitude *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter Latitude' value={latitude} onChange={(e: any) => setLatitude(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Longitude *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter Longitude' value={longitude} onChange={(e: any) => setLongitude(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Address *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter Address' value={address} onChange={(e: any) => setAddress(e.target.value)} />
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
                                            <th scope="col">Address</th>
                                            <th scope="col">Latitute</th>
                                            <th scope="col">Longitude</th>
                                            <th scope="col">Service</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.servicePoints?.response.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.address}</td>
                                                    <td>{data?.latitude}</td>
                                                    <td>{data?.longitude}</td>
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
                                                                                setName(data.name)
                                                                                setAddress(data.address)
                                                                                setLatitude(data.latitude)
                                                                                setLongitude(data.longitude)
                                                                                setService(data.serviceId)
                                                                                setStatus(data.status)
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
