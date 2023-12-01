'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import { useRouter, usePathname, redirect } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/config";

export default function UserType({ data }: any) {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    const [name, setName] = useState("");
    const [selectedPages, setSelectedPages] = useState([]);
    const [userTypeId, setUserTypeId] = useState();

    const [userUpdatesAllowed, setUserUpdatesAllowed] = useState(0);
    const [userDeletionAllowed, setUserDeletionAllowed] = useState(0);
    const [inspectionUpdatesAllowed, setInspectionUpdatesAllowed] = useState(0);
    const [inspectionPublishAllowed, setInspectionPublishAllowed] = useState(0);
    const [inspectionDeletionAllowed, setInspectionDeletionAllowed] = useState(0);



    const [isEditing, setIsEditing] = useState(0);



    const pagesOptions = data.pages.map((page: any) => {
        return {
            value: page.id,
            label: page.name,
        };
    });



    const add = async (e: any) => {
        try {
            e.preventDefault();

            if (selectedPages.length == 0)
                return toast.error("Pages cannot be empty");
            if (name == "") return toast.error("Name cannot be empty");

            let data = {
                name,
                selectedPages: selectedPages,
                inspectionDeletionAllowed,
                inspectionPublishAllowed,
                inspectionUpdatesAllowed
            };

            const response = await axios.post("/api/user/user-type", data);
            setSelectedPages([]);
            setName("");

            if (response.status == 200) {
                router.refresh()

                //router.push(pathname);
                return toast.success("Role added");
            }
            if (response.status == 201) {
                return toast.error("Same name already exist");
            }
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };

    const update = async (e: any, id: any) => {
        try {
            e.preventDefault();
            if (selectedPages.length == 0)
                return toast.error("Pages cannot be empty");
            if (name == "") return toast.error("User type cannot be empty");

            let data = {
                userTypeId: id,
                name,
                selectedPages: selectedPages,
            };

            const response = await axios.put("/api/user/user-type", data);
            setSelectedPages([]);
            setName("");
            router.refresh()

            return toast.success("User role update");
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };
    const _delete = async (id: any) => {
        try {
            const response = await axios.delete(
                `/api/user/user-type/?id=${id}`
            );

            if (response.status == 200) {
                router.refresh()
                return toast.success("User Type deleted");
            }


            return toast.success("An error occurred while deleting");
        } catch (error) {
            return toast.success("An error occurred while deleting");
        }
    };
    const onRemove = (selected: any) => {
        // setSelectedPages([selected.length - 1].value);
        setSelectedPages(selected);

    };
    const onSelect = (selected: any) => {
        // setSelectedPages(selected[selected.length - 1].value);
        setSelectedPages(selected);
    };
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>USER TYPES</h1>
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
                                <h5 className="card-title">Enter user type</h5>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Role
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter role name' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="col-sm-12 col-form-label">Allow publishing</label>
                                    <div className="col-sm-12">
                                        <select
                                            onChange={(e: any) => setInspectionPublishAllowed(e.target.value)}
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={inspectionPublishAllowed}
                                        >

                                            <option >Select </option>

                                            <option key={1} value={1}>Yes</option>
                                            <option key={0} value={0}>No</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="col-sm-12 col-form-label">Allow inspection deletion</label>
                                    <div className="col-sm-12">
                                        <select
                                            onChange={(e: any) => setInspectionDeletionAllowed(e.target.value)}
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={inspectionDeletionAllowed}
                                        >

                                            <option >Select </option>

                                            <option key={1} value={1}>Yes</option>
                                            <option key={0} value={0}>No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" mb-3">
                                    <label className="col-sm-12 col-form-label">Allow inspection update</label>
                                    <div className="col-sm-12">
                                        <select
                                            onChange={(e: any) => setInspectionUpdatesAllowed(e.target.value)}
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={inspectionUpdatesAllowed}
                                        >

                                            <option >Select </option>

                                            <option key={1} value={1}>Yes</option>
                                            <option key={0} value={0}>No</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Page
                                    </label>
                                    <div className="col-sm-12">
                                        <Multiselect
                                            options={pagesOptions}
                                            selectedValues={selectedPages}
                                            onSelect={onSelect}
                                            onRemove={onRemove}
                                            displayValue="label"
                                        />
                                        {/* <input type="text" className="form-control" placeholder='Select page(s)' /> */}
                                    </div>
                                </div>


                                <div className=" mb-3">
                                    <div className="col-sm-10">

                                        {isEditing == 1 ? (
                                            <button
                                                className="btn btn-warning"
                                                onClick={(e) => {
                                                    update(e, userTypeId);
                                                }}
                                            >
                                                Update
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                    add(e);
                                                }}
                                            >
                                                Add
                                            </button>
                                        )}
                                        {/* <button type="submit" className="btn btn-primary" onClick={(e) => add(e)}>
                                            Submit
                                        </button> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Roles</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>

                                            <th scope="col">Pages</th>
                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.userTypes.map((userType: any) => {
                                            return (
                                                <tr key={userType.id}>
                                                    <td>{userType.name}</td>
                                                    <td>
                                                        <div className="row" key={userType.id}>
                                                            {userType.PageAccess.map((pa: any) => {
                                                                return (
                                                                    <div key={pa.id} className="col-md-3">
                                                                        <span className="badge bg-primary"><i className="bi bi-check-circle me-1"></i>  {pa.Page?.name ?? ""}</span>

                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
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
                                                                                setName(userType.name);
                                                                                let pageAcess = userType.PageAccess.map(
                                                                                    (access: any) => {
                                                                                        return {
                                                                                            value: access.Page.id,
                                                                                            label: access.Page.name,
                                                                                        };
                                                                                    }
                                                                                );
                                                                                setSelectedPages(pageAcess);
                                                                                setIsEditing(1);
                                                                                setUserTypeId(userType.id);

                                                                            }}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="dropdown-item btn btn-sm "
                                                                            onClick={(e) => {
                                                                                e.preventDefault();

                                                                                _delete(userType.id);
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
