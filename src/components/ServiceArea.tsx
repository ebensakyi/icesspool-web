"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ServiceArea = ({ data }: any) => {


    const [id, setId] = useState("");
    const [region, setRegion] = useState("");
    const [regionId, setRegionId] = useState("");

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    const [lat1, setLat1] = useState("");
    const [lng1, setLng1] = useState("");

    const [lat2, setLat2] = useState("");
    const [lng2, setLng2] = useState("");

    const [lat3, setLat3] = useState("");
    const [lng3, setLng3] = useState("");

    const [lat4, setLat4] = useState("");
    const [lng4, setLng4] = useState("");


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
            if (name == "" || region == "") {
                return toast.error("Please fill form");
            }
            // let cityPolygon = JSON.stringify([[lat1, lng1], [lat2, lng2], [lat3, lng3], [lat4, lng4]])
            let data = {
                region,
                name,
                lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4,
                status
            };

            const response = await axios.post("/api/service-area", data);
            toast.success(response.data.message);
            setId("")
            setRegion("")
            setLat1("")
            setLat2("")
            setLat3("")
            setLat4("")
            setLng1("")
            setLng2("")
            setLng3("")
            setLng4("")
            setName("");
            setStatus("")
            setRegionId("")

            router.refresh()

        } catch (error: any) {
            console.log(error);

            toast.error(error.response.data.message);

        }
    };

    const update = async (e: any) => {
        try {
            e.preventDefault();
            if (region == "" || name == "") {
                return toast.error("Please fill form");
            }

          
            let data = {
                  id: Number(id), region:Number(regionId),
                name,
                lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4,
                status
            };

            const response = await axios.put("/api/service-area", data);
            toast.success(response.data.message);
            setId("")
            setRegion("")
            setName("");
            setLat1("")
            setLat2("")
            setLat3("")
            setLat4("")
            setLng1("")
            setLng2("")
            setLng3("")
            setLng4("")
            setRegionId("")
            setStatus("")

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
                <h1>SERVICE AREA</h1>
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
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Name *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Enter name' onChange={(e: any) => {
                                                setName(e.target.value);
                                            }} value={name} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Region *
                                        </label>
                                        <select
                                            className="form-control"
                                            aria-label="Default select example"
                                            onChange={(e: any) => {
                                                setRegion(e.target.value);
                                            }}
                                            value={regionId}
                                        >
                                            <option value={0}>Select region * </option>


                                            {data?.regions?.response?.map((data: any) => (
                                                <option key={data.id} value={data.id}>
                                                    {data.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Latitude 1 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter lat 1' onChange={(e: any) => {
                                                setLat1(e.target.value);
                                            }} value={lat1} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Longitude 1 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter long 1' onChange={(e: any) => {
                                                setLng1(e.target.value);
                                            }} value={lng1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Latitude 2 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter lat' onChange={(e: any) => {
                                                setLat2(e.target.value);
                                            }} value={lat2} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Longitude 2 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter long' onChange={(e: any) => {
                                                setLng2(e.target.value);
                                            }} value={lng2} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Latitude 3 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter lat' onChange={(e: any) => {
                                                setLat3(e.target.value);
                                            }} value={lat3} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Longitude 3 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter long' onChange={(e: any) => {
                                                setLng3(e.target.value);
                                            }} value={lng3} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Latitude 4 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter lat' onChange={(e: any) => {
                                                setLat4(e.target.value);
                                            }} value={lat4} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Longitude 4 *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Enter long' onChange={(e: any) => {
                                                setLng4(e.target.value);
                                            }} value={lng4} />
                                        </div>
                                    </div>
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
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>

                                            <th scope="col">Region</th>
                                            {/* <th scope="col">Map</th> */}

                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.serviceAreas?.response.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.name}</td>

                                                    <td>{data?.Region?.name}</td>
                                                    {/* <td>{data?.cityPolygon}</td> */}

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
                                                                                setRegionId(data.regionId)
                                                                                setName(data.name)
                                                                                setStatus(data.status)
                                                                                setLat1(data.lat1)
                                                                                setLat2(data.lat2)
                                                                                setLat3(data.lat3)
                                                                                setLat4(data.lat4)

                                                                                setLng1(data.lng1)
                                                                                setLng2(data.lng2)
                                                                                setLng3(data.lng3)
                                                                                setLng4(data.lng4)
                                                                                

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
