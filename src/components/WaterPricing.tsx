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


    const [id, setId] = useState("");

    const [insurance, setInsurance] = useState(""); 
    const [repairCost, setRepairCost] = useState("");
    const [roadWorthy, setRoadWorthy] = useState("");
    const [unitFuelCost, setUnitFuelCost] = useState("");
    const [workingDays, setWorkingDays] = useState("");

    const [profitPercentage, setProfitPercentage] = useState("");
    const [truckClassification, setTruckClassification] = useState("");
    const [fuelDistanceConst, setFuelDistanceConst] = useState("");

    const [annualTruckDepreciation, setAnnualTruckDepreciation] = useState("");
    const [annualHoesDepreciation, setAnnualHoesDepreciation] = useState(""); 
    const [annualToolsCost, setAnnualToolsCost] = useState(""); 
    const [annualPumpDepreciation, setPumpDepreciation] = useState("");
    const [annualOverheadCost, setAnnualOverheadCost] = useState("");
    const [annualAdminCost, setAnnualAdminCost] = useState("");
    const [waterUnitCost, setWaterUnitCost] = useState("");
    const [operatorsProfit, setOperatorsProfitt] = useState("");

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
                insurance,
                repairCost: Number(repairCost),
                roadWorthy: Number(roadWorthy),
                unitFuelCost: Number(unitFuelCost),
                workingDays: Number(workingDays),
                truckDepreciation: Number(truckDepreciation),
                annualAdminCost: Number(annualAdminCost),
                annualOverheadCost: Number(annualOverheadCost),
                annualToolsCost: Number(annualToolsCost),
                profitPercentage: Number(profitPercentage),
                pumpAnnualDepreciation: Number(pumpAnnualDepreciation),
                region: Number(region),
                truckClassification: Number(truckClassification),
                fuelDistanceConst: Number(fuelDistanceConst),
                status: Number(status),
            };
            const response = await axios.post("/api/pricing/desludging", data);
            toast.success(response.data.message);
            setId("")
            setRepairCost("")
            setRoadWorthy("");

            setUnitFuelCost("");
            setWorkingDays("");
            setTruckDepreciation("");
            setAnnualAdminCost("");
            setAnnualOverheadCost("");
            setProfitPercentage("");
            setPumpAnnualDepreciation("");
            setTruckClassification("");
            setFuelDistanceConst("")

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
                unitFuelCost: Number(unitFuelCost),
                workingDays: Number(workingDays),
                truckDepreciation: Number(truckDepreciation),
                annualAdminCost: Number(annualAdminCost),
                annualOverheadCost: Number(annualOverheadCost),
                annualToolsCost: Number(annualToolsCost),
                profitPercentage: Number(profitPercentage),
                pumpAnnualDepreciation: Number(pumpAnnualDepreciation),
                fuelDistanceConst: Number(fuelDistanceConst),
                region: Number(region),

                truckClassification: Number(truckClassification),
                status: Number(status),
            };

            
            response = await axios.put("/api/pricing/desludging", data);
            toast.success(response.data.message);
            setId("")
            setRepairCost("")
            setRoadWorthy("");
            setInsurance("");

            setUnitFuelCost("");
            setWorkingDays("");
            setTruckDepreciation("");
            setAnnualAdminCost("");
            setAnnualOverheadCost("");
            setProfitPercentage("");
            setPumpAnnualDepreciation("");
            setTruckClassification("");
            setFuelDistanceConst("")
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
                                                Annual Admin Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter annual admin cost' value={annualAdminCost} onChange={(e: any) => setAnnualAdminCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Annual Overhead Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter annual overhead cost' value={annualOverheadCost} onChange={(e: any) => setAnnualOverheadCost(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className=" mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Annual Tools Cost *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter annual tools cost' value={annualToolsCost} onChange={(e: any) => setAnnualToolsCost(e.target.value)} />
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
                                                Pump Annual Depreciation *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter pump annual depreciation' value={pumpAnnualDepreciation} onChange={(e: any) => setPumpAnnualDepreciation(e.target.value)} />
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
                                                Fuel Distance Constant *
                                            </label>
                                            <div className="col-sm-12">
                                                <input type="number" className="form-control" placeholder='Enter Fuel Distance Constant' value={fuelDistanceConst} onChange={(e: any) => setFuelDistanceConst(e.target.value)} />
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
                                            setRepairCost("")
                                            setRoadWorthy("");
                                            setInsurance("");
                                            setUnitFuelCost("");
                                            setWorkingDays("");
                                            setTruckDepreciation("");
                                            setAnnualAdminCost("");
                                            setAnnualOverheadCost("");
                                            setProfitPercentage("");
                                            setPumpAnnualDepreciation("");
                                            setTruckClassification("");
                                            setFuelDistanceConst("")


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
                                            <th scope="col">Annual Admin Cost</th>
                                            <th scope="col">Annual Overhead Cost</th>
                                            <th scope="col">Annual Tools Cost</th>
                                            <th scope="col">Profit Percentage</th>
                                            <th scope="col">Pump Annual Depreciation</th>
                                            <th scope="col">Fuel Distance Const</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.desludgingPricings?.response.map((data: any) => {
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
                                                    <td>{data?.annualAdminCost}</td>
                                                    <td>{data?.annualOverheadCost}</td>
                                                    <td>{data?.annualToolsCost}</td>
                                                    <td>{data?.profitPercentage}</td>
                                                    <td>{data?.pumpAnnualDepreciation}</td>
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
                                                                                setId(data.id);

                                                                                setRepairCost(data.repairCost)
                                                                                setRoadWorthy(data.roadWorthy);
                                                                                setInsurance(data.insurance);

                                                                                setUnitFuelCost(data.unitFuelCost);
                                                                                setWorkingDays(data.workingDays);
                                                                                setTruckDepreciation(data.truckDepreciation);
                                                                                setAnnualAdminCost(data.annualAdminCost);
                                                                                setAnnualOverheadCost(data.annualOverheadCost);
                                                                                setProfitPercentage(data.profitPercentage);
                                                                                setPumpAnnualDepreciation(data.pumpAnnualDepreciation);
                                                                                setFuelDistanceConst(data.fuelDistanceConst)
                                                                                setAnnualToolsCost(data.annualToolsCost)
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
