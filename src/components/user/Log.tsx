'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import axios from 'axios';

import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/config";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Log({ data }: any) {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const searchText = searchParams.get('searchText')

    


    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    const handlePagination = (page: any) => {

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?searchText=${searchText}&page=${page}`

        );
    };

    const handleExportAll = async () => {
        try {
            let searchText = searchParams.get('searchText')
            const response = await axios.post(
                `/api/user/log`,
                {
                    fileName:"Logs",
                }
            );


            if (response.status == 200) {
                router.push(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>LOGS</h1>
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
                                <h5 className="card-title"> <button
                                                        type="button"
                                                        className="btn btn-sm btn-success  "
                                                        onClick={handleExportAll}
                                                    >
                                                        <i className="ri-file-excel-2-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
                                                        Export as excel
                                                    </button></h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>

                                            <th scope="col">Activity</th>
                                            <th scope="col">Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.logs.response.map((log: any) => {
                                            return (
                                                <tr key={log.id}>
                                                    <td>{log.User.otherNames} {log.User.surname}</td>
                                                    <td>{log.activity}</td>
                                                    <td> {moment(log.createdAt).format("MMM Do YYYY, h:mm:ss a")}
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
                                            initialPage={data.logs.curPage - 1}
                                            pageCount={data.logs.maxPage}
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
