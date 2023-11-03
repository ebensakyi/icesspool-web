"use client"
import { LOGIN_URL } from '@/config';
import { signal } from '@preact/signals';
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';

export const TippingPoint = ({data}:any) => {


    console.log(data);
    
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    const sendingType = signal("")
    const title = signal("");
    const message = signal("");
    const regionId = signal("")
    const districtId = signal("")



    
  return (
    <main id="main" className="main">
            <div className="pagetitle">
                <h1>NOTIFICATION</h1>
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
                                <h5 className="card-title">Send Notification</h5>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Title *
                                    </label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder='Enter title' value={title.value} onChange={(e: any) => title.value =e.target.value} />
                                    </div>
                                </div>
                                <div className=" mb-3">
                                    <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                        Recipient type *
                                    </label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        onChange={(e: any) => {
                                            sendingType.value = e.target.value;
                                        }}
                                        value={sendingType.value}
                                    >
                                        <option >Select recipient type * </option>
                                        {data?.sendingTypes?.map((data: any) => (
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
                                              
                                               

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Notifications</h5>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>

                                            <th scope="col">Message</th>
                                            <th scope="col">Sent Type</th>
                                            <th scope="col">Recepient</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.notifications.map((data: any) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td>{data?.title}</td>
                                                    <td>{data?.message}</td>
                                                    <td>{data?.SendingType.name}</td>
                                                    <td>{data?.Region?.name}{data?.District?.name}{data?.Recipient?.otherNames} {data?.Recipient?.surname}</td>
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
                                                                                // setMessageId(data.id);
                                                                                // setTitle(data.title)
                                                                                // setMessage(data.message)
                                                                                // setSendingType(data.sendingType)
                                                                                // setDistrictId(data.districtId);

                                                                          

                                                                                // setIsEditing(true);

                                                                            }}
                                                                        >
                                                                            Resend
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
