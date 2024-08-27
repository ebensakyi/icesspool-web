"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MakeToiletTruckRequest = ({ data }: any) => {


    const [id, setId] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerLat, setCustomerLat] = useState("");
    const [customerLng, setCustomerLng] = useState("");
    const [truck, setTruck] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");

    const [pricing, setPricing] = useState([]);

    const [tripsNumber, setTripsNumber] = useState("1");

    const [serviceArea, setServiceArea] = useState("");

    const [status, setStatus] = useState("Get Prices");

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    const getPricing = async () => {
        try {

            setPricing([])
            setStatus("Getting prices...");
            const response = await axios.get(`/api/pricing/toilet-truck-service/price?userLatitude=${customerLat}&userLongitude=${customerLng}&tripsNumber=${tripsNumber}&serviceArea=${serviceArea}`);
            setStatus("Get Prices");

            console.log(response.data);



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
            };


            const response = await axios.post("/api/service-request/toilet-truck/make-request/web-request", data);
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
                                    <div className="col-sm-3  mb-3">
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
                                    <div className="col-lg-3 col-md-6">
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

                                            <div className=" mb-3">
                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                    Select Truck/Pricing *
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
