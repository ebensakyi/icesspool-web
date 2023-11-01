'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname, redirect } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import Modal from 'react-modal'
import { LOGIN_URL } from "@/config";

const MyConstants = {
    actions: {
      id: 1,
      path: "action",
    },
    animalTypes: {
      id: 2,
      path: "animal-type",
    },
  
    cemeteryWorkers: {
      id: 3,
      path: "cemetery-workers",
    },
    cleaningFrequencies: {
      id: 4,
      path: "cleaningFrequency",
    },
    communalContainerConditions: {
      id: 5,
      path: "communal-container-condition",
    },
    containerVolumes: {
      id: 6,
      path: "container-volume",
    },
    derattingFrequencies: {
      id: 7,
      path: "deratting-frequency",
    },
    desiltingFrequencies: {
      id: 8,
      path: "desiltingfrequency",
    },
    disinfectionFrequencies: { id: 9, path: "disinfection-frequency" },
    drainBadConditions: {
      id: 10,
      path: "drain-bad-condition",
    },
  
    drainTypes: {
      id: 11,
      path: "drain-type",
    },
    drinkingWaterSourceTypes: {
      id: 12,
      path: "drinking-water-source-type",
    },
    easeYourselfWheres: {
      id: 13,
      path: "ease-yourself-where",
    },
    effluentManagements: {
      id: 14,
      path: "effluent-management",
    },
    excretaContainments: { id: 15, path: "excreta-containment" },
    excretaDisposals: { id: 16, path: "excreta-disposal" },
    greyWaterDisposals: {
      id: 17,
      path: "grey-water-disposal",
    },
    hazardousWasteDisposals: {
      id: 18,
      path: "hazardous-waste-disposal",
    },
    inspectionFormNuisances: {
      id: 19,
      path: "inspection-form-nuisances",
    },
    nuisances: {
      id: 20,
      path: "nuisances",
    },
  
    ownershipTypes: {
      id: 21,
      path: "ownership-type",
    },
    pestSigns: {
      id: 22,
      path: "pest-sign",
    },
    premisesServices: {
      id: 23,
      path: "services",
    },
    premisesSubtypes: {
      id: 24,
      path: "premises-subtypes",
    },
    premisesTypes: {
      id: 25,
      path: "premises-types",
    },
    respondentDesignations: {
      id: 26,
      path: "respondent-designation",
    },
    sewerSystems: {
      id: 27,
      path: "sewer-system",
    },
    toiletHouseholdNumbers: {
      id: 28,
      path: "toilet-household-number",
    },
    toiletPitPositions: {
      id: 29,
      path: "toilet-pit-position",
    },
    toiletTypes: {
      id: 30,
      path: "toilet-type",
    },
    unsafeToiletConditions: {
      id: 31,
      path: "unsafe-toilet-condition",
    },
    unsafeWaterStorages: {
      id: 32,
      path: "unsafe-water-storage",
    },
    unservicedWasteDisposals: {
      id: 33,
      path: "unserviced-waste-disposal",
    },
    wasteCollectionFrequencies: {
      id: 34,
      path: "waste-collection-frequency",
    },
    wasteCollectionTypes: {
      id: 35,
      path: "waste-collection-type",
    },
    wasteStorageReceptacles: {
      id: 36,
      path: "waste-storage-receptacle",
    },
    wasteWaterContainments: {
      id: 37,
      path: "waste-water-containment",
    },
    waterFlowFrequencies: {
      id: 38,
      path: "water-flow-requency",
    },
    waterSourceTypes: {
      id: 39,
      path: "water-source-type",
    },
    waterStorageTypes: {
      id: 40,
      path: "water-storage-type",
    },
    waterSupplyTypes: {
      id: 41,
      path: "water-supply-type",
    },
    waterTreatmentTypes: {
      id: 42,
      path: "water-treatment-type",
    },
  };
  
export default function OtherData({ data }: any) {

    // const [searchText, setSearchText] = useState();
    // const [region, setRegion] = useState("");
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [primaryData, setPrimaryData] = useState(0)




    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()



    const [isEditing, setIsEditing] = useState(false);



    const add = async (e: any, path: string) => {
        try {
            e.preventDefault();

            if (name == "") return toast.error("Name cannot be empty");

            let data = {
                name
            };

            const response = await axios.post(`/api/primary-data/${path}`, data);
            setName("");

            if (response.status == 200) {
                router.refresh()

                return toast.success("Data added");
            }
            if (response.status == 201) {
                return toast.error("Same name already exist");
            }
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };



    const update = async (e: any, model: string) => {
        try {
            e.preventDefault()
            let data = {
                name,

            };


            const response = await axios.put(
                `/api/primary-data/${model}`, data
            );

            if (response.status == 200) {
                setName("")

                router.refresh()
                return toast.success("District updated");
            }


            return toast.error("An error occurred while updating");
        } catch (error) {
            return toast.error("An error occurred while updating");
        }
    };

    const _delete = async (id: any) => {
        try {
            const response = await axios.delete(
                `/api/user/guide/?id=${id}`
            );

            if (response.status == 200) {
                router.refresh()
                return toast.success("User guide deleted");
            }


            return toast.error("An error occurred while deleting");
        } catch (error) {
            return toast.error("An error occurred while deleting");
        }
    };



    function openModal(e: any, primaryData: number) {
        e.preventDefault()
        setIsOpen(true)

        setPrimaryData(primaryData)


    }
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>OTHER DATA</h1>
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
                <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                    {primaryData == MyConstants.actions.id ?
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Action </h6>
                                <div className="row gy-8">
                                    <div className="col-xxl-6 col-md-8">
                                        <div>
                                            <label
                                                htmlFor="basiInput"
                                                className="form-label"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="basiInput"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-2">
                                        <div>
                                            <label
                                                htmlFor="basiInput"
                                                className="form-label"
                                            >
                                                .
                                            </label>
                                            <div className="text-end">
                                                {isEditing?<button
                                                    onClick={(e: any) => {
                                                        update(e,MyConstants.actions.path);
                                                    }}
                                                    className="btn btn-warning"
                                                >
                                                    Update
                                                </button>:
                                                <button
                                                    onClick={(e: any) => {
                                                        add(e,MyConstants.actions.path);
                                                    }}
                                                    className="btn btn-primary"
                                                >
                                                    Add
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">Id</th> */}
                                            <th scope="col">Name</th>

                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.actions.map((data: any) => (
                                            <tr key={data.id}>
                                                {/* <th scope="row">{region.id}</th> */}
                                                <td>{data.name}</td>

                                                <td>
                                                    <button className="badge bg-success" onClick={async () => {
                                                        setName(data.name)
                                                        setIsEditing(true)
                                                    }}>
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        primaryData == MyConstants.animalTypes.id ?
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Animal Types </h6>
                                    <div className="row gy-4">
                                        <div className="col-xxl-4 col-md-8">
                                            <div>
                                                <label
                                                    htmlFor="basiInput"
                                                    className="form-label"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="basiInput"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div>
                                                <label
                                                    htmlFor="basiInput"
                                                    className="form-label"
                                                >
                                                    .
                                                </label>
                                                <div className="text-end">
                                                    <button
                                                        onClick={(e: any) => {
                                                            add(e, MyConstants.animalTypes.path);
                                                        }}
                                                        className="btn btn-primary"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col">Id</th> */}
                                                <th scope="col">Name</th>

                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.animalTypes.map((data: any) => (
                                                <tr key={data.id}>
                                                    {/* <th scope="row">{region.id}</th> */}
                                                    <td>{data.name}</td>

                                                    <td>
                                                        <button className="badge bg-success" onClick={async () => {
                                                            setName(data.name)
                                                        }}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
                            primaryData == MyConstants.cemeteryWorkers.id ?
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Cemetery Workers </h6>
                                        <div className="row gy-4">
                                            <div className="col-xxl-4 col-md-8">
                                                <div>
                                                    <label
                                                        htmlFor="basiInput"
                                                        className="form-label"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="basiInput"
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div>
                                                    <label
                                                        htmlFor="basiInput"
                                                        className="form-label"
                                                    >
                                                        .
                                                    </label>
                                                    <div className="text-end">
                                                        <button
                                                            onClick={(e: any) => {
                                                                add(e, MyConstants.cemeteryWorkers.path);
                                                            }}
                                                            className="btn btn-primary"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    {/* <th scope="col">Id</th> */}
                                                    <th scope="col">Name</th>

                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.cemeteryWorkers.map((data: any) => (
                                                    <tr key={data.id}>
                                                        {/* <th scope="row">{region.id}</th> */}
                                                        <td>{data.name}</td>

                                                        <td>
                                                            <button className="badge bg-success" onClick={async () => {
                                                                setName(data.name)
                                                            }}>
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> :
                                primaryData == MyConstants.cleaningFrequencies.id ?
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">Cleaning Frequency </h6>
                                            <div className="row gy-4">
                                                <div className="col-xxl-4 col-md-8">
                                                    <div>
                                                        <label
                                                            htmlFor="basiInput"
                                                            className="form-label"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basiInput"
                                                            value={name}
                                                            onChange={(e) =>
                                                                setName(
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4">
                                                    <div>
                                                        <label
                                                            htmlFor="basiInput"
                                                            className="form-label"
                                                        >
                                                            .
                                                        </label>
                                                        <div className="text-end">
                                                            <button
                                                                onClick={(e: any) => {
                                                                    add(e, MyConstants.cleaningFrequencies.path);
                                                                }}
                                                                className="btn btn-primary"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        {/* <th scope="col">Id</th> */}
                                                        <th scope="col">Name</th>

                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.cleaningFrequencies.map((data: any) => (
                                                        <tr key={data.id}>
                                                            {/* <th scope="row">{region.id}</th> */}
                                                            <td>{data.name}</td>

                                                            <td>
                                                                <button className="badge bg-success" onClick={async () => {
                                                                    setName(data.name)
                                                                }}>
                                                                    Edit
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> :
                                    primaryData == MyConstants.communalContainerConditions.id ?
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">Communal Container Conditions </h6>
                                                <div className="row gy-4">
                                                    <div className="col-xxl-4 col-md-8">
                                                        <div>
                                                            <label
                                                                htmlFor="basiInput"
                                                                className="form-label"
                                                            >
                                                                Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basiInput"
                                                                value={name}
                                                                onChange={(e) =>
                                                                    setName(
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4">
                                                        <div>
                                                            <label
                                                                htmlFor="basiInput"
                                                                className="form-label"
                                                            >
                                                                .
                                                            </label>
                                                            <div className="text-end">
                                                                <button
                                                                    onClick={(e: any) => {
                                                                        add(e, MyConstants.communalContainerConditions.path);
                                                                    }}
                                                                    className="btn btn-primary"
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            {/* <th scope="col">Id</th> */}
                                                            <th scope="col">Name</th>

                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.communalContainerConditions.map((data: any) => (
                                                            <tr key={data.id}>
                                                                {/* <th scope="row">{region.id}</th> */}
                                                                <td>{data.name}</td>

                                                                <td>
                                                                    <button className="badge bg-success" onClick={async () => {
                                                                        setName(data.name)
                                                                    }}>
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> :
                                        primaryData == MyConstants.containerVolumes.id ?
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 className="card-title">Container Volumes </h6>
                                                    <div className="row gy-4">
                                                        <div className="col-xxl-4 col-md-8">
                                                            <div>
                                                                <label
                                                                    htmlFor="basiInput"
                                                                    className="form-label"
                                                                >
                                                                    Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basiInput"
                                                                    value={name}
                                                                    onChange={(e) =>
                                                                        setName(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4">
                                                            <div>
                                                                <label
                                                                    htmlFor="basiInput"
                                                                    className="form-label"
                                                                >
                                                                    .
                                                                </label>
                                                                <div className="text-end">
                                                                    <button
                                                                        onClick={(e: any) => {
                                                                            add(e, MyConstants.containerVolumes.path);
                                                                        }}
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                {/* <th scope="col">Id</th> */}
                                                                <th scope="col">Name</th>

                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data?.containerVolumes.map((data: any) => (
                                                                <tr key={data.id}>
                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                    <td>{data.name}</td>

                                                                    <td>
                                                                        <button className="badge bg-success" onClick={async () => {
                                                                            setName(data.name)
                                                                        }}>
                                                                            Edit
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> :
                                            primaryData == MyConstants.derattingFrequencies.id ?
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h6 className="card-title">Deratting Frequencies </h6>
                                                        <div className="row gy-4">
                                                            <div className="col-xxl-4 col-md-8">
                                                                <div>
                                                                    <label
                                                                        htmlFor="basiInput"
                                                                        className="form-label"
                                                                    >
                                                                        Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="basiInput"
                                                                        value={name}
                                                                        onChange={(e) =>
                                                                            setName(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div>
                                                                    <label
                                                                        htmlFor="basiInput"
                                                                        className="form-label"
                                                                    >
                                                                        .
                                                                    </label>
                                                                    <div className="text-end">
                                                                        <button
                                                                            onClick={(e: any) => {
                                                                                add(e, MyConstants.derattingFrequencies.path);
                                                                            }}
                                                                            className="btn btn-primary"
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer">
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    {/* <th scope="col">Id</th> */}
                                                                    <th scope="col">Name</th>

                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.derattingFrequencies.map((data: any) => (
                                                                    <tr key={data.id}>
                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                        <td>{data.name}</td>

                                                                        <td>
                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                setName(data.name)
                                                                            }}>
                                                                                Edit
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div> :
                                                primaryData == MyConstants.desiltingFrequencies.id ?
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h6 className="card-title">Desilting Frequencies </h6>
                                                            <div className="row gy-4">
                                                                <div className="col-xxl-4 col-md-8">
                                                                    <div>
                                                                        <label
                                                                            htmlFor="basiInput"
                                                                            className="form-label"
                                                                        >
                                                                            Name
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="basiInput"
                                                                            value={name}
                                                                            onChange={(e) =>
                                                                                setName(
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-4">
                                                                    <div>
                                                                        <label
                                                                            htmlFor="basiInput"
                                                                            className="form-label"
                                                                        >
                                                                            .
                                                                        </label>
                                                                        <div className="text-end">
                                                                            <button
                                                                                onClick={(e: any) => {
                                                                                    add(e, MyConstants.desiltingFrequencies.path);
                                                                                }}
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Add
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer">
                                                            <table className="table table-striped">
                                                                <thead>
                                                                    <tr>
                                                                        {/* <th scope="col">Id</th> */}
                                                                        <th scope="col">Name</th>

                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data?.desiltingFrequencies.map((data: any) => (
                                                                        <tr key={data.id}>
                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                            <td>{data.name}</td>

                                                                            <td>
                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                    setName(data.name)
                                                                                }}>
                                                                                    Edit
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div> :
                                                    primaryData == MyConstants.disinfectionFrequencies.id ?
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h6 className="card-title">Disinfection Frequencies </h6>
                                                                <div className="row gy-4">
                                                                    <div className="col-xxl-4 col-md-8">
                                                                        <div>
                                                                            <label
                                                                                htmlFor="basiInput"
                                                                                className="form-label"
                                                                            >
                                                                                Name
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="basiInput"
                                                                                value={name}
                                                                                onChange={(e) =>
                                                                                    setName(
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4">
                                                                        <div>
                                                                            <label
                                                                                htmlFor="basiInput"
                                                                                className="form-label"
                                                                            >
                                                                                .
                                                                            </label>
                                                                            <div className="text-end">
                                                                                <button
                                                                                    onClick={(e: any) => {
                                                                                        add(e, MyConstants.disinfectionFrequencies.path);
                                                                                    }}
                                                                                    className="btn btn-primary"
                                                                                >
                                                                                    Add
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-footer">
                                                                <table className="table table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            {/* <th scope="col">Id</th> */}
                                                                            <th scope="col">Name</th>

                                                                            <th scope="col">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {data?.disinfectionFrequencies.map((data: any) => (
                                                                            <tr key={data.id}>
                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                <td>{data.name}</td>

                                                                                <td>
                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                        setName(data.name)
                                                                                    }}>
                                                                                        Edit
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div> :
                                                        primaryData == MyConstants.drainBadConditions.id ?
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h6 className="card-title">Drain Bad Conditions </h6>
                                                                    <div className="row gy-4">
                                                                        <div className="col-xxl-4 col-md-8">
                                                                            <div>
                                                                                <label
                                                                                    htmlFor="basiInput"
                                                                                    className="form-label"
                                                                                >
                                                                                    Name
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="basiInput"
                                                                                    value={name}
                                                                                    onChange={(e) =>
                                                                                        setName(
                                                                                            e.target.value
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-4">
                                                                            <div>
                                                                                <label
                                                                                    htmlFor="basiInput"
                                                                                    className="form-label"
                                                                                >
                                                                                    .
                                                                                </label>
                                                                                <div className="text-end">
                                                                                    <button
                                                                                        onClick={(e: any) => {
                                                                                            add(e, MyConstants.drainBadConditions.path);
                                                                                        }}
                                                                                        className="btn btn-primary"
                                                                                    >
                                                                                        Add
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer">
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                {/* <th scope="col">Id</th> */}
                                                                                <th scope="col">Name</th>

                                                                                <th scope="col">Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {data?.drainBadConditions.map((data: any) => (
                                                                                <tr key={data.id}>
                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                    <td>{data.name}</td>

                                                                                    <td>
                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                            setName(data.name)
                                                                                        }}>
                                                                                            Edit
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div> :
                                                            primaryData == MyConstants.drainTypes.id ?
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <h6 className="card-title">Drain Types </h6>
                                                                        <div className="row gy-4">
                                                                            <div className="col-xxl-4 col-md-8">
                                                                                <div>
                                                                                    <label
                                                                                        htmlFor="basiInput"
                                                                                        className="form-label"
                                                                                    >
                                                                                        Name
                                                                                    </label>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="basiInput"
                                                                                        value={name}
                                                                                        onChange={(e) =>
                                                                                            setName(
                                                                                                e.target.value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-lg-4">
                                                                                <div>
                                                                                    <label
                                                                                        htmlFor="basiInput"
                                                                                        className="form-label"
                                                                                    >
                                                                                        .
                                                                                    </label>
                                                                                    <div className="text-end">
                                                                                        <button
                                                                                            onClick={(e: any) => {
                                                                                                add(e, MyConstants.drainTypes.path);
                                                                                            }}
                                                                                            className="btn btn-primary"
                                                                                        >
                                                                                            Add
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <table className="table table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    {/* <th scope="col">Id</th> */}
                                                                                    <th scope="col">Name</th>

                                                                                    <th scope="col">Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {data?.drainTypes.map((data: any) => (
                                                                                    <tr key={data.id}>
                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                        <td>{data.name}</td>

                                                                                        <td>
                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                setName(data.name)
                                                                                            }}>
                                                                                                Edit
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div> :
                                                                primaryData == MyConstants.drinkingWaterSourceTypes.id ?
                                                                    <div className="card">
                                                                        <div className="card-body">
                                                                            <h6 className="card-title">Drinking Water Source </h6>
                                                                            <div className="row gy-4">
                                                                                <div className="col-xxl-4 col-md-8">
                                                                                    <div>
                                                                                        <label
                                                                                            htmlFor="basiInput"
                                                                                            className="form-label"
                                                                                        >
                                                                                            Name
                                                                                        </label>
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            id="basiInput"
                                                                                            value={name}
                                                                                            onChange={(e) =>
                                                                                                setName(
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-lg-4">
                                                                                    <div>
                                                                                        <label
                                                                                            htmlFor="basiInput"
                                                                                            className="form-label"
                                                                                        >
                                                                                            .
                                                                                        </label>
                                                                                        <div className="text-end">
                                                                                            <button
                                                                                                onClick={(e: any) => {
                                                                                                    add(e, MyConstants.drinkingWaterSourceTypes.path);
                                                                                                }}
                                                                                                className="btn btn-primary"
                                                                                            >
                                                                                                Add
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <table className="table table-striped">
                                                                                <thead>
                                                                                    <tr>
                                                                                        {/* <th scope="col">Id</th> */}
                                                                                        <th scope="col">Name</th>

                                                                                        <th scope="col">Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {data?.drinkingWaterSourceTypes.map((data: any) => (
                                                                                        <tr key={data.id}>
                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                            <td>{data.name}</td>

                                                                                            <td>
                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                    setName(data.name)
                                                                                                }}>
                                                                                                    Edit
                                                                                                </button>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div> :
                                                                    primaryData == MyConstants.waterSourceTypes.id ?
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <h6 className="card-title"> Water Source Type </h6>
                                                                                <div className="row gy-4">
                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                        <div>
                                                                                            <label
                                                                                                htmlFor="basiInput"
                                                                                                className="form-label"
                                                                                            >
                                                                                                Name
                                                                                            </label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="basiInput"
                                                                                                value={name}
                                                                                                onChange={(e) =>
                                                                                                    setName(
                                                                                                        e.target.value
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="col-lg-4">
                                                                                        <div>
                                                                                            <label
                                                                                                htmlFor="basiInput"
                                                                                                className="form-label"
                                                                                            >
                                                                                                .
                                                                                            </label>
                                                                                            <div className="text-end">
                                                                                                <button
                                                                                                    onClick={(e: any) => {
                                                                                                        add(e, MyConstants.waterSourceTypes.path);
                                                                                                    }}
                                                                                                    className="btn btn-primary"
                                                                                                >
                                                                                                    Add
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <table className="table table-striped">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            {/* <th scope="col">Id</th> */}
                                                                                            <th scope="col">Name</th>

                                                                                            <th scope="col">Action</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {data?.waterSourceTypes.map((data: any) => (
                                                                                            <tr key={data.id}>
                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                <td>{data.name}</td>

                                                                                                <td>
                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                        setName(data.name)
                                                                                                    }}>
                                                                                                        Edit
                                                                                                    </button>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div> :
                                                                        primaryData == MyConstants.easeYourselfWheres.id ?
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <h6 className="card-title">Ease Yourself Where </h6>
                                                                                    <div className="row gy-4">
                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                            <div>
                                                                                                <label
                                                                                                    htmlFor="basiInput"
                                                                                                    className="form-label"
                                                                                                >
                                                                                                    Name
                                                                                                </label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    id="basiInput"
                                                                                                    value={name}
                                                                                                    onChange={(e) =>
                                                                                                        setName(
                                                                                                            e.target.value
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-lg-4">
                                                                                            <div>
                                                                                                <label
                                                                                                    htmlFor="basiInput"
                                                                                                    className="form-label"
                                                                                                >
                                                                                                    .
                                                                                                </label>
                                                                                                <div className="text-end">
                                                                                                    <button
                                                                                                        onClick={(e: any) => {
                                                                                                            add(e, MyConstants.easeYourselfWheres.path);
                                                                                                        }}
                                                                                                        className="btn btn-primary"
                                                                                                    >
                                                                                                        Add
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-footer">
                                                                                    <table className="table table-striped">
                                                                                        <thead>
                                                                                            <tr>
                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                <th scope="col">Name</th>

                                                                                                <th scope="col">Action</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {data?.easeYourselfWheres.map((data: any) => (
                                                                                                <tr key={data.id}>
                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                    <td>{data.name}</td>

                                                                                                    <td>
                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                            setName(data.name)
                                                                                                        }}>
                                                                                                            Edit
                                                                                                        </button>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            ))}
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>
                                                                            </div> :

                                                                            primaryData == MyConstants.drinkingWaterSourceTypes.id ?
                                                                                <div className="card">
                                                                                    <div className="card-body">
                                                                                        <h6 className="card-title">Drinking Water Source </h6>
                                                                                        <div className="row gy-4">
                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                <div>
                                                                                                    <label
                                                                                                        htmlFor="basiInput"
                                                                                                        className="form-label"
                                                                                                    >
                                                                                                        Name
                                                                                                    </label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        id="basiInput"
                                                                                                        value={name}
                                                                                                        onChange={(e) =>
                                                                                                            setName(
                                                                                                                e.target.value
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-lg-4">
                                                                                                <div>
                                                                                                    <label
                                                                                                        htmlFor="basiInput"
                                                                                                        className="form-label"
                                                                                                    >
                                                                                                        .
                                                                                                    </label>
                                                                                                    <div className="text-end">
                                                                                                        <button
                                                                                                            onClick={(e: any) => {
                                                                                                                add(e, MyConstants.drinkingWaterSourceTypes.path);
                                                                                                            }}
                                                                                                            className="btn btn-primary"
                                                                                                        >
                                                                                                            Add
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="card-footer">
                                                                                        <table className="table table-striped">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                    <th scope="col">Name</th>

                                                                                                    <th scope="col">Action</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {data?.drinkingWaterSourceTypes.map((data: any) => (
                                                                                                    <tr key={data.id}>
                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                        <td>{data.name}</td>

                                                                                                        <td>
                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                setName(data.name)
                                                                                                            }}>
                                                                                                                Edit
                                                                                                            </button>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div> :
                                                                                primaryData == MyConstants.waterSourceTypes.id ?
                                                                                    <div className="card">
                                                                                        <div className="card-body">
                                                                                            <h6 className="card-title"> Water Source Type </h6>
                                                                                            <div className="row gy-4">
                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                    <div>
                                                                                                        <label
                                                                                                            htmlFor="basiInput"
                                                                                                            className="form-label"
                                                                                                        >
                                                                                                            Name
                                                                                                        </label>
                                                                                                        <input
                                                                                                            type="text"
                                                                                                            className="form-control"
                                                                                                            id="basiInput"
                                                                                                            value={name}
                                                                                                            onChange={(e) =>
                                                                                                                setName(
                                                                                                                    e.target.value
                                                                                                                )
                                                                                                            }
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-lg-4">
                                                                                                    <div>
                                                                                                        <label
                                                                                                            htmlFor="basiInput"
                                                                                                            className="form-label"
                                                                                                        >
                                                                                                            .
                                                                                                        </label>
                                                                                                        <div className="text-end">
                                                                                                            <button
                                                                                                                onClick={(e: any) => {
                                                                                                                    add(e, MyConstants.waterSourceTypes.path);
                                                                                                                }}
                                                                                                                className="btn btn-primary"
                                                                                                            >
                                                                                                                Add
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="card-footer">
                                                                                            <table className="table table-striped">
                                                                                                <thead>
                                                                                                    <tr>
                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                        <th scope="col">Name</th>

                                                                                                        <th scope="col">Action</th>
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    {data?.waterSourceTypes.map((data: any) => (
                                                                                                        <tr key={data.id}>
                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                            <td>{data.name}</td>

                                                                                                            <td>
                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                    setName(data.name)
                                                                                                                }}>
                                                                                                                    Edit
                                                                                                                </button>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    ))}
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div> :

                                                                                    primaryData == MyConstants.waterStorageTypes.id ?
                                                                                        <div className="card">
                                                                                            <div className="card-body">
                                                                                                <h6 className="card-title"> Water Storage Type </h6>
                                                                                                <div className="row gy-4">
                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                        <div>
                                                                                                            <label
                                                                                                                htmlFor="basiInput"
                                                                                                                className="form-label"
                                                                                                            >
                                                                                                                Name
                                                                                                            </label>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                className="form-control"
                                                                                                                id="basiInput"
                                                                                                                value={name}
                                                                                                                onChange={(e) =>
                                                                                                                    setName(
                                                                                                                        e.target.value
                                                                                                                    )
                                                                                                                }
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="col-lg-4">
                                                                                                        <div>
                                                                                                            <label
                                                                                                                htmlFor="basiInput"
                                                                                                                className="form-label"
                                                                                                            >
                                                                                                                .
                                                                                                            </label>
                                                                                                            <div className="text-end">
                                                                                                                <button
                                                                                                                    onClick={(e: any) => {
                                                                                                                        add(e, MyConstants.waterStorageTypes.path);
                                                                                                                    }}
                                                                                                                    className="btn btn-primary"
                                                                                                                >
                                                                                                                    Add
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="card-footer">
                                                                                                <table className="table table-striped">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                            <th scope="col">Name</th>

                                                                                                            <th scope="col">Action</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        {data?.waterStorageTypes.map((data: any) => (
                                                                                                            <tr key={data.id}>
                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                <td>{data.name}</td>

                                                                                                                <td>
                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                        setName(data.name)
                                                                                                                    }}>
                                                                                                                        Edit
                                                                                                                    </button>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        ))}
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div> :




                                                                                        primaryData == MyConstants.waterSupplyTypes.id ?
                                                                                            <div className="card">
                                                                                                <div className="card-body">
                                                                                                    <h6 className="card-title"> Water Supply Type </h6>
                                                                                                    <div className="row gy-4">
                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                            <div>
                                                                                                                <label
                                                                                                                    htmlFor="basiInput"
                                                                                                                    className="form-label"
                                                                                                                >
                                                                                                                    Name
                                                                                                                </label>
                                                                                                                <input
                                                                                                                    type="text"
                                                                                                                    className="form-control"
                                                                                                                    id="basiInput"
                                                                                                                    value={name}
                                                                                                                    onChange={(e) =>
                                                                                                                        setName(
                                                                                                                            e.target.value
                                                                                                                        )
                                                                                                                    }
                                                                                                                />
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div className="col-lg-4">
                                                                                                            <div>
                                                                                                                <label
                                                                                                                    htmlFor="basiInput"
                                                                                                                    className="form-label"
                                                                                                                >
                                                                                                                    .
                                                                                                                </label>
                                                                                                                <div className="text-end">
                                                                                                                    <button
                                                                                                                        onClick={(e: any) => {
                                                                                                                            add(e, MyConstants.waterSupplyTypes.path);
                                                                                                                        }}
                                                                                                                        className="btn btn-primary"
                                                                                                                    >
                                                                                                                        Add
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="card-footer">
                                                                                                    <table className="table table-striped">
                                                                                                        <thead>
                                                                                                            <tr>
                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                <th scope="col">Name</th>

                                                                                                                <th scope="col">Action</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {data?.waterSupplyTypes.map((data: any) => (
                                                                                                                <tr key={data.id}>
                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                    <td>{data.name}</td>

                                                                                                                    <td>
                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                            setName(data.name)
                                                                                                                        }}>
                                                                                                                            Edit
                                                                                                                        </button>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            ))}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            </div> :



                                                                                            primaryData == MyConstants.waterTreatmentTypes.id ?
                                                                                                <div className="card">
                                                                                                    <div className="card-body">
                                                                                                        <h6 className="card-title"> Water Treatment Type </h6>
                                                                                                        <div className="row gy-4">
                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                <div>
                                                                                                                    <label
                                                                                                                        htmlFor="basiInput"
                                                                                                                        className="form-label"
                                                                                                                    >
                                                                                                                        Name
                                                                                                                    </label>
                                                                                                                    <input
                                                                                                                        type="text"
                                                                                                                        className="form-control"
                                                                                                                        id="basiInput"
                                                                                                                        value={name}
                                                                                                                        onChange={(e) =>
                                                                                                                            setName(
                                                                                                                                e.target.value
                                                                                                                            )
                                                                                                                        }
                                                                                                                    />
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div className="col-lg-4">
                                                                                                                <div>
                                                                                                                    <label
                                                                                                                        htmlFor="basiInput"
                                                                                                                        className="form-label"
                                                                                                                    >
                                                                                                                        .
                                                                                                                    </label>
                                                                                                                    <div className="text-end">
                                                                                                                        <button
                                                                                                                            onClick={(e: any) => {
                                                                                                                                add(e, MyConstants.waterTreatmentTypes.path);
                                                                                                                            }}
                                                                                                                            className="btn btn-primary"
                                                                                                                        >
                                                                                                                            Add
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="card-footer">
                                                                                                        <table className="table table-striped">
                                                                                                            <thead>
                                                                                                                <tr>
                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                    <th scope="col">Name</th>

                                                                                                                    <th scope="col">Action</th>
                                                                                                                </tr>
                                                                                                            </thead>
                                                                                                            <tbody>
                                                                                                                {data?.waterTreatmentTypes.map((data: any) => (
                                                                                                                    <tr key={data.id}>
                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                        <td>{data.name}</td>

                                                                                                                        <td>
                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                setName(data.name)
                                                                                                                            }}>
                                                                                                                                Edit
                                                                                                                            </button>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                ))}
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </div> :





                                                                                                primaryData == MyConstants.effluentManagements.id ?
                                                                                                    <div className="card">
                                                                                                        <div className="card-body">
                                                                                                            <h6 className="card-title">Effluent Management </h6>
                                                                                                            <div className="row gy-4">
                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                    <div>
                                                                                                                        <label
                                                                                                                            htmlFor="basiInput"
                                                                                                                            className="form-label"
                                                                                                                        >
                                                                                                                            Name
                                                                                                                        </label>
                                                                                                                        <input
                                                                                                                            type="text"
                                                                                                                            className="form-control"
                                                                                                                            id="basiInput"
                                                                                                                            value={name}
                                                                                                                            onChange={(e) =>
                                                                                                                                setName(
                                                                                                                                    e.target.value
                                                                                                                                )
                                                                                                                            }
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                <div className="col-lg-4">
                                                                                                                    <div>
                                                                                                                        <label
                                                                                                                            htmlFor="basiInput"
                                                                                                                            className="form-label"
                                                                                                                        >
                                                                                                                            .
                                                                                                                        </label>
                                                                                                                        <div className="text-end">
                                                                                                                            <button
                                                                                                                                onClick={(e: any) => {
                                                                                                                                    add(e, MyConstants.effluentManagements.path);
                                                                                                                                }}
                                                                                                                                className="btn btn-primary"
                                                                                                                            >
                                                                                                                                Add
                                                                                                                            </button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="card-footer">
                                                                                                            <table className="table table-striped">
                                                                                                                <thead>
                                                                                                                    <tr>
                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                        <th scope="col">Name</th>

                                                                                                                        <th scope="col">Action</th>
                                                                                                                    </tr>
                                                                                                                </thead>
                                                                                                                <tbody>
                                                                                                                    {data?.effluentManagements.map((data: any) => (
                                                                                                                        <tr key={data.id}>
                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                            <td>{data.name}</td>

                                                                                                                            <td>
                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                    setName(data.name)
                                                                                                                                }}>
                                                                                                                                    Edit
                                                                                                                                </button>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    ))}
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </div>
                                                                                                    </div> :
                                                                                                    primaryData == MyConstants.excretaContainments.id ?
                                                                                                        <div className="card">
                                                                                                            <div className="card-body">
                                                                                                                <h6 className="card-title">Excreta Containment </h6>
                                                                                                                <div className="row gy-4">
                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                        <div>
                                                                                                                            <label
                                                                                                                                htmlFor="basiInput"
                                                                                                                                className="form-label"
                                                                                                                            >
                                                                                                                                Name
                                                                                                                            </label>
                                                                                                                            <input
                                                                                                                                type="text"
                                                                                                                                className="form-control"
                                                                                                                                id="basiInput"
                                                                                                                                value={name}
                                                                                                                                onChange={(e) =>
                                                                                                                                    setName(
                                                                                                                                        e.target.value
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            />
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div className="col-lg-4">
                                                                                                                        <div>
                                                                                                                            <label
                                                                                                                                htmlFor="basiInput"
                                                                                                                                className="form-label"
                                                                                                                            >
                                                                                                                                .
                                                                                                                            </label>
                                                                                                                            <div className="text-end">
                                                                                                                                <button
                                                                                                                                    onClick={(e: any) => {
                                                                                                                                        add(e, MyConstants.excretaContainments.path);
                                                                                                                                    }}
                                                                                                                                    className="btn btn-primary"
                                                                                                                                >
                                                                                                                                    Add
                                                                                                                                </button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="card-footer">
                                                                                                                <table className="table table-striped">
                                                                                                                    <thead>
                                                                                                                        <tr>
                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                            <th scope="col">Name</th>

                                                                                                                            <th scope="col">Action</th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody>
                                                                                                                        {data?.excretaContainments.map((data: any) => (
                                                                                                                            <tr key={data.id}>
                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                <td>{data.name}</td>

                                                                                                                                <td>
                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                        setName(data.name)
                                                                                                                                    }}>
                                                                                                                                        Edit
                                                                                                                                    </button>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        ))}
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        </div> :
                                                                                                        primaryData == MyConstants.excretaDisposals.id ?
                                                                                                            <div className="card">
                                                                                                                <div className="card-body">
                                                                                                                    <h6 className="card-title">Excreta Disposals </h6>
                                                                                                                    <div className="row gy-4">
                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                            <div>
                                                                                                                                <label
                                                                                                                                    htmlFor="basiInput"
                                                                                                                                    className="form-label"
                                                                                                                                >
                                                                                                                                    Name
                                                                                                                                </label>
                                                                                                                                <input
                                                                                                                                    type="text"
                                                                                                                                    className="form-control"
                                                                                                                                    id="basiInput"
                                                                                                                                    value={name}
                                                                                                                                    onChange={(e) =>
                                                                                                                                        setName(
                                                                                                                                            e.target.value
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div className="col-lg-4">
                                                                                                                            <div>
                                                                                                                                <label
                                                                                                                                    htmlFor="basiInput"
                                                                                                                                    className="form-label"
                                                                                                                                >
                                                                                                                                    .
                                                                                                                                </label>
                                                                                                                                <div className="text-end">
                                                                                                                                    <button
                                                                                                                                        onClick={(e: any) => {
                                                                                                                                            add(e, MyConstants.excretaDisposals.path);
                                                                                                                                        }}
                                                                                                                                        className="btn btn-primary"
                                                                                                                                    >
                                                                                                                                        Add
                                                                                                                                    </button>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="card-footer">
                                                                                                                    <table className="table table-striped">
                                                                                                                        <thead>
                                                                                                                            <tr>
                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                <th scope="col">Name</th>

                                                                                                                                <th scope="col">Action</th>
                                                                                                                            </tr>
                                                                                                                        </thead>
                                                                                                                        <tbody>
                                                                                                                            {data?.excretaDisposals.map((data: any) => (
                                                                                                                                <tr key={data.id}>
                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                    <td>{data.name}</td>

                                                                                                                                    <td>
                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                            setName(data.name)
                                                                                                                                        }}>
                                                                                                                                            Edit
                                                                                                                                        </button>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            ))}
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </div>
                                                                                                            </div> :
                                                                                                            primaryData == MyConstants.greyWaterDisposals.id ?
                                                                                                                <div className="card">
                                                                                                                    <div className="card-body">
                                                                                                                        <h6 className="card-title">Grey Water Disposals </h6>
                                                                                                                        <div className="row gy-4">
                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                <div>
                                                                                                                                    <label
                                                                                                                                        htmlFor="basiInput"
                                                                                                                                        className="form-label"
                                                                                                                                    >
                                                                                                                                        Name
                                                                                                                                    </label>
                                                                                                                                    <input
                                                                                                                                        type="text"
                                                                                                                                        className="form-control"
                                                                                                                                        id="basiInput"
                                                                                                                                        value={name}
                                                                                                                                        onChange={(e) =>
                                                                                                                                            setName(
                                                                                                                                                e.target.value
                                                                                                                                            )
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className="col-lg-4">
                                                                                                                                <div>
                                                                                                                                    <label
                                                                                                                                        htmlFor="basiInput"
                                                                                                                                        className="form-label"
                                                                                                                                    >
                                                                                                                                        .
                                                                                                                                    </label>
                                                                                                                                    <div className="text-end">
                                                                                                                                        <button
                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                add(e, MyConstants.greyWaterDisposals.path);
                                                                                                                                            }}
                                                                                                                                            className="btn btn-primary"
                                                                                                                                        >
                                                                                                                                            Add
                                                                                                                                        </button>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className="card-footer">
                                                                                                                        <table className="table table-striped">
                                                                                                                            <thead>
                                                                                                                                <tr>
                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                </tr>
                                                                                                                            </thead>
                                                                                                                            <tbody>
                                                                                                                                {data?.greyWaterDisposals.map((data: any) => (
                                                                                                                                    <tr key={data.id}>
                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                        <td>{data.name}</td>

                                                                                                                                        <td>
                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                setName(data.name)
                                                                                                                                            }}>
                                                                                                                                                Edit
                                                                                                                                            </button>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                ))}
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </div>
                                                                                                                </div> :
                                                                                                                primaryData == MyConstants.hazardousWasteDisposals.id ?
                                                                                                                    <div className="card">
                                                                                                                        <div className="card-body">
                                                                                                                            <h6 className="card-title">Hazardous Waste Disposals</h6>
                                                                                                                            <div className="row gy-4">
                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                    <div>
                                                                                                                                        <label
                                                                                                                                            htmlFor="basiInput"
                                                                                                                                            className="form-label"
                                                                                                                                        >
                                                                                                                                            Name
                                                                                                                                        </label>
                                                                                                                                        <input
                                                                                                                                            type="text"
                                                                                                                                            className="form-control"
                                                                                                                                            id="basiInput"
                                                                                                                                            value={name}
                                                                                                                                            onChange={(e) =>
                                                                                                                                                setName(
                                                                                                                                                    e.target.value
                                                                                                                                                )
                                                                                                                                            }
                                                                                                                                        />
                                                                                                                                    </div>
                                                                                                                                </div>

                                                                                                                                <div className="col-lg-4">
                                                                                                                                    <div>
                                                                                                                                        <label
                                                                                                                                            htmlFor="basiInput"
                                                                                                                                            className="form-label"
                                                                                                                                        >
                                                                                                                                            .
                                                                                                                                        </label>
                                                                                                                                        <div className="text-end">
                                                                                                                                            <button
                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                    add(e, MyConstants.hazardousWasteDisposals.path);
                                                                                                                                                }}
                                                                                                                                                className="btn btn-primary"
                                                                                                                                            >
                                                                                                                                                Add
                                                                                                                                            </button>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="card-footer">
                                                                                                                            <table className="table table-striped">
                                                                                                                                <thead>
                                                                                                                                    <tr>
                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                    </tr>
                                                                                                                                </thead>
                                                                                                                                <tbody>
                                                                                                                                    {data?.hazardousWasteDisposals.map((data: any) => (
                                                                                                                                        <tr key={data.id}>
                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                            <td>{data.name}</td>

                                                                                                                                            <td>
                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                    setName(data.name)
                                                                                                                                                }}>
                                                                                                                                                    Edit
                                                                                                                                                </button>
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    ))}
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </div>
                                                                                                                    </div> :
                                                                                                                  
                                                                                                                        primaryData == MyConstants.nuisances.id ?
                                                                                                                            <div className="card">
                                                                                                                                <div className="card-body">
                                                                                                                                    <h6 className="card-title">Nuisances </h6>
                                                                                                                                    <div className="row gy-4">
                                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                                            <div>
                                                                                                                                                <label
                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                    className="form-label"
                                                                                                                                                >
                                                                                                                                                    Name
                                                                                                                                                </label>
                                                                                                                                                <input
                                                                                                                                                    type="text"
                                                                                                                                                    className="form-control"
                                                                                                                                                    id="basiInput"
                                                                                                                                                    value={name}
                                                                                                                                                    onChange={(e) =>
                                                                                                                                                        setName(
                                                                                                                                                            e.target.value
                                                                                                                                                        )
                                                                                                                                                    }
                                                                                                                                                />
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        <div className="col-lg-4">
                                                                                                                                            <div>
                                                                                                                                                <label
                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                    className="form-label"
                                                                                                                                                >
                                                                                                                                                    .
                                                                                                                                                </label>
                                                                                                                                                <div className="text-end">
                                                                                                                                                    <button
                                                                                                                                                        onClick={(e: any) => {
                                                                                                                                                            add(e, MyConstants.nuisances.path);
                                                                                                                                                        }}
                                                                                                                                                        className="btn btn-primary"
                                                                                                                                                    >
                                                                                                                                                        Add
                                                                                                                                                    </button>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="card-footer">
                                                                                                                                    <table className="table table-striped">
                                                                                                                                        <thead>
                                                                                                                                            <tr>
                                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                                <th scope="col">Name</th>

                                                                                                                                                <th scope="col">Action</th>
                                                                                                                                            </tr>
                                                                                                                                        </thead>
                                                                                                                                        <tbody>
                                                                                                                                            {data?.nuisances.map((data: any) => (
                                                                                                                                                <tr key={data.id}>
                                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                    <td>{data.name}</td>

                                                                                                                                                    <td>
                                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                                            setName(data.name)
                                                                                                                                                        }}>
                                                                                                                                                            Edit
                                                                                                                                                        </button>
                                                                                                                                                    </td>
                                                                                                                                                </tr>
                                                                                                                                            ))}
                                                                                                                                        </tbody>
                                                                                                                                    </table>
                                                                                                                                </div>
                                                                                                                            </div> :
                                                                                                                            primaryData == MyConstants.ownershipTypes.id ?
                                                                                                                                <div className="card">
                                                                                                                                    <div className="card-body">
                                                                                                                                        <h6 className="card-title">Ownership Types </h6>
                                                                                                                                        <div className="row gy-4">
                                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                                <div>
                                                                                                                                                    <label
                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                        className="form-label"
                                                                                                                                                    >
                                                                                                                                                        Name
                                                                                                                                                    </label>
                                                                                                                                                    <input
                                                                                                                                                        type="text"
                                                                                                                                                        className="form-control"
                                                                                                                                                        id="basiInput"
                                                                                                                                                        value={name}
                                                                                                                                                        onChange={(e) =>
                                                                                                                                                            setName(
                                                                                                                                                                e.target.value
                                                                                                                                                            )
                                                                                                                                                        }
                                                                                                                                                    />
                                                                                                                                                </div>
                                                                                                                                            </div>

                                                                                                                                            <div className="col-lg-4">
                                                                                                                                                <div>
                                                                                                                                                    <label
                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                        className="form-label"
                                                                                                                                                    >
                                                                                                                                                        .
                                                                                                                                                    </label>
                                                                                                                                                    <div className="text-end">
                                                                                                                                                        <button
                                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                                add(e, MyConstants.ownershipTypes.path);
                                                                                                                                                            }}
                                                                                                                                                            className="btn btn-primary"
                                                                                                                                                        >
                                                                                                                                                            Add
                                                                                                                                                        </button>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className="card-footer">
                                                                                                                                        <table className="table table-striped">
                                                                                                                                            <thead>
                                                                                                                                                <tr>
                                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                                </tr>
                                                                                                                                            </thead>
                                                                                                                                            <tbody>
                                                                                                                                                {data?.ownershipTypes.map((data: any) => (
                                                                                                                                                    <tr key={data.id}>
                                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                        <td>{data.name}</td>

                                                                                                                                                        <td>
                                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                setName(data.name)
                                                                                                                                                            }}>
                                                                                                                                                                Edit
                                                                                                                                                            </button>
                                                                                                                                                        </td>
                                                                                                                                                    </tr>
                                                                                                                                                ))}
                                                                                                                                            </tbody>
                                                                                                                                        </table>
                                                                                                                                    </div>
                                                                                                                                </div> :
                                                                                                                                primaryData == MyConstants.pestSigns.id ?
                                                                                                                                    <div className="card">
                                                                                                                                        <div className="card-body">
                                                                                                                                            <h6 className="card-title">Pest Signs </h6>
                                                                                                                                            <div className="row gy-4">
                                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                                    <div>
                                                                                                                                                        <label
                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                            className="form-label"
                                                                                                                                                        >
                                                                                                                                                            Name
                                                                                                                                                        </label>
                                                                                                                                                        <input
                                                                                                                                                            type="text"
                                                                                                                                                            className="form-control"
                                                                                                                                                            id="basiInput"
                                                                                                                                                            value={name}
                                                                                                                                                            onChange={(e) =>
                                                                                                                                                                setName(
                                                                                                                                                                    e.target.value
                                                                                                                                                                )
                                                                                                                                                            }
                                                                                                                                                        />
                                                                                                                                                    </div>
                                                                                                                                                </div>

                                                                                                                                                <div className="col-lg-4">
                                                                                                                                                    <div>
                                                                                                                                                        <label
                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                            className="form-label"
                                                                                                                                                        >
                                                                                                                                                            .
                                                                                                                                                        </label>
                                                                                                                                                        <div className="text-end">
                                                                                                                                                            <button
                                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                                    add(e, MyConstants.pestSigns.path);
                                                                                                                                                                }}
                                                                                                                                                                className="btn btn-primary"
                                                                                                                                                            >
                                                                                                                                                                Add
                                                                                                                                                            </button>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div className="card-footer">
                                                                                                                                            <table className="table table-striped">
                                                                                                                                                <thead>
                                                                                                                                                    <tr>
                                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                                    </tr>
                                                                                                                                                </thead>
                                                                                                                                                <tbody>
                                                                                                                                                    {data?.pestSigns.map((data: any) => (
                                                                                                                                                        <tr key={data.id}>
                                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                            <td>{data.name}</td>

                                                                                                                                                            <td>
                                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                    setName(data.name)
                                                                                                                                                                }}>
                                                                                                                                                                    Edit
                                                                                                                                                                </button>
                                                                                                                                                            </td>
                                                                                                                                                        </tr>
                                                                                                                                                    ))}
                                                                                                                                                </tbody>
                                                                                                                                            </table>
                                                                                                                                        </div>
                                                                                                                                    </div> :
                                                                                                                                    primaryData == MyConstants.premisesServices.id ?
                                                                                                                                        <div className="card">
                                                                                                                                            <div className="card-body">
                                                                                                                                                <h6 className="card-title">Premises Services </h6>
                                                                                                                                                <div className="row gy-4">
                                                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                                                        <div>
                                                                                                                                                            <label
                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                className="form-label"
                                                                                                                                                            >
                                                                                                                                                                Name
                                                                                                                                                            </label>
                                                                                                                                                            <input
                                                                                                                                                                type="text"
                                                                                                                                                                className="form-control"
                                                                                                                                                                id="basiInput"
                                                                                                                                                                value={name}
                                                                                                                                                                onChange={(e) =>
                                                                                                                                                                    setName(
                                                                                                                                                                        e.target.value
                                                                                                                                                                    )
                                                                                                                                                                }
                                                                                                                                                            />
                                                                                                                                                        </div>
                                                                                                                                                    </div>

                                                                                                                                                    <div className="col-lg-4">
                                                                                                                                                        <div>
                                                                                                                                                            <label
                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                className="form-label"
                                                                                                                                                            >
                                                                                                                                                                .
                                                                                                                                                            </label>
                                                                                                                                                            <div className="text-end">
                                                                                                                                                                <button
                                                                                                                                                                    onClick={(e: any) => {
                                                                                                                                                                        add(e, MyConstants.premisesServices.path);
                                                                                                                                                                    }}
                                                                                                                                                                    className="btn btn-primary"
                                                                                                                                                                >
                                                                                                                                                                    Add
                                                                                                                                                                </button>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div className="card-footer">
                                                                                                                                                <table className="table table-striped">
                                                                                                                                                    <thead>
                                                                                                                                                        <tr>
                                                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                                                            <th scope="col">Name</th>

                                                                                                                                                            <th scope="col">Action</th>
                                                                                                                                                        </tr>
                                                                                                                                                    </thead>
                                                                                                                                                    <tbody>
                                                                                                                                                        {data?.premisesServices.map((data: any) => (
                                                                                                                                                            <tr key={data.id}>
                                                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                <td>{data.name}</td>

                                                                                                                                                                <td>
                                                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                        setName(data.name)
                                                                                                                                                                    }}>
                                                                                                                                                                        Edit
                                                                                                                                                                    </button>
                                                                                                                                                                </td>
                                                                                                                                                            </tr>
                                                                                                                                                        ))}
                                                                                                                                                    </tbody>
                                                                                                                                                </table>
                                                                                                                                            </div>
                                                                                                                                        </div> :
                                                                                                                                        primaryData == MyConstants.premisesSubtypes.id ?
                                                                                                                                            <div className="card">
                                                                                                                                                <div className="card-body">
                                                                                                                                                    <h6 className="card-title">Premises Subtypes </h6>
                                                                                                                                                    <div className="row gy-4">
                                                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                                                            <div>
                                                                                                                                                                <label
                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                    className="form-label"
                                                                                                                                                                >
                                                                                                                                                                    Name
                                                                                                                                                                </label>
                                                                                                                                                                <input
                                                                                                                                                                    type="text"
                                                                                                                                                                    className="form-control"
                                                                                                                                                                    id="basiInput"
                                                                                                                                                                    value={name}
                                                                                                                                                                    onChange={(e) =>
                                                                                                                                                                        setName(
                                                                                                                                                                            e.target.value
                                                                                                                                                                        )
                                                                                                                                                                    }
                                                                                                                                                                />
                                                                                                                                                            </div>
                                                                                                                                                        </div>

                                                                                                                                                        <div className="col-lg-4">
                                                                                                                                                            <div>
                                                                                                                                                                <label
                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                    className="form-label"
                                                                                                                                                                >
                                                                                                                                                                    .
                                                                                                                                                                </label>
                                                                                                                                                                <div className="text-end">
                                                                                                                                                                    <button
                                                                                                                                                                        onClick={(e: any) => {
                                                                                                                                                                            add(e, MyConstants.premisesSubtypes.path);
                                                                                                                                                                        }}
                                                                                                                                                                        className="btn btn-primary"
                                                                                                                                                                    >
                                                                                                                                                                        Add
                                                                                                                                                                    </button>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                                <div className="card-footer">
                                                                                                                                                    <table className="table table-striped">
                                                                                                                                                        <thead>
                                                                                                                                                            <tr>
                                                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                                                <th scope="col">Name</th>

                                                                                                                                                                <th scope="col">Action</th>
                                                                                                                                                            </tr>
                                                                                                                                                        </thead>
                                                                                                                                                        <tbody>
                                                                                                                                                            {data?.premisesSubtypes.map((data: any) => (
                                                                                                                                                                <tr key={data.id}>
                                                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                    <td>{data.name}</td>

                                                                                                                                                                    <td>
                                                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                            setName(data.name)
                                                                                                                                                                        }}>
                                                                                                                                                                            Edit
                                                                                                                                                                        </button>
                                                                                                                                                                    </td>
                                                                                                                                                                </tr>
                                                                                                                                                            ))}
                                                                                                                                                        </tbody>
                                                                                                                                                    </table>
                                                                                                                                                </div>
                                                                                                                                            </div> :
                                                                                                                                            primaryData == MyConstants.premisesTypes.id ?
                                                                                                                                                <div className="card">
                                                                                                                                                    <div className="card-body">
                                                                                                                                                        <h6 className="card-title">Premises Types </h6>
                                                                                                                                                        <div className="row gy-4">
                                                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                                                <div>
                                                                                                                                                                    <label
                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                        className="form-label"
                                                                                                                                                                    >
                                                                                                                                                                        Name
                                                                                                                                                                    </label>
                                                                                                                                                                    <input
                                                                                                                                                                        type="text"
                                                                                                                                                                        className="form-control"
                                                                                                                                                                        id="basiInput"
                                                                                                                                                                        value={name}
                                                                                                                                                                        onChange={(e) =>
                                                                                                                                                                            setName(
                                                                                                                                                                                e.target.value
                                                                                                                                                                            )
                                                                                                                                                                        }
                                                                                                                                                                    />
                                                                                                                                                                </div>
                                                                                                                                                            </div>

                                                                                                                                                            <div className="col-lg-4">
                                                                                                                                                                <div>
                                                                                                                                                                    <label
                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                        className="form-label"
                                                                                                                                                                    >
                                                                                                                                                                        .
                                                                                                                                                                    </label>
                                                                                                                                                                    <div className="text-end">
                                                                                                                                                                        <button
                                                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                                                add(e, MyConstants.premisesTypes.path);
                                                                                                                                                                            }}
                                                                                                                                                                            className="btn btn-primary"
                                                                                                                                                                        >
                                                                                                                                                                            Add
                                                                                                                                                                        </button>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                    <div className="card-footer">
                                                                                                                                                        <table className="table table-striped">
                                                                                                                                                            <thead>
                                                                                                                                                                <tr>
                                                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                                                </tr>
                                                                                                                                                            </thead>
                                                                                                                                                            <tbody>
                                                                                                                                                                {data?.premisesTypes.map((data: any) => (
                                                                                                                                                                    <tr key={data.id}>
                                                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                        <td>{data.name}</td>

                                                                                                                                                                        <td>
                                                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                setName(data.name)
                                                                                                                                                                            }}>
                                                                                                                                                                                Edit
                                                                                                                                                                            </button>
                                                                                                                                                                        </td>
                                                                                                                                                                    </tr>
                                                                                                                                                                ))}
                                                                                                                                                            </tbody>
                                                                                                                                                        </table>
                                                                                                                                                    </div>
                                                                                                                                                </div> :
                                                                                                                                                primaryData == MyConstants.respondentDesignations.id ?
                                                                                                                                                    <div className="card">
                                                                                                                                                        <div className="card-body">
                                                                                                                                                            <h6 className="card-title">Respondent Designations </h6>
                                                                                                                                                            <div className="row gy-4">
                                                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                                                    <div>
                                                                                                                                                                        <label
                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                            className="form-label"
                                                                                                                                                                        >
                                                                                                                                                                            Name
                                                                                                                                                                        </label>
                                                                                                                                                                        <input
                                                                                                                                                                            type="text"
                                                                                                                                                                            className="form-control"
                                                                                                                                                                            id="basiInput"
                                                                                                                                                                            value={name}
                                                                                                                                                                            onChange={(e) =>
                                                                                                                                                                                setName(
                                                                                                                                                                                    e.target.value
                                                                                                                                                                                )
                                                                                                                                                                            }
                                                                                                                                                                        />
                                                                                                                                                                    </div>
                                                                                                                                                                </div>

                                                                                                                                                                <div className="col-lg-4">
                                                                                                                                                                    <div>
                                                                                                                                                                        <label
                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                            className="form-label"
                                                                                                                                                                        >
                                                                                                                                                                            .
                                                                                                                                                                        </label>
                                                                                                                                                                        <div className="text-end">
                                                                                                                                                                            <button
                                                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                                                    add(e, MyConstants.respondentDesignations.path);
                                                                                                                                                                                }}
                                                                                                                                                                                className="btn btn-primary"
                                                                                                                                                                            >
                                                                                                                                                                                Add
                                                                                                                                                                            </button>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                        <div className="card-footer">
                                                                                                                                                            <table className="table table-striped">
                                                                                                                                                                <thead>
                                                                                                                                                                    <tr>
                                                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                                                    </tr>
                                                                                                                                                                </thead>
                                                                                                                                                                <tbody>
                                                                                                                                                                    {data?.respondentDesignations.map((data: any) => (
                                                                                                                                                                        <tr key={data.id}>
                                                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                            <td>{data.name}</td>

                                                                                                                                                                            <td>
                                                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                    setName(data.name)
                                                                                                                                                                                }}>
                                                                                                                                                                                    Edit
                                                                                                                                                                                </button>
                                                                                                                                                                            </td>
                                                                                                                                                                        </tr>
                                                                                                                                                                    ))}
                                                                                                                                                                </tbody>
                                                                                                                                                            </table>
                                                                                                                                                        </div>
                                                                                                                                                    </div> :
                                                                                                                                                    primaryData == MyConstants.sewerSystems.id ?
                                                                                                                                                        <div className="card">
                                                                                                                                                            <div className="card-body">
                                                                                                                                                                <h6 className="card-title">Sewer systems </h6>
                                                                                                                                                                <div className="row gy-4">
                                                                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                                                                        <div>
                                                                                                                                                                            <label
                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                className="form-label"
                                                                                                                                                                            >
                                                                                                                                                                                Name
                                                                                                                                                                            </label>
                                                                                                                                                                            <input
                                                                                                                                                                                type="text"
                                                                                                                                                                                className="form-control"
                                                                                                                                                                                id="basiInput"
                                                                                                                                                                                value={name}
                                                                                                                                                                                onChange={(e) =>
                                                                                                                                                                                    setName(
                                                                                                                                                                                        e.target.value
                                                                                                                                                                                    )
                                                                                                                                                                                }
                                                                                                                                                                            />
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>

                                                                                                                                                                    <div className="col-lg-4">
                                                                                                                                                                        <div>
                                                                                                                                                                            <label
                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                className="form-label"
                                                                                                                                                                            >
                                                                                                                                                                                .
                                                                                                                                                                            </label>
                                                                                                                                                                            <div className="text-end">
                                                                                                                                                                                <button
                                                                                                                                                                                    onClick={(e: any) => {
                                                                                                                                                                                        add(e, MyConstants.sewerSystems.path);
                                                                                                                                                                                    }}
                                                                                                                                                                                    className="btn btn-primary"
                                                                                                                                                                                >
                                                                                                                                                                                    Add
                                                                                                                                                                                </button>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                            </div>
                                                                                                                                                            <div className="card-footer">
                                                                                                                                                                <table className="table table-striped">
                                                                                                                                                                    <thead>
                                                                                                                                                                        <tr>
                                                                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                                                                            <th scope="col">Name</th>

                                                                                                                                                                            <th scope="col">Action</th>
                                                                                                                                                                        </tr>
                                                                                                                                                                    </thead>
                                                                                                                                                                    <tbody>
                                                                                                                                                                        {data?.sewerSystems.map((data: any) => (
                                                                                                                                                                            <tr key={data.id}>
                                                                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                <td>{data.name}</td>

                                                                                                                                                                                <td>
                                                                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                        setName(data.name)
                                                                                                                                                                                    }}>
                                                                                                                                                                                        Edit
                                                                                                                                                                                    </button>
                                                                                                                                                                                </td>
                                                                                                                                                                            </tr>
                                                                                                                                                                        ))}
                                                                                                                                                                    </tbody>
                                                                                                                                                                </table>
                                                                                                                                                            </div>
                                                                                                                                                        </div> :
                                                                                                                                                        primaryData == MyConstants.toiletHouseholdNumbers.id ?
                                                                                                                                                            <div className="card">
                                                                                                                                                                <div className="card-body">
                                                                                                                                                                    <h6 className="card-title">Toilet Household Number </h6>
                                                                                                                                                                    <div className="row gy-4">
                                                                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                                                                            <div>
                                                                                                                                                                                <label
                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                >
                                                                                                                                                                                    Name
                                                                                                                                                                                </label>
                                                                                                                                                                                <input
                                                                                                                                                                                    type="text"
                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                    id="basiInput"
                                                                                                                                                                                    value={name}
                                                                                                                                                                                    onChange={(e) =>
                                                                                                                                                                                        setName(
                                                                                                                                                                                            e.target.value
                                                                                                                                                                                        )
                                                                                                                                                                                    }
                                                                                                                                                                                />
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>

                                                                                                                                                                        <div className="col-lg-4">
                                                                                                                                                                            <div>
                                                                                                                                                                                <label
                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                >
                                                                                                                                                                                    .
                                                                                                                                                                                </label>
                                                                                                                                                                                <div className="text-end">
                                                                                                                                                                                    <button
                                                                                                                                                                                        onClick={(e: any) => {
                                                                                                                                                                                            add(e, MyConstants.toiletHouseholdNumbers.path);
                                                                                                                                                                                        }}
                                                                                                                                                                                        className="btn btn-primary"
                                                                                                                                                                                    >
                                                                                                                                                                                        Add
                                                                                                                                                                                    </button>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                </div>
                                                                                                                                                                <div className="card-footer">
                                                                                                                                                                    <table className="table table-striped">
                                                                                                                                                                        <thead>
                                                                                                                                                                            <tr>
                                                                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                                                                <th scope="col">Name</th>

                                                                                                                                                                                <th scope="col">Action</th>
                                                                                                                                                                            </tr>
                                                                                                                                                                        </thead>
                                                                                                                                                                        <tbody>
                                                                                                                                                                            {data?.toiletHouseholdNumbers.map((data: any) => (
                                                                                                                                                                                <tr key={data.id}>
                                                                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                    <td>{data.name}</td>

                                                                                                                                                                                    <td>
                                                                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                            setName(data.name)
                                                                                                                                                                                        }}>
                                                                                                                                                                                            Edit
                                                                                                                                                                                        </button>
                                                                                                                                                                                    </td>
                                                                                                                                                                                </tr>
                                                                                                                                                                            ))}
                                                                                                                                                                        </tbody>
                                                                                                                                                                    </table>
                                                                                                                                                                </div>
                                                                                                                                                            </div> :
                                                                                                                                                            primaryData == MyConstants.toiletPitPositions.id ?
                                                                                                                                                                <div className="card">
                                                                                                                                                                    <div className="card-body">
                                                                                                                                                                        <h6 className="card-title">Toilet Pit Positions </h6>
                                                                                                                                                                        <div className="row gy-4">
                                                                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                <div>
                                                                                                                                                                                    <label
                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                    >
                                                                                                                                                                                        Name
                                                                                                                                                                                    </label>
                                                                                                                                                                                    <input
                                                                                                                                                                                        type="text"
                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                        id="basiInput"
                                                                                                                                                                                        value={name}
                                                                                                                                                                                        onChange={(e) =>
                                                                                                                                                                                            setName(
                                                                                                                                                                                                e.target.value
                                                                                                                                                                                            )
                                                                                                                                                                                        }
                                                                                                                                                                                    />
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>

                                                                                                                                                                            <div className="col-lg-4">
                                                                                                                                                                                <div>
                                                                                                                                                                                    <label
                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                    >
                                                                                                                                                                                        .
                                                                                                                                                                                    </label>
                                                                                                                                                                                    <div className="text-end">
                                                                                                                                                                                        <button
                                                                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                                                                add(e, MyConstants.toiletPitPositions.path);
                                                                                                                                                                                            }}
                                                                                                                                                                                            className="btn btn-primary"
                                                                                                                                                                                        >
                                                                                                                                                                                            Add
                                                                                                                                                                                        </button>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div>
                                                                                                                                                                    <div className="card-footer">
                                                                                                                                                                        <table className="table table-striped">
                                                                                                                                                                            <thead>
                                                                                                                                                                                <tr>
                                                                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                                                                </tr>
                                                                                                                                                                            </thead>
                                                                                                                                                                            <tbody>
                                                                                                                                                                                {data?.toiletPitPositions.map((data: any) => (
                                                                                                                                                                                    <tr key={data.id}>
                                                                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                        <td>{data.name}</td>

                                                                                                                                                                                        <td>
                                                                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                setName(data.name)
                                                                                                                                                                                            }}>
                                                                                                                                                                                                Edit
                                                                                                                                                                                            </button>
                                                                                                                                                                                        </td>
                                                                                                                                                                                    </tr>
                                                                                                                                                                                ))}
                                                                                                                                                                            </tbody>
                                                                                                                                                                        </table>
                                                                                                                                                                    </div>
                                                                                                                                                                </div> :
                                                                                                                                                                primaryData == MyConstants.unsafeToiletConditions.id ?
                                                                                                                                                                    <div className="card">
                                                                                                                                                                        <div className="card-body">
                                                                                                                                                                            <h6 className="card-title">Unsafe Toilet Conditions </h6>
                                                                                                                                                                            <div className="row gy-4">
                                                                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                    <div>
                                                                                                                                                                                        <label
                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                        >
                                                                                                                                                                                            Name
                                                                                                                                                                                        </label>
                                                                                                                                                                                        <input
                                                                                                                                                                                            type="text"
                                                                                                                                                                                            className="form-control"
                                                                                                                                                                                            id="basiInput"
                                                                                                                                                                                            value={name}
                                                                                                                                                                                            onChange={(e) =>
                                                                                                                                                                                                setName(
                                                                                                                                                                                                    e.target.value
                                                                                                                                                                                                )
                                                                                                                                                                                            }
                                                                                                                                                                                        />
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>

                                                                                                                                                                                <div className="col-lg-4">
                                                                                                                                                                                    <div>
                                                                                                                                                                                        <label
                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                        >
                                                                                                                                                                                            .
                                                                                                                                                                                        </label>
                                                                                                                                                                                        <div className="text-end">
                                                                                                                                                                                            <button
                                                                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                                                                    add(e, MyConstants.unsafeToiletConditions.path);
                                                                                                                                                                                                }}
                                                                                                                                                                                                className="btn btn-primary"
                                                                                                                                                                                            >
                                                                                                                                                                                                Add
                                                                                                                                                                                            </button>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div>
                                                                                                                                                                        <div className="card-footer">
                                                                                                                                                                            <table className="table table-striped">
                                                                                                                                                                                <thead>
                                                                                                                                                                                    <tr>
                                                                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                                                                    </tr>
                                                                                                                                                                                </thead>
                                                                                                                                                                                <tbody>
                                                                                                                                                                                    {data?.unsafeToiletConditions.map((data: any) => (
                                                                                                                                                                                        <tr key={data.id}>
                                                                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                            <td>{data.name}</td>

                                                                                                                                                                                            <td>
                                                                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                    setName(data.name)
                                                                                                                                                                                                }}>
                                                                                                                                                                                                    Edit
                                                                                                                                                                                                </button>
                                                                                                                                                                                            </td>
                                                                                                                                                                                        </tr>
                                                                                                                                                                                    ))}
                                                                                                                                                                                </tbody>
                                                                                                                                                                            </table>
                                                                                                                                                                        </div>
                                                                                                                                                                    </div> : primaryData == MyConstants.toiletTypes.id ?
                                                                                                                                                                        <div className="card">
                                                                                                                                                                            <div className="card-body">
                                                                                                                                                                                <h6 className="card-title">Toliet type </h6>
                                                                                                                                                                                <div className="row gy-4">
                                                                                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                        <div>
                                                                                                                                                                                            <label
                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                            >
                                                                                                                                                                                                Name
                                                                                                                                                                                            </label>
                                                                                                                                                                                            <input
                                                                                                                                                                                                type="text"
                                                                                                                                                                                                className="form-control"
                                                                                                                                                                                                id="basiInput"
                                                                                                                                                                                                value={name}
                                                                                                                                                                                                onChange={(e) =>
                                                                                                                                                                                                    setName(
                                                                                                                                                                                                        e.target.value
                                                                                                                                                                                                    )
                                                                                                                                                                                                }
                                                                                                                                                                                            />
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>

                                                                                                                                                                                    <div className="col-lg-4">
                                                                                                                                                                                        <div>
                                                                                                                                                                                            <label
                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                            >
                                                                                                                                                                                                .
                                                                                                                                                                                            </label>
                                                                                                                                                                                            <div className="text-end">
                                                                                                                                                                                                <button
                                                                                                                                                                                                    onClick={(e: any) => {
                                                                                                                                                                                                        add(e, MyConstants.toiletTypes.path);
                                                                                                                                                                                                    }}
                                                                                                                                                                                                    className="btn btn-primary"
                                                                                                                                                                                                >
                                                                                                                                                                                                    Add
                                                                                                                                                                                                </button>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div>
                                                                                                                                                                            <div className="card-footer">
                                                                                                                                                                                <table className="table table-striped">
                                                                                                                                                                                    <thead>
                                                                                                                                                                                        <tr>
                                                                                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                                                                                            <th scope="col">Name</th>

                                                                                                                                                                                            <th scope="col">Action</th>
                                                                                                                                                                                        </tr>
                                                                                                                                                                                    </thead>
                                                                                                                                                                                    <tbody>
                                                                                                                                                                                        {data?.toiletTypes.map((data: any) => (
                                                                                                                                                                                            <tr key={data.id}>
                                                                                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                <td>{data.name}</td>

                                                                                                                                                                                                <td>
                                                                                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                        setName(data.name)
                                                                                                                                                                                                    }}>
                                                                                                                                                                                                        Edit
                                                                                                                                                                                                    </button>
                                                                                                                                                                                                </td>
                                                                                                                                                                                            </tr>
                                                                                                                                                                                        ))}
                                                                                                                                                                                    </tbody>
                                                                                                                                                                                </table>
                                                                                                                                                                            </div>
                                                                                                                                                                        </div> :
                                                                                                                                                                        primaryData == MyConstants.unsafeWaterStorages.id ?
                                                                                                                                                                            <div className="card">
                                                                                                                                                                                <div className="card-body">
                                                                                                                                                                                    <h6 className="card-title">Unsafe Water Storage </h6>
                                                                                                                                                                                    <div className="row gy-4">
                                                                                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                            <div>
                                                                                                                                                                                                <label
                                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                                >
                                                                                                                                                                                                    Name
                                                                                                                                                                                                </label>
                                                                                                                                                                                                <input
                                                                                                                                                                                                    type="text"
                                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                                    id="basiInput"
                                                                                                                                                                                                    value={name}
                                                                                                                                                                                                    onChange={(e) =>
                                                                                                                                                                                                        setName(
                                                                                                                                                                                                            e.target.value
                                                                                                                                                                                                        )
                                                                                                                                                                                                    }
                                                                                                                                                                                                />
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>

                                                                                                                                                                                        <div className="col-lg-4">
                                                                                                                                                                                            <div>
                                                                                                                                                                                                <label
                                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                                >
                                                                                                                                                                                                    .
                                                                                                                                                                                                </label>
                                                                                                                                                                                                <div className="text-end">
                                                                                                                                                                                                    <button
                                                                                                                                                                                                        onClick={(e: any) => {
                                                                                                                                                                                                            add(e, MyConstants.unsafeWaterStorages.path);
                                                                                                                                                                                                        }}
                                                                                                                                                                                                        className="btn btn-primary"
                                                                                                                                                                                                    >
                                                                                                                                                                                                        Add
                                                                                                                                                                                                    </button>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div className="card-footer">
                                                                                                                                                                                    <table className="table table-striped">
                                                                                                                                                                                        <thead>
                                                                                                                                                                                            <tr>
                                                                                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                <th scope="col">Name</th>

                                                                                                                                                                                                <th scope="col">Action</th>
                                                                                                                                                                                            </tr>
                                                                                                                                                                                        </thead>
                                                                                                                                                                                        <tbody>
                                                                                                                                                                                            {data?.unsafeWaterStorages.map((data: any) => (
                                                                                                                                                                                                <tr key={data.id}>
                                                                                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                    <td>{data.name}</td>

                                                                                                                                                                                                    <td>
                                                                                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                            setName(data.name)
                                                                                                                                                                                                        }}>
                                                                                                                                                                                                            Edit
                                                                                                                                                                                                        </button>
                                                                                                                                                                                                    </td>
                                                                                                                                                                                                </tr>
                                                                                                                                                                                            ))}
                                                                                                                                                                                        </tbody>
                                                                                                                                                                                    </table>
                                                                                                                                                                                </div>
                                                                                                                                                                            </div> :
                                                                                                                                                                            primaryData == MyConstants.unservicedWasteDisposals.id ?
                                                                                                                                                                                <div className="card">
                                                                                                                                                                                    <div className="card-body">
                                                                                                                                                                                        <h6 className="card-title">Unserviced Waste Disposals </h6>
                                                                                                                                                                                        <div className="row gy-4">
                                                                                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                <div>
                                                                                                                                                                                                    <label
                                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                                    >
                                                                                                                                                                                                        Name
                                                                                                                                                                                                    </label>
                                                                                                                                                                                                    <input
                                                                                                                                                                                                        type="text"
                                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                                        id="basiInput"
                                                                                                                                                                                                        value={name}
                                                                                                                                                                                                        onChange={(e) =>
                                                                                                                                                                                                            setName(
                                                                                                                                                                                                                e.target.value
                                                                                                                                                                                                            )
                                                                                                                                                                                                        }
                                                                                                                                                                                                    />
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>

                                                                                                                                                                                            <div className="col-lg-4">
                                                                                                                                                                                                <div>
                                                                                                                                                                                                    <label
                                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                                    >
                                                                                                                                                                                                        .
                                                                                                                                                                                                    </label>
                                                                                                                                                                                                    <div className="text-end">
                                                                                                                                                                                                        <button
                                                                                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                                                                                add(e, MyConstants.unservicedWasteDisposals.path);
                                                                                                                                                                                                            }}
                                                                                                                                                                                                            className="btn btn-primary"
                                                                                                                                                                                                        >
                                                                                                                                                                                                            Add
                                                                                                                                                                                                        </button>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div>
                                                                                                                                                                                    <div className="card-footer">
                                                                                                                                                                                        <table className="table table-striped">
                                                                                                                                                                                            <thead>
                                                                                                                                                                                                <tr>
                                                                                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                                                                                </tr>
                                                                                                                                                                                            </thead>
                                                                                                                                                                                            <tbody>
                                                                                                                                                                                                {data?.unservicedWasteDisposals.map((data: any) => (
                                                                                                                                                                                                    <tr key={data.id}>
                                                                                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                        <td>{data.name}</td>

                                                                                                                                                                                                        <td>
                                                                                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                setName(data.name)
                                                                                                                                                                                                            }}>
                                                                                                                                                                                                                Edit
                                                                                                                                                                                                            </button>
                                                                                                                                                                                                        </td>
                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                ))}
                                                                                                                                                                                            </tbody>
                                                                                                                                                                                        </table>
                                                                                                                                                                                    </div>
                                                                                                                                                                                </div> :
                                                                                                                                                                                primaryData == MyConstants.wasteStorageReceptacles.id ?
                                                                                                                                                                                    <div className="card">
                                                                                                                                                                                        <div className="card-body">
                                                                                                                                                                                            <h6 className="card-title"> Waste Storage Receptacle </h6>
                                                                                                                                                                                            <div className="row gy-4">
                                                                                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                    <div>
                                                                                                                                                                                                        <label
                                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                                        >
                                                                                                                                                                                                            Name
                                                                                                                                                                                                        </label>
                                                                                                                                                                                                        <input
                                                                                                                                                                                                            type="text"
                                                                                                                                                                                                            className="form-control"
                                                                                                                                                                                                            id="basiInput"
                                                                                                                                                                                                            value={name}
                                                                                                                                                                                                            onChange={(e) =>
                                                                                                                                                                                                                setName(
                                                                                                                                                                                                                    e.target.value
                                                                                                                                                                                                                )
                                                                                                                                                                                                            }
                                                                                                                                                                                                        />
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>

                                                                                                                                                                                                <div className="col-lg-4">
                                                                                                                                                                                                    <div>
                                                                                                                                                                                                        <label
                                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                                        >
                                                                                                                                                                                                            .
                                                                                                                                                                                                        </label>
                                                                                                                                                                                                        <div className="text-end">
                                                                                                                                                                                                            <button
                                                                                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                                                                                    add(e, MyConstants.wasteStorageReceptacles.path);
                                                                                                                                                                                                                }}
                                                                                                                                                                                                                className="btn btn-primary"
                                                                                                                                                                                                            >
                                                                                                                                                                                                                Add
                                                                                                                                                                                                            </button>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div>
                                                                                                                                                                                        <div className="card-footer">
                                                                                                                                                                                            <table className="table table-striped">
                                                                                                                                                                                                <thead>
                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                </thead>
                                                                                                                                                                                                <tbody>
                                                                                                                                                                                                    {data?.wasteStorageReceptacles.map((data: any) => (
                                                                                                                                                                                                        <tr key={data.id}>
                                                                                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                            <td>{data.name}</td>

                                                                                                                                                                                                            <td>
                                                                                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                    setName(data.name)
                                                                                                                                                                                                                }}>
                                                                                                                                                                                                                    Edit
                                                                                                                                                                                                                </button>
                                                                                                                                                                                                            </td>
                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                    ))}
                                                                                                                                                                                                </tbody>
                                                                                                                                                                                            </table>
                                                                                                                                                                                        </div>
                                                                                                                                                                                    </div> :
                                                                                                                                                                                    primaryData == MyConstants.wasteCollectionFrequencies.id ?
                                                                                                                                                                                        <div className="card">
                                                                                                                                                                                            <div className="card-body">
                                                                                                                                                                                                <h6 className="card-title">Waste Collection Frequencies </h6>
                                                                                                                                                                                                <div className="row gy-4">
                                                                                                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                            <label
                                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                                            >
                                                                                                                                                                                                                Name
                                                                                                                                                                                                            </label>
                                                                                                                                                                                                            <input
                                                                                                                                                                                                                type="text"
                                                                                                                                                                                                                className="form-control"
                                                                                                                                                                                                                id="basiInput"
                                                                                                                                                                                                                value={name}
                                                                                                                                                                                                                onChange={(e) =>
                                                                                                                                                                                                                    setName(
                                                                                                                                                                                                                        e.target.value
                                                                                                                                                                                                                    )
                                                                                                                                                                                                                }
                                                                                                                                                                                                            />
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>

                                                                                                                                                                                                    <div className="col-lg-4">
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                            <label
                                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                                            >
                                                                                                                                                                                                                .
                                                                                                                                                                                                            </label>
                                                                                                                                                                                                            <div className="text-end">
                                                                                                                                                                                                                <button
                                                                                                                                                                                                                    onClick={(e: any) => {
                                                                                                                                                                                                                        add(e, MyConstants.wasteCollectionFrequencies.path);
                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                    className="btn btn-primary"
                                                                                                                                                                                                                >
                                                                                                                                                                                                                    Add
                                                                                                                                                                                                                </button>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div>
                                                                                                                                                                                            <div className="card-footer">
                                                                                                                                                                                                <table className="table table-striped">
                                                                                                                                                                                                    <thead>
                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                            <th scope="col">Name</th>

                                                                                                                                                                                                            <th scope="col">Action</th>
                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                    </thead>
                                                                                                                                                                                                    <tbody>
                                                                                                                                                                                                        {data?.wasteCollectionFrequencies.map((data: any) => (
                                                                                                                                                                                                            <tr key={data.id}>
                                                                                                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                                <td>{data.name}</td>

                                                                                                                                                                                                                <td>
                                                                                                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                        setName(data.name)
                                                                                                                                                                                                                    }}>
                                                                                                                                                                                                                        Edit
                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                </td>
                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                        ))}
                                                                                                                                                                                                    </tbody>
                                                                                                                                                                                                </table>
                                                                                                                                                                                            </div>
                                                                                                                                                                                        </div> :
                                                                                                                                                                                        primaryData == MyConstants.wasteCollectionTypes.id ?
                                                                                                                                                                                            <div className="card">
                                                                                                                                                                                                <div className="card-body">
                                                                                                                                                                                                    <h6 className="card-title">Waste Collection Types </h6>
                                                                                                                                                                                                    <div className="row gy-4">
                                                                                                                                                                                                        <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                <label
                                                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                                                >
                                                                                                                                                                                                                    Name
                                                                                                                                                                                                                </label>
                                                                                                                                                                                                                <input
                                                                                                                                                                                                                    type="text"
                                                                                                                                                                                                                    className="form-control"
                                                                                                                                                                                                                    id="basiInput"
                                                                                                                                                                                                                    value={name}
                                                                                                                                                                                                                    onChange={(e) =>
                                                                                                                                                                                                                        setName(
                                                                                                                                                                                                                            e.target.value
                                                                                                                                                                                                                        )
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                />
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>

                                                                                                                                                                                                        <div className="col-lg-4">
                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                <label
                                                                                                                                                                                                                    htmlFor="basiInput"
                                                                                                                                                                                                                    className="form-label"
                                                                                                                                                                                                                >
                                                                                                                                                                                                                    .
                                                                                                                                                                                                                </label>
                                                                                                                                                                                                                <div className="text-end">
                                                                                                                                                                                                                    <button
                                                                                                                                                                                                                        onClick={(e: any) => {
                                                                                                                                                                                                                            add(e,MyConstants.wasteCollectionTypes.path);
                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                        className="btn btn-primary"
                                                                                                                                                                                                                    >
                                                                                                                                                                                                                        Add
                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                <div className="card-footer">
                                                                                                                                                                                                    <table className="table table-striped">
                                                                                                                                                                                                        <thead>
                                                                                                                                                                                                            <tr>
                                                                                                                                                                                                                {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                                <th scope="col">Name</th>

                                                                                                                                                                                                                <th scope="col">Action</th>
                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                        </thead>
                                                                                                                                                                                                        <tbody>
                                                                                                                                                                                                            {data?.wasteCollectionTypes.map((data: any) => (
                                                                                                                                                                                                                <tr key={data.id}>
                                                                                                                                                                                                                    {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                                    <td>{data.name}</td>

                                                                                                                                                                                                                    <td>
                                                                                                                                                                                                                        <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                            setName(data.name)
                                                                                                                                                                                                                        }}>
                                                                                                                                                                                                                            Edit
                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                    </td>
                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                            ))}
                                                                                                                                                                                                        </tbody>
                                                                                                                                                                                                    </table>
                                                                                                                                                                                                </div>
                                                                                                                                                                                            </div> :
                                                                                                                                                                                            primaryData == MyConstants.wasteWaterContainments.id ?
                                                                                                                                                                                                <div className="card">
                                                                                                                                                                                                    <div className="card-body">
                                                                                                                                                                                                        <h6 className="card-title">Waste Water Containments </h6>
                                                                                                                                                                                                        <div className="row gy-4">
                                                                                                                                                                                                            <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                    <label
                                                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                                                    >
                                                                                                                                                                                                                        Name
                                                                                                                                                                                                                    </label>
                                                                                                                                                                                                                    <input
                                                                                                                                                                                                                        type="text"
                                                                                                                                                                                                                        className="form-control"
                                                                                                                                                                                                                        id="basiInput"
                                                                                                                                                                                                                        value={name}
                                                                                                                                                                                                                        onChange={(e) =>
                                                                                                                                                                                                                            setName(
                                                                                                                                                                                                                                e.target.value
                                                                                                                                                                                                                            )
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    />
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>

                                                                                                                                                                                                            <div className="col-lg-4">
                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                    <label
                                                                                                                                                                                                                        htmlFor="basiInput"
                                                                                                                                                                                                                        className="form-label"
                                                                                                                                                                                                                    >
                                                                                                                                                                                                                        .
                                                                                                                                                                                                                    </label>
                                                                                                                                                                                                                    <div className="text-end">
                                                                                                                                                                                                                        <button
                                                                                                                                                                                                                            onClick={(e: any) => {
                                                                                                                                                                                                                                add(e, MyConstants.wasteWaterContainments.path);
                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                            className="btn btn-primary"
                                                                                                                                                                                                                        >
                                                                                                                                                                                                                            Add
                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                    <div className="card-footer">
                                                                                                                                                                                                        <table className="table table-striped">
                                                                                                                                                                                                            <thead>
                                                                                                                                                                                                                <tr>
                                                                                                                                                                                                                    {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                                    <th scope="col">Name</th>

                                                                                                                                                                                                                    <th scope="col">Action</th>
                                                                                                                                                                                                                </tr>
                                                                                                                                                                                                            </thead>
                                                                                                                                                                                                            <tbody>
                                                                                                                                                                                                                {data?.wasteWaterContainments.map((data: any) => (
                                                                                                                                                                                                                    <tr key={data.id}>
                                                                                                                                                                                                                        {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                                        <td>{data.name}</td>

                                                                                                                                                                                                                        <td>
                                                                                                                                                                                                                            <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                                setName(data.name)
                                                                                                                                                                                                                            }}>
                                                                                                                                                                                                                                Edit
                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                        </td>
                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                ))}
                                                                                                                                                                                                            </tbody>
                                                                                                                                                                                                        </table>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                </div> :
                                                                                                                                                                                                primaryData == MyConstants.waterFlowFrequencies.id ?
                                                                                                                                                                                                    <div className="card">
                                                                                                                                                                                                        <div className="card-body">
                                                                                                                                                                                                            <h6 className="card-title">Water Flow Frequency </h6>
                                                                                                                                                                                                            <div className="row gy-4">
                                                                                                                                                                                                                <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                        <label
                                                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                                                        >
                                                                                                                                                                                                                            Name
                                                                                                                                                                                                                        </label>
                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                            type="text"
                                                                                                                                                                                                                            className="form-control"
                                                                                                                                                                                                                            id="basiInput"
                                                                                                                                                                                                                            value={name}
                                                                                                                                                                                                                            onChange={(e) =>
                                                                                                                                                                                                                                setName(
                                                                                                                                                                                                                                    e.target.value
                                                                                                                                                                                                                                )
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        />
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                <div className="col-lg-4">
                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                        <label
                                                                                                                                                                                                                            htmlFor="basiInput"
                                                                                                                                                                                                                            className="form-label"
                                                                                                                                                                                                                        >
                                                                                                                                                                                                                            .
                                                                                                                                                                                                                        </label>
                                                                                                                                                                                                                        <div className="text-end">
                                                                                                                                                                                                                            <button
                                                                                                                                                                                                                                onClick={(e: any) => {
                                                                                                                                                                                                                                    add(e, MyConstants.waterFlowFrequencies.path);
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                className="btn btn-primary"
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                Add
                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                        <div className="card-footer">
                                                                                                                                                                                                            <table className="table table-striped">
                                                                                                                                                                                                                <thead>
                                                                                                                                                                                                                    <tr>
                                                                                                                                                                                                                        {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                                        <th scope="col">Name</th>

                                                                                                                                                                                                                        <th scope="col">Action</th>
                                                                                                                                                                                                                    </tr>
                                                                                                                                                                                                                </thead>
                                                                                                                                                                                                                <tbody>
                                                                                                                                                                                                                    {data?.waterFlowFrequencies.map((data: any) => (
                                                                                                                                                                                                                        <tr key={data.id}>
                                                                                                                                                                                                                            {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                                            <td>{data.name}</td>

                                                                                                                                                                                                                            <td>
                                                                                                                                                                                                                                <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                                    setName(data.name)
                                                                                                                                                                                                                                }}>
                                                                                                                                                                                                                                    Edit
                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                            </td>
                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                </tbody>
                                                                                                                                                                                                            </table>
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    </div> :
                                                                                                                                                                                                    primaryData == MyConstants.waterFlowFrequencies.id ?
                                                                                                                                                                                                        <div className="card">
                                                                                                                                                                                                            <div className="card-body">
                                                                                                                                                                                                                <h6 className="card-title">Water Flow Frequency </h6>
                                                                                                                                                                                                                <div className="row gy-4">
                                                                                                                                                                                                                    <div className="col-xxl-4 col-md-8">
                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                            <label
                                                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                Name
                                                                                                                                                                                                                            </label>
                                                                                                                                                                                                                            <input
                                                                                                                                                                                                                                type="text"
                                                                                                                                                                                                                                className="form-control"
                                                                                                                                                                                                                                id="basiInput"
                                                                                                                                                                                                                                value={name}
                                                                                                                                                                                                                                onChange={(e) =>
                                                                                                                                                                                                                                    setName(
                                                                                                                                                                                                                                        e.target.value
                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            />
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                    <div className="col-lg-4">
                                                                                                                                                                                                                        <div>
                                                                                                                                                                                                                            <label
                                                                                                                                                                                                                                htmlFor="basiInput"
                                                                                                                                                                                                                                className="form-label"
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                .
                                                                                                                                                                                                                            </label>
                                                                                                                                                                                                                            <div className="text-end">
                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                    onClick={(e: any) => {
                                                                                                                                                                                                                                        add(e, MyConstants.waterFlowFrequencies.path);
                                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                                    className="btn btn-primary"
                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                    Add
                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                            <div className="card-footer">
                                                                                                                                                                                                                <table className="table table-striped">
                                                                                                                                                                                                                    <thead>
                                                                                                                                                                                                                        <tr>
                                                                                                                                                                                                                            {/* <th scope="col">Id</th> */}
                                                                                                                                                                                                                            <th scope="col">Name</th>

                                                                                                                                                                                                                            <th scope="col">Action</th>
                                                                                                                                                                                                                        </tr>
                                                                                                                                                                                                                    </thead>
                                                                                                                                                                                                                    <tbody>
                                                                                                                                                                                                                        {data?.waterFlowFrequencies.map((data: any) => (
                                                                                                                                                                                                                            <tr key={data.id}>
                                                                                                                                                                                                                                {/* <th scope="row">{region.id}</th> */}
                                                                                                                                                                                                                                <td>{data.name}</td>

                                                                                                                                                                                                                                <td>
                                                                                                                                                                                                                                    <button className="badge bg-success" onClick={async () => {
                                                                                                                                                                                                                                        setName(data.name)
                                                                                                                                                                                                                                    }}>
                                                                                                                                                                                                                                        Edit
                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                </td>
                                                                                                                                                                                                                            </tr>
                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                    </tbody>
                                                                                                                                                                                                                </table>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                        </div> :

                                                                                                                                                                                                        <></>


                    }
                </Modal>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>

                                <div className="row g-3">
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.actions.id)}>
                                            Action
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.animalTypes.id)}>
                                            Animal Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.cemeteryWorkers.id)}>
                                            Cemetery Workers
                                        </button>
                                    </div>

                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.cleaningFrequencies.id)}>
                                            Cleaning Frequencies
                                        </button>
                                    </div>

                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.communalContainerConditions.id)}>
                                            Container Conditions
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.containerVolumes.id)}>
                                            Container Volumes
                                        </button>
                                    </div>
                                    {/* <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, 7)}>
                                            Derrating Frequencies
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, 8)}>
                                            Disinfection Frequencies
                                        </button>
                                    </div> */}
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.drainBadConditions.id)}>
                                            Drain Bad Conditions
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.drainTypes.id)}>
                                            Drain Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.drinkingWaterSourceTypes.id)}>
                                            Drinking Water Source
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.easeYourselfWheres.id)}>
                                            Ease Yourself Where
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.effluentManagements.id)}>
                                            Effluent Management
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.excretaContainments.id)}>
                                            Excreta Containment
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.excretaDisposals.id)}>
                                            Excreta Disposal
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.greyWaterDisposals.id)}>
                                            Grey Water Disposal
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.hazardousWasteDisposals.id)}>
                                            Hazardous Waste Disposal
                                        </button>
                                    </div>
                                    {/* <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.inspectionFormNuisances.id)}>
                                            Inspection Form Nuisances
                                        </button>
                                    </div> */}
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.nuisances.id)}>
                                            Nuisances
                                        </button>
                                    </div>
                                    {/* <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, 20)}>
                                        Nuisances
                                        </button>
                                    </div> */}
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.ownershipTypes.id)}>
                                            Ownership Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.pestSigns.id)}>
                                            Pest Signs
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.premisesServices.id)}>
                                            Premises Services
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.premisesSubtypes.id)}>
                                            Premises Subtypes
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.premisesTypes.id)}>
                                            Premises Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.respondentDesignations.id)}>
                                            Respondent Designations
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.sewerSystems.id)}>
                                            Sewer Systems
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.toiletHouseholdNumbers.id)}>
                                            Toilet Household Numbers
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.toiletPitPositions.id)}>
                                            Toilet Pit Positions
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.toiletTypes.id)}>
                                            Toilet Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.unsafeToiletConditions.id)}>
                                            Unsafe Toilet Conditions
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.unsafeWaterStorages.id)}>
                                            Unsafe Water Storages
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.unservicedWasteDisposals.id)}>
                                            Unserviced Waste Disposals
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.wasteCollectionFrequencies.id)}>
                                            Waste Collection Frequencies
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.wasteCollectionTypes.id)}>
                                            Waste Collection Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.wasteStorageReceptacles.id)}>
                                            Waste Storage Receptacles
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.wasteWaterContainments.id)}>
                                            Waste Water Containments
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.waterFlowFrequencies.id)}>
                                            Water Flow Frequencies
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.waterSourceTypes.id)}>
                                            Water Source Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.waterStorageTypes.id)}>
                                            Water Storage Types
                                        </button>
                                    </div>
                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.waterSupplyTypes.id)}>
                                            Water Supply Types
                                        </button>
                                    </div>

                                    <div className="col-md-2">

                                        <button type="submit" className="btn btn-primary" onClick={async (e: any) => openModal(e, MyConstants.waterTreatmentTypes.id)}>
                                            Water Treatment Types
                                        </button>
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
