"use client"
import { LOGIN_URL } from '@/config';
// import { signal } from '@preact/signals';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ServiceProviderWithdrawals = ({ data }: any) => {

console.log();


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()


    const [searchText, setSearchText] = useState("");

    const handlePagination = (page: any) => {

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchText}`

        );
    };

    const approve = async (id: any) => {
        try {
            // if (name == "" || status == 0) {
            //     return toast.error("Please fill form");
            // }

            let data = {
                id: Number(id),

            };




            const response = await axios.post("/api/finance/withdraw/service-provider/approve", data);
            console.log(response);
            

            toast.success(response.data.message);
            // setId(null)
            // setName("")
            // setLongDesc("")
            // setShortDesc("")
            // setStatus(2);

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
                <h1>WITHDRAWAL REQUESTS</h1>
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
                                <h5 className="card-title">List</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone Number</th>

                                            <th scope="col">Amount</th>

                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.withdrawals?.response?.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.ServiceProvider?.User?.firstName} {data?.ServiceProvider?.User?.lastName}</td>
                                                    <td>{data?.ServiceProvider?.User?.phoneNumber}</td>
                                                    <td>GHS {data?.amount}</td>

                                                    <td>  {moment(data?.createdAt).format(
                                                        "MMM Do YYYY, h:mm:ss a"
                                                    )}</td>
                                                    <td>{data?.status == 1 ? <span className="badge bg-success">Disbursed</span>:data?.status == 3 ? <span className="badge bg-warning">Paying</span> : <span className="badge bg-warning">Pending</span>}</td>

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
                                                                        {data?.status == 0 ?
                                                                            <button
                                                                                className="dropdown-item btn btn-sm "
                                                                                onClick={async (e) => {
                                                                                    e.preventDefault();

                                                                                    await approve(data.id)

                                                                                    // setIsEditing(true);

                                                                                }}
                                                                            >
                                                                                Approve
                                                                            </button>
                                                                            : <></>}
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
                                <ReactPaginate
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    initialPage={data?.withdrawals?.curPage - 1}
                                    pageCount={data?.withdrawals?.maxPage}
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
