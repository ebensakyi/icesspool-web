"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MakeEmptyingRequest = ({ data }: any) => {


    const [id, setId] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerLat, setCustomerLat] = useState("");
    const [customerLng, setCustomerLng] = useState("");
    const [truck, setTruck] = useState("");
    const [price, setPrice] = useState("");

    const [pricing, setPricing] = useState([]);

    const [tripsNumber, setTripsNumber] = useState("");


    const [status, setStatus] = useState("");

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    const getPricing = async () => {

        const response = await axios.get(`/api/pricing/emptying/calculate?latitude=${customerLat}&longitude=${customerLng}&tripsNumber=${tripsNumber}`);

        setPricing(response.data.price)

        console.log(response);

    }

    const add = async (e: any) => {
        try {
            e.preventDefault();
            // if (name == "" || status == "") {
            //     return toast.error("Please fill form");
            // }

            let data = {
                customerName: customerName,
                customerLat: Number(customerLat),
                customerLng: Number(customerLng),
                truck: Number(truck),
                price: Number(price),
                phoneNumber: phoneNumber

            };


            const response = await axios.post("/api/pricing/water", data);
            toast.success(response.data.message);
            setId("")
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




    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>MAKE REQUEST</h1>
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
                                    <div className="col-lg-3 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Number of trips *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder=' Enter number of trips' value={tripsNumber} onChange={(e: any) => setTripsNumber(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="col-lg-3">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Enter latitude *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" value={customerLat} onChange={(e: any) => setCustomerLat(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Enter longitude *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" value={customerLng} onChange={(e: any) => {
                                                    setCustomerLng(e.target.value)
                                                    if (customerLat != "" && customerLng != "") {
                                                        getPricing()
                                                    }
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">

                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Truck *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setTruck(e.target.value);
                                                }}
                                                value={truck}
                                            >
                                                <option value={""}>Select truck * </option>

                                                {pricing?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}{" - GHS "}{data.price}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
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
                            <div className="card-body" style={{
                                "display": "block",
                                "overflowX": "auto",
                                "whiteSpace": "nowrap"
                            }}>
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Phone number</th>

                                            <th scope="col">Latitude</th>
                                            <th scope="col">Longitude</th>
                                            <th scope="col">Trips</th>
                                            <th scope="col">Truck</th>
                                            <th scope="col">Price</th>

                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.waterPricings?.response.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.Region?.name}</td>
                                                    <td>{data?.TruckClassification?.name}</td>

                                                    <td>{data?.insurance}</td>
                                                    <td>{data?.repairCost}</td>
                                                    <td>{data?.roadWorthy}</td>
                                                    <td>{data?.unitFuelCost}</td>
                                                    <td>{data?.workingDays}</td>
                                                    <td>{data?.truckDepreciation}</td>
                                                    <td>{data?.adminCost}</td>
                                                    <td>{data?.overheadCost}</td>
                                                    <td>{data?.toolsCost}</td>
                                                    <td>{data?.profitPercentage}</td>
                                                    <td>{data?.pumpDepreciation}</td>
                                                    <td>{data?.fuelDistanceConst}</td>

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
                                                                                setId("")
                                                                                setCustomerLat("");
                                                                                setCustomerLng("");
                                                                                setCustomerName("");
                                                                                setPhoneNumber("");
                                                                                setTruck("");
                                                                                setPrice("");

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
