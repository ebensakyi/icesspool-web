'use client'
import Image from 'next/image'
import { useRef, useState } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter, usePathname, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AWS_S3_URL, LOGIN_URL } from '@/config';

export default function ServiceProvider({ data }: any) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })




    const pathname = usePathname()


    const searchTextRef: any = useRef("");
    const filterRef: any = useRef(null);

    const searchText = searchParams.get('searchText');
    const page = searchParams.get('page');


    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const [spId, setSpId] = useState("");

    const [serviceArea, setServiceArea] = useState("");
    const [service, setService] = useState("");

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [company, setCompany] = useState("");
    const [officeLocation, setOfficeLocation] = useState("");
    const [licenseClassification, setLicenseClassification] = useState("");
    const [passportPicture, setPassportImage] = useState(null);
    const [ghanaPostGPS, setGhanaPostGPS] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [momoNumber, setMomoNumber] = useState("");
    const [momoNetwork, setMomoNetwork] = useState("");

    const [isEditing, setIsEditing] = useState(false);


    const [showOtp, setShowOtp] = useState(false);




    // const [searchText, setSearchText] = useState();





    // const handleExportAll = async () => {
    //     try {

    //       const response = await axios.post(
    //         `/api/v1/submitted-data/data-to-excel`,
    //         {
    //           inspectionFormId: Number(formId),
    //           fileName: handleExcelName(),
    //           published,
    //           exportType: 1,
    //         }
    //       );
    //       if (response.status == 200) {
    //         router.push(response.data);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    const handleExportFiltered = async () => {
        try {
            const response = await axios.post(
                `/api/v1/submitted-data/data-to-excel`,
                {
                    searchText: searchText,
                    exportType: 2,
                }
            );
            if (response.status == 200) {
                router.push(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlePagination = (page: any) => {

        page = page.selected == -1 ? 1 : page.selected + 1;

        router.push(
            `${pathname}?page=${page}&searchText=${searchText}`

        );
    };





    const handleFileChange = (e: any) => {
        setPassportImage(e.target.files[0]);
    };


    const addUser = async (e: any) => {
        e.preventDefault();
        if (!passportPicture) {
            return toast.error("Please select an image file");
        }
        if (firstName == "") {
            return toast.error("Please enter first name");
        }
        if (lastName == "") {
            return toast.error("Please enter last name");
        }
        if (phoneNumber == "") {
            return toast.error("Please enter phone number");
        }
        if (serviceArea == "") {
            return toast.error("Please select service area");
        }
        if (officeLocation == "") {
            return toast.error("Please enter office location");
        }
        if (company == "") {
            return toast.error("Please enter company name");
        }
        if (momoNumber == "") {
            return toast.error("Please enter momo number");
        }
        if (momoNetwork == "") {
            return toast.error("Please select momo network");
        }

        const formData = new FormData();
        formData.append('passportPicture', passportPicture);
        formData.append('lastName', lastName);
        formData.append('firstName', firstName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('serviceArea', serviceArea);
        formData.append('service', service + "");
        formData.append('ghanaPostGPS', ghanaPostGPS);
        formData.append('officeLocation', officeLocation);
        formData.append('company', company);
        formData.append('licenseNumber', licenseNumber);
        formData.append('licenseClassification', licenseClassification);
        formData.append('momoNumber', momoNumber);
        formData.append('momoNetwork', momoNetwork);

        try {
            const response = await fetch('/api/user/service-provider', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 201) {
                return toast.error("User already exist. Check phone number and email and try again");
            }

            if (response.ok) {
                const data = await response.json();
                // console.log('Image uploaded:', data.imageUrl);
                // Handle success, e.g., update UI with the uploaded image URL
                router.refresh()
                return toast.success("User added successfully");
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };



    const updateUser = async (e: any) => {
        e.preventDefault();

        if (firstName == "") {
            return toast.error("Please enter first name");
        }
        if (lastName == "") {
            return toast.error("Please enter last name");
        }
        if (phoneNumber == "") {
            return toast.error("Please enter phone number");
        }
        if (serviceArea == "") {
            return toast.error("Please select service area");
        }
        if (officeLocation == "") {
            return toast.error("Please enter office location");
        }
        if (company == "") {
            return toast.error("Please enter company name");
        }
        if (momoNumber == "") {
            return toast.error("Please enter momo number");
        }
        if (momoNetwork == "") {
            return toast.error("Please select momo network");
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("spId", spId);
        // formData.append('passportPicture', passportPicture);
        formData.append('lastName', lastName);
        formData.append('firstName', firstName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('serviceArea', serviceArea);
        formData.append('service', service + "");
        formData.append('ghanaPostGPS', ghanaPostGPS);
        formData.append('officeLocation', officeLocation);
        formData.append('company', company);
        formData.append('licenseNumber', licenseNumber);
        formData.append('licenseClassification', licenseClassification);
        formData.append('momoNumber', momoNumber);
        formData.append('momoNetwork', momoNetwork);

        try {
            const response = await fetch('/api/user/service-provider', {
                method: 'PUT',
                body: formData,
            });



            if (response.ok) {
                const data = await response.json();
                // console.log('Image uploaded:', data.imageUrl);
                // Handle success, e.g., update UI with the uploaded image URL
                router.refresh()
                return toast.success("User added successfully");
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
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

    const handleExportAll = async () => {
        try {
            let searchText = searchParams.get('searchText')
            const response = await axios.get(
                `/api/user?exportFile=true`,

            );



            if (response.status == 200) {
                router.push(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = async () => {

        setIsEditing(false);

        setLastName("");
        setFirstName("");
        setEmail("");
        setPhoneNumber("");
        setDesignation("");
        setUserType("");
        setServiceArea("");
        setMomoNetwork("");
        setMomoNumber("");
        setServiceArea("");
        setService("");
        setOfficeLocation("");
        setCompany("");
    }

    return (
        <main id="main" className="main">
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
            <div className="pagetitle">
                <h1>SERVICE PROVIDERS</h1>
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
                                <h5 className="card-title">Enter user details</h5>
                                {/* General Form Elements */}
                                {/* <form> */}
                                <div className="row">

                                    <div className="col-sm-3 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            First name *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='First name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Last name(s) *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Last names' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputEmail" className="col-sm-12 col-form-label">
                                            Email
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="email" className="form-control" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <label
                                            htmlFor="inputNumber"
                                            className="col-sm-12 col-form-label"
                                        >
                                            Phone Number *
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Phone number' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Company name  *                                          </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Company' onChange={(e) => setCompany(e.target.value)} value={company} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Office location *                                           </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder=' Office location' onChange={(e) => setOfficeLocation(e.target.value)} value={officeLocation} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Ghana Post GPS                                            </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Ghana Post GPS' onChange={(e) => setGhanaPostGPS(e.target.value)} value={ghanaPostGPS} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <label className="col-sm-12 col-form-label">Select service **</label>
                                        <div className="col-sm-12">
                                            <select
                                                onChange={(e: any) => setService(e.target.value)}
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={service}
                                            >

                                                <option >Select service</option>


                                                {data.services.response.map((mn: any) => {
                                                    return (
                                                        <option key={mn.id} value={mn.id}>{mn.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    {service == "1" || service == "2" ?
                                        <><div className="col-sm-3 mb-3">
                                            <label className="col-sm-12 col-form-label">Select licence classification</label>
                                            <div className="col-sm-12">
                                                <select
                                                    onChange={(e: any) => setLicenseClassification(e.target.value)}
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    value={licenseClassification}
                                                >

                                                    <option >Select classification</option>
                                                    <option value="1" >A</option>
                                                    <option value="2" >B</option>
                                                    <option value="3">C</option>
                                                    <option value="4">D</option>
                                                    <option value="5">E</option>

                                                    {/* {data.userTypes.response.map((userType: any) => {
                                                        return (
                                                            <option key={userType.id} value={userType.id}>{userType.name}</option>
                                                        )
                                                    })} */}
                                                </select>
                                            </div>
                                        </div>  <div className="col-sm-3  mb-3">
                                                <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                    License Number                                            </label>
                                                <div className="col-sm-12">
                                                    <input type="text" className="form-control" placeholder='License Number' onChange={(e) => setLicenseNumber(e.target.value)} value={licenseNumber} />
                                                </div>
                                            </div></> : <></>}

                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Momo Number **                                         </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Momo number' onChange={(e) => setMomoNumber(e.target.value)} value={momoNumber} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <label className="col-sm-12 col-form-label">Select mobile network **</label>
                                        <div className="col-sm-12">
                                            <select
                                                onChange={(e: any) => setMomoNetwork(e.target.value)}
                                                className="form-select"
                                                aria-label="Default select example"
                                                value={momoNetwork}
                                            >

                                                <option >Select network</option>


                                                {data.momoNetworks.response.map((mn: any) => {
                                                    return (
                                                        <option key={mn.id} value={mn.id}>{mn.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Passport picture (600 x 600 pixels) * </label>
                                        <div className="col-sm-12">
                                            <input className="form-control" type="file" accept="image/*" id="formFile" onChange={(e) => handleFileChange(e)} />
                                            {passportPicture && <Image src={URL.createObjectURL(passportPicture)} alt="Passport Image" width={200} height={200} />}
                                            {/* <input type="file" className="form-control" placeholder='Passport picture' onChange={(e) => setDriversLicence(e.target.value)} value={driversLicence} /> */}
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-3  mb-3">
                                            <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                                Drivers license                                           </label>
                                            <div className="col-sm-12">
                                                <input type="file" className="form-control" placeholder='Drivers license ' onChange={(e) => setDriversLicence(e.target.value)} value={driversLicence} />
                                            </div>
                                        </div> */}
                                    <div className="col-sm-3  mb-3">
                                        <label className="col-sm-12 col-form-label">Select service area *</label>

                                        <div className="col-sm-12">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                onChange={(e: any) => {
                                                    setServiceArea(e.target.value)
                                                }}
                                                value={serviceArea}
                                            >
                                                <option >Select area</option>

                                                {data?.serviceAreas?.response?.map((ul: any) => {
                                                    return (
                                                        <option key={ul.id} value={ul.id}>{ul.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    {/* {selectedUserLevel == "3" ?
                                    <div className=" mb-3">
                                        <div className="col-sm-12">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                            >
                                                <option >Select district</option>
                                                {data.districts.map((d: any) => {
                                                    return (
                                                        <option key={d.id} value={d.id}>{d.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>:<></>} */}

                                    {/* <div className="col-sm-3  mb-3">
                                                        <label className="col-sm-12 col-form-label">Select region</label>

                                                        <div className="col-sm-12">
                                                            <select
                                                                className="form-select"
                                                                aria-label="Default select example"
                                                                onChange={async (e: any) => {
                                                                    //setFilterValue(e.target.value);
                                                                    setRegion(e.target.value);

                                                                }}
                                                                value={region}
                                                            >
                                                                {" "}
                                                                <option >Select region </option>
                                                                {data.regions?.map((data: any) => (
                                                                    <option key={data.id} value={data.id}>
                                                                        {data.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div> */}


                                </div>


                                <div className=" mb-3">
                                    <div className="col-sm-10">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCancel();

                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                                {"  "} {"  "}
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={(e) => {
                                                        updateUser(e);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                            </>
                                        ) : (
                                            <button type="submit" className="btn btn-primary" onClick={(e: any) => addUser(e)}>
                                                Add
                                            </button>
                                        )}

                                    </div>
                                </div>
                                {/* </form> */}
                                {/* End General Form Elements */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body table-responsive">
                                <h5 className="card-title">Users List</h5>
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
                                                onClick={handleExportAll}
                                            >
                                                <i className="ri-file-excel-2-line label-icon align-middle rounded-pill fs-16 ms-2"></i>
                                                Export as excel
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <table className="table datatable table-striped ">

                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Id</th>

                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">MoMo</th>

                                            <th scope="col">E-mail</th>
                                            <th scope="col">Company</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Service</th>

                                            <th scope="col">Service Area</th>

                                            <th scope="col">OTP</th>

                                            <th scope="col">Status</th>

                                            <th scope="col">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.users?.response?.map((user: any) => (
                                            <tr key={user.id}>
                                                <td> <Image src={AWS_S3_URL + user?.passportPicture} alt="Selected Image" width={64} height={64} /></td>
                                                <td>{user?.ServiceProvider?.id}</td>

                                                <td>{user?.firstName} {user?.lastName}</td>
                                                <td>{user?.phoneNumber}</td>
                                                <td>{user?.ServiceProvider?.MomoAccount?.momoNumber}</td>

                                                <td>{user?.email}</td>
                                                <td>{user?.ServiceProvider?.company}</td>
                                                <td>{user?.ServiceProvider?.officeLocation}</td>
                                                <td>{user?.ServiceProvider?.Service?.name}</td>

                                                <td>{user?.ServiceArea?.name}</td>
                                                {/* <td><span style={{ "cursor": "pointer" }}
                                                    onClick={() => {
                                                        setShowOtp(!showOtp)
                                                    }}>{!showOtp ? "****" : user?.Otp?.code}</span></td> */}
                                                <td>{user?.Otp?.length > 0 ? user?.Otp[user?.Otp?.length - 1]?.code : '-'}</td>
                                                <td>{user?.activated != 1 ? <>
                                                    <span className="badge bg-danger"><i className="bi bi-check-circle me-1"></i> Inactive</span>
                                                </> : <>              <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i> Active</span>
                                                </>}</td>

                                                <td>   <div
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

                                                                        await handleCancel()
                                                                        setIsEditing(true);



                                                                        setLastName(user.lastName);
                                                                        setFirstName(user.firstName);
                                                                        setEmail(user.email);
                                                                        setPhoneNumber(user.phoneNumber);
                                                                        setDesignation(user.designation);
                                                                        setUserType(user.userTypeId);
                                                                        setUserId(user.id);
                                                                        setSpId(user.ServiceProvider?.id);
                                                                        setServiceArea(user?.serviceAreaId);
                                                                        setService(user.ServiceProvider?.serviceId);
                                                                        setCompany(user.ServiceProvider.company);
                                                                        setOfficeLocation(user.ServiceProvider.officeLocation);
                                                                        setMomoNetwork(user?.ServiceProvider?.MomoAccount?.momoNetworkId);
                                                                        setMomoNumber(user?.ServiceProvider?.MomoAccount?.momoNumber);

                                                                        // await getDistrictsByRegion(user.regionId)



                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn btn-sm "
                                                                    onClick={async (e) => {
                                                                        try {
                                                                            e.preventDefault();
                                                                            let userId = user.id;
                                                                            const response = await axios.delete(
                                                                                `/api/user`,
                                                                                {
                                                                                    data: { userId, changeStatus: true },
                                                                                }
                                                                            );
                                                                            if (response.status == 200) {
                                                                                router.refresh()
                                                                                return toast.success("User status changed");

                                                                            }


                                                                        } catch (error) {
                                                                            return toast.error("An error occurred");

                                                                        }

                                                                    }}

                                                                >
                                                                    Change Status
                                                                </button>

                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn btn-sm "
                                                                    onClick={async (e) => {
                                                                        try {
                                                                            e.preventDefault();
                                                                            let phoneNumber = user.phoneNumber;
                                                                            const response = await axios.post(
                                                                                `/api/user/reset-password`,
                                                                                { phoneNumber }
                                                                            );
                                                                            router.refresh()
                                                                            return toast.success("Password reset. User will receive one time password");

                                                                        } catch (error) {

                                                                        }

                                                                    }}
                                                                >
                                                                    Reset Password
                                                                </button>

                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn btn-sm "
                                                                    onClick={async (e) => {
                                                                        try {
                                                                            e.preventDefault();
                                                                            let userId = user.id;
                                                                            const response = await axios.delete(
                                                                                `/api/user`, {
                                                                                data: { userId },
                                                                            }
                                                                            );
                                                                            router.refresh()
                                                                            return toast.success("User deleted");

                                                                        } catch (error) {

                                                                        }

                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>

                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div></td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                                {/* <ReactPaginate
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    initialPage={data.users.curPage - 1}
                                    pageCount={data.users.maxPage}
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
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>


    )
}
