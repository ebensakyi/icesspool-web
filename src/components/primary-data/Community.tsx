'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname, redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/config";
import ReactPaginate from "react-paginate";





export default function Community({ data }: any) {


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    const searchParams = useSearchParams();
    const router = useRouter();

    const searchTextRef: any = useRef("");


    const formRef = useRef<HTMLFormElement>(null);

    const [communityFileUrl, setCommunityFileUrl] = useState("");

    const [communityName, setCommunityName] = useState("");
    const [communityId, setCommunityId] = useState("");

    const [electoralAreaId, setElectoralAreaId] = useState("");
    const [regionId, setRegionId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [districts, setDistricts] = useState([]);
    const [electoralAreas, setElectoralAreas] = useState([]);

    const [communityFile, setCommunityFile] = useState("");


    const page = searchParams.get('page');

    const pathname = usePathname()


    const [isEditing, setIsEditing] = useState(false);

    const getDistrictsByRegion = async (regionId: number) => {
        try {

            const response = await axios.get(
                `/api/primary-data/district?regionId= ${regionId}&get_all=1`
            );
            setDistricts(response.data.response);
        } catch (error) {
            console.log(error);
        }
    };

    const getElectoralAreasByDistrict = async (districtId: number) => {
        try {

            const response = await axios.get(
                `/api/primary-data/electoral-area?districtId=${districtId}&get_all=1`
            );



            setElectoralAreas(response.data.response);
        } catch (error) {
            console.log(error);
        }
    };


    const add = async (e: any) => {
        try {
            e.preventDefault();


            if (communityName == "") return toast.error("Community Name cannot be empty");
            if (districtId == "") return toast.error("District cannot be empty");
            if (electoralAreaId == "") return toast.error("Electoral area cannot be empty");


            let data = {
                communityName,
                districtId,
                electoralAreaId

            };


            const response = await axios.post("/api/primary-data/community", data);
            setCommunityName("");
            setDistrictId("");
            setRegionId("");
            setElectoralAreaId("");

            if (response.status == 200) {
                router.refresh()

                return toast.success("Community added");
            }
            if (response.status == 201) {
                return toast.error("Same name already exist");
            }
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };
    const update = async (e: any) => {
        try {
            e.preventDefault()
            let data = {
                communityName,
                communityId,
                electoralAreaId

            };



            const response = await axios.put(
                "/api/primary-data/community", data
            );

            if (response.status == 200) {
                setCommunityName("")
                setDistrictId("");
                setRegionId("");
                setElectoralAreaId("")

                router.refresh()
                return toast.success("Community updated");
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


    const uploadCommunity = async (e: any) => {
        try {
            e.preventDefault();
            const formElement: any = formRef.current;


            if (electoralAreaId == "") return toast.error("Electoral Area cannot be empty");


            if (districtId == "") return toast.error("District cannot be empty");

            if (communityFile == "") return toast.error("Community File cannot be empty");

            // if (!formElement) {
            //     console.error("Form element not found");
            //     return;
            // }

            let body = new FormData(formElement);
            body.append("csvFile", communityFile);
            body.append("electoralAreaId", electoralAreaId);
            body.append("districtId", districtId);

            const response = await axios({
                url: "/api/primary-data/community/upload",
                method: "POST",
                headers: {
                    authorization: "A",
                    "Content-Type": "text/csv",
                },
                data: body,
            });
            setCommunityName("");
            setDistrictId("");
            setRegionId("");
            if (response.status == 200) {
                router.refresh()

                return toast.success("Communities uploaded");
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error);
        }
    };

    const upload = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const i = e.target.files[0];

            setCommunityFile(i);
            setCommunityFileUrl(URL.createObjectURL(i));
        }
    };

    const handlePagination = (page: any) => {
        let searchText = searchParams.get('searchText')

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchText}`

        );
    };
    const handleExportAll = async (e: any) => {
        try {
            e.preventDefault()

            let searchText = searchParams.get('searchText')
            const response = await axios.get(
                `/api/primary-data/community/export?searchText=${searchText}`,

            );



            if (response.status == 200) {
                router.push(response.data);
                router.refresh()
            }
        } catch (error) {
            console.log("error==> ", error);
        }
    };

    const handleSearch = () => {
        try {
            let _searchText: any = searchTextRef?.current?.value


            router.push(
                `${pathname}?searchText=${_searchText}&page=${page}`

            );

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>COMMUNITY</h1>
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
                                <h5 className="card-title">Add Single</h5>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Name *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter electoral area name' value={communityName} onChange={(e: any) => setCommunityName(e.target.value)} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Region *
                                    </label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={async (e: any) => {
                                            setRegionId(e.target.value);

                                            await getDistrictsByRegion(e.target.value);
                                        }}
                                        value={regionId}
                                    >
                                        <option >Select region * </option>
                                        {data?.regions?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        District *
                                    </label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={async (e: any) => {
                                            setDistrictId(e.target.value);

                                            getElectoralAreasByDistrict(e.target.value);
                                        }}
                                        value={districtId}
                                    >
                                        <option >Select district * </option>
                                        {districts?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Electoral Area *
                                    </label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={async (e: any) => {
                                            setElectoralAreaId(e.target.value);
                                        }}
                                        value={electoralAreaId}
                                    >
                                        <option >Select electoral area * </option>
                                        {electoralAreas?.map((data: any) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className=" mb-3">
                                    <div className="col-sm-10">


                                        <div className=" mb-3">
                                            <div className="col-sm-10">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={(e) => {
                                                                e.preventDefault();

                                                                setIsEditing(false);

                                                                setCommunityName("");
                                                                setDistrictId("");
                                                                setRegionId("");
                                                                setElectoralAreaId("");


                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                        {"  "} {"  "}
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={(e) => {
                                                                update(e);
                                                            }}
                                                        >
                                                            Update
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button type="submit" className="btn btn-primary" onClick={(e) => add(e)}>
                                                        Add
                                                    </button>
                                                )}

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
                                <h5 className="card-title">Upload Bulk</h5>
                                <form ref={formRef}>
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            File *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="file" accept=".csv" className="form-control" placeholder='Enter electoral area name' onChange={upload} />
                                        </div>
                                    </div>
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Region *
                                        </label>
                                        <select
                                            className="form-control"
                                            aria-label="Default select example"
                                            onChange={async (e: any) => {
                                                setRegionId(e.target.value);

                                                await getDistrictsByRegion(e.target.value);
                                            }}
                                            value={regionId}
                                        >
                                            <option >Select region * </option>
                                            {data?.regions?.map((data: any) => (
                                                <option key={data.id} value={data.id}>
                                                    {data.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            District *
                                        </label>
                                        <select
                                            className="form-control"
                                            aria-label="Default select example"
                                            onChange={async (e: any) => {
                                                setDistrictId(e.target.value);

                                                getElectoralAreasByDistrict(e.target.value);

                                            }}
                                            value={districtId}
                                        >
                                            <option >Select district * </option>
                                            {districts?.map((data: any) => (
                                                <option key={data.id} value={data.id}>
                                                    {data.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className=" mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Electoral Area *
                                        </label>
                                        <select
                                            className="form-control"
                                            aria-label="Default select example"
                                            onChange={async (e: any) => {
                                                setElectoralAreaId(e.target.value);
                                            }}
                                            value={electoralAreaId}
                                        >
                                            <option >Select electoral area * </option>
                                            {electoralAreas?.map((data: any) => (
                                                <option key={data.id} value={data.id}>
                                                    {data.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className=" mb-3">
                                        <div className="col-sm-10">


                                            <div className=" mb-3">
                                                <div className="col-sm-10">

                                                    <button type="submit" className="btn btn-primary" onClick={(e) => uploadCommunity(e)}>
                                                        Upload
                                                    </button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Communities</h5>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder='Enter search term' ref={searchTextRef}
                                                id="searchText"
                                                name="searchText" />
                                            <span className="input-group-text" id="basic-addon2">  <button type="button" onClick={handleSearch} className="btn btn-sm btn-primary btn-label waves-effect right waves-light form-control"><i className="bi bi-search"></i></button></span>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-group mb-3">

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success  "
                                                onClick={(e: any) => handleExportAll(e)}
                                            >
                                                <i className="ri-file-excel-2-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
                                                Export as excel
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Electoral Area</th>

                                            <th scope="col">District</th>

                                            <th scope="col">Region</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.communities?.response?.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.name}</td>
                                                    <td>{data?.ElectoralArea?.name}</td>
                                                    <td>{data?.ElectoralArea.District?.name}</td>
                                                    <td>{data?.ElectoralArea.District?.Region?.name}</td>

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
                                                                            onClick={async (e) => {
                                                                                e.preventDefault();
                                                                                await getDistrictsByRegion(data?.ElectoralArea.District?.Region.id)

                                                                                setCommunityName(data.name);
                                                                                setRegionId(data?.ElectoralArea.District?.Region.id);
                                                                                setDistrictId(data.ElectoralArea.District?.id);
                                                                                await getElectoralAreasByDistrict(data.ElectoralArea.District?.id)

                                                                                setElectoralAreaId(data.ElectoralArea.id)
                                                                                setCommunityId(data.id);



                                                                                setIsEditing(true);

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

                                                                                // _delete(guide.id);
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
                                <ReactPaginate
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    initialPage={data.communities.curPage - 1}
                                    pageCount={data.communities.maxPage}
                                    onPageChange={handlePagination}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    containerClassName={"pagination"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}
