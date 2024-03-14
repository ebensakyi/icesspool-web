"use client"
import { LOGIN_URL } from '@/config';
// import { signal } from '@preact/signals';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BiodigesterService = ({ data }: any) => {
    const editorRef = useRef(null);

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState(2);
    const [shortDesc, setShortDesc] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [longDesc, setLongDesc] = useState("");

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()



    // const add = async (e: any) => {
    //     try {
    //         e.preventDefault();
    //         if (name == "" || status == 0) {
    //             return toast.error("Please fill form");
    //         }

    //         let data = {
    //             name,
    //             status,
    //         };
    //         const response = await axios.post("/api/services", data);
    //         toast.success(response.data.message);
    //         setName("")
    //         setStatus(2);

    //         router.refresh()

    //     } catch (error: any) {
    //         if (error.response.status == 401) {
    //             toast.error(error.response.data.message);
    //         }
    //     }
    // };

    const update = async (e: any) => {
        try {
            e.preventDefault();
            if (name == "" || status == 0) {
                return toast.error("Please fill form");
            }

            let data = {
                id: Number(id),
                name,
                shortDesc,
                longDesc,
                imageUrl,
                status,
            };

            

            
            const response = await axios.put("/api/configure/biodigester-services", data);
            toast.success(response.data.message);
            setId(null)
            setName("")
            setLongDesc("")
            setShortDesc("")
            setStatus(2);

            router.refresh()

        } catch (error: any) {
            if (error.response.status == 401) {
                toast.error(error.response.data.message);
            }
        }
    };




    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>BIODIGESTER SERVICES</h1>
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
                                <h5 className="card-title">Update</h5>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Name *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter name' value={name} onChange={(e: any) => setName(e.target.value)} />
                                    </div>
                                </div>
                                {/* <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Image URL *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter image url' value={imageUrl} onChange={(e: any) => setImageUrl(e.target.value)} />
                                    </div>
                                </div> */}
                                {/* <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Short Description *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter short desc' value={shortDesc} onChange={(e: any) => setShortDesc(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Long Description *
                                    </label>
                                    <div className="col-sm-12">
                                    <textarea id="myTextarea"  className="form-control" name="myTextarea" rows={4} cols={50}  value={longDesc} onChange={(e: any) => setLongDesc(e.target.value)}>
                                    Enter long desc(url to a page)
  </textarea>
                                    </div>
                                </div> */}
                                {/* <>
                                    <Editor
                                         onInit={(evt, editor) => editorRef.current = editor}
                                         initialValue="<p>This is the initial content of the editor.</p>"
                                         init={{
                                           height: 500,
                                           menubar: false,
                                           plugins: [
                                             'advlist autolink lists link image charmap print preview anchor',
                                             'searchreplace visualblocks code fullscreen',
                                             'insertdatetime media table paste code help wordcount'
                                           ],
                                           toolbar: 'undo redo | formatselect | ' +
                                           'bold italic backcolor | alignleft aligncenter ' +
                                           'alignright alignjustify | bullist numlist outdent indent | ' +
                                           'removeformat | help',
                                           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                         }}
                                        value={longDesc}
                                        onEditorChange={handleEditorChange}
                                    />
                                </> */}
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
                                                        // add(e)

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
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>

                                            <th scope="col">Service</th>

                                            <th scope="col">Type</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Created Date</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.services?.response?.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.Service?.name}</td>

                                                    <td>{data?.BiodigesterType.name}</td>
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
