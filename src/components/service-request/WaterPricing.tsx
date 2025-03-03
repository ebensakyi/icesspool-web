"use client"
import { LOGIN_URL } from '@/config';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const WaterPricing = ({ data }: any) => {
console.log(data);


    const [id, setId] = useState("");

    const [insurance, setInsurance] = useState(""); //1
    const [roadWorthy, setRoadWorthy] = useState(""); //1
    const [rawWaterCost, setRawWaterCost] = useState(""); //1
    const [repairCost, setRepairCost] = useState(""); //1
    const [pumpDepreciation, setPumpDepreciation] = useState("");//1
    const [adminCost, setAdminCost] = useState(""); //1
    const [toolsCost, setToolsCost] = useState(""); //1
    const [hoseDepreciation, setHoseDepreciation] = useState(""); //1
    const [truckDepreciation, setTruckDepreciation] = useState("");//1
    const [overheadCost, setOverheadCost] = useState("");//1
    const [unitFuelCost, setUnitFuelCost] = useState("");//1
    const [workingDays, setWorkingDays] = useState(""); //1
    const [annualEstVol, setAnnualEstVol] = useState(""); //1

    const [waterUnitCost, setWaterUnitCost] = useState(""); //1


    const [profitPercentage, setProfitPercentage] = useState("");
    const [truckClassification, setTruckClassification] = useState("");


    const [region, setRegion] = useState("");


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
                insurance: Number(insurance),
                repairCost: Number(repairCost),
                roadWorthy: Number(roadWorthy),
                unitFuelCost: Number(unitFuelCost),
                /////
                workingDays: Number(workingDays),
                truckDepreciation: Number(truckDepreciation),
                adminCost: Number(adminCost),
                overheadCost: Number(overheadCost),
                toolsCost: Number(toolsCost),
                profitPercentage: Number(profitPercentage),
                pumpDepreciation: Number(pumpDepreciation),
                region: Number(region),
                truckClassification: Number(truckClassification),
                rawWaterCost: Number(rawWaterCost),
                hoseDepreciation: Number(hoseDepreciation),
                status: Number(status),
            };
            const response = await axios.post("/api/pricing/water-tanker-service", data);
            if (response.status === 200) {
                toast.success("Success");

            }
            setId("")
            setRepairCost("")
            setRoadWorthy("");
            setInsurance("")
            setUnitFuelCost("")

            setWorkingDays("");
            setTruckDepreciation("");
            setAdminCost("");
            setOverheadCost("");
            setProfitPercentage("");
            setPumpDepreciation("");
            setTruckClassification("");

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
                insurance: Number(insurance),
                repairCost: Number(repairCost),
                roadWorthy: Number(roadWorthy),
                workingDays: Number(workingDays),
                rawWaterCost: Number(rawWaterCost),
                truckDepreciation: Number(truckDepreciation),
                adminCost: Number(adminCost),
                overheadCost: Number(overheadCost),
                toolsCost: Number(toolsCost),
                profitPercentage: Number(profitPercentage),
                pumpDepreciation: Number(pumpDepreciation),
                region: Number(region),

                truckClassification: Number(truckClassification),
                status: Number(status),
            };


            response = await axios.put("/api/pricing/water-tanker-service", data);
            toast.success(response.data.message);
            setId("")
            setRepairCost("")
            setRoadWorthy("");
            setInsurance("");

            setWorkingDays("");
            setTruckDepreciation("");
            setAdminCost("");
            setOverheadCost("");
            setProfitPercentage("");
            setPumpDepreciation("");
            setTruckClassification("");
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
                <h1>WATER PRICING</h1>
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
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Annual Est. Water Volume *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter water volume' value={annualEstVol} onChange={(e: any) => setAnnualEstVol(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Water Unit Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter water unit cost' value={waterUnitCost} onChange={(e: any) => setWaterUnitCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Name *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Insurance *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter insurance' value={insurance} onChange={(e: any) => setInsurance(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Repair cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter repair cost' value={repairCost} onChange={(e: any) => setRepairCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Road worthy *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter road worthy' value={roadWorthy} onChange={(e: any) => setRoadWorthy(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Unit Fuel Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter unit fuel cost' value={unitFuelCost} onChange={(e: any) => setUnitFuelCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                No. of Working days *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter  no. of Working days' value={workingDays} onChange={(e: any) => setWorkingDays(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Truck Depreciation *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter truck depreciation' value={truckDepreciation} onChange={(e: any) => setTruckDepreciation(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Admin Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter  admin cost' value={adminCost} onChange={(e: any) => setAdminCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Overhead Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter  overhead cost' value={overheadCost} onChange={(e: any) => setOverheadCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Tools Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter  tools cost' value={toolsCost} onChange={(e: any) => setToolsCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Profit Percentage *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter profit percentage' value={profitPercentage} onChange={(e: any) => setProfitPercentage(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Pump  Depreciation *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter pump  depreciation' value={pumpDepreciation} onChange={(e: any) => setPumpDepreciation(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Truck Classification *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setTruckClassification(e.target.value);
                                                }}
                                                value={truckClassification}
                                            >
                                                <option value={0}>Select truck class * </option>


                                                {data?.truckClassifications?.response?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Raw Water Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter Fuel Distance Constant' value={rawWaterCost} onChange={(e: any) => setRawWaterCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Hose Depreciation *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter Fuel Distance Constant' value={hoseDepreciation} onChange={(e: any) => setHoseDepreciation(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">

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
                                    </div>
                                    <div className="col-lg-4">

                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Region *
                                            </label>
                                            <select
                                                className="form-control"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setRegion(e.target.value);
                                                }}
                                                value={region}
                                            >
                                                <option value={""}>Select region * </option>

                                                {data?.regions?.response?.map((data: any) => (
                                                    <option key={data.id} value={data.id}>
                                                        {data.name}
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

                                            setWorkingDays("");
                                            setTruckDepreciation("");
                                            setAdminCost("");
                                            setOverheadCost("");
                                            setProfitPercentage("");
                                            setPumpDepreciation("");
                                            setTruckClassification("");
                                            setRawWaterCost("")


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
                                            <th scope="col">Region</th>
                                            <th scope="col">Truck Classification</th>

                                            <th scope="col">Insurance</th>
                                            <th scope="col">Repair Cost</th>
                                            <th scope="col">Road Worthy</th>
                                            <th scope="col">Unit Fuel Cost</th>
                                            <th scope="col">Working Days</th>
                                            <th scope="col">Truck Depreciation</th>
                                            <th scope="col"> Admin Cost</th>
                                            <th scope="col"> Overhead Cost</th>
                                            <th scope="col"> Tools Cost</th>
                                            <th scope="col">Profit Percentage</th>
                                            <th scope="col">Pump  Depreciation</th>
                                            <th scope="col">Fuel Distance Const</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.waterPricings?.response?.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.ServiceArea?.Region?.name}</td>
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
                                                    <td>{data?.waterUnitCost}</td>

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

                                                                                setWorkingDays(data.workingDays);
                                                                                setTruckDepreciation(data.truckDepreciation);
                                                                                setAdminCost(data.adminCost);
                                                                                setOverheadCost(data.overheadCost);
                                                                                setProfitPercentage(data.profitPercentage);
                                                                                setPumpDepreciation(data.pumpDepreciation);
                                                                                setRawWaterCost(data.rawWaterCost)
                                                                                setToolsCost(data.toolsCost)
                                                                                setTruckClassification(data.truckClassificationId)
                                                                                setRegion(data.regionId)
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
            </section>
        </main>
    )
}
