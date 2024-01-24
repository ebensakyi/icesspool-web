'use client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import { useRouter, usePathname, redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";

import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/config";



export default function UserProfile({ data }: any) {

    const searchParams = useSearchParams()

    const message = searchParams.get("message")



    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    const router = useRouter();
    const pathname = usePathname()

    const [userId, setUserId] = useState("")
    const [lastName, setSurname] = useState("");
    const [firstName, setOtherNames] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");


    useEffect(() => {
        setSurname(data.userData.lastName);
        setOtherNames(data.userData.firstName);
        setEmail(data.userData.email);
        setPhoneNumber(data.userData.phoneNumber);
        setUserId(data.userData.userId);



    }, [data.userData.email, data.userData.firstName, data.userData.lastName, data.userData.phoneNumber, data.userData.userId])


    const changePassword = async (e: any) => {
        try {
            e.preventDefault();



            if (currentPassword == "") {
                return toast.error("Current password cannot be empty");
            }
            if (newPassword == "") {
                return toast.error("New password cannot be empty");
            }
            let data = {

                phoneNumber,
                newPassword,
                currentPassword,
                changePassword: 1
            };


            const response = await axios.put("/api/user/profile", data);



            setCurrentPassword("");
            setNewPassword("");

            if (response.status == 200) {
                router.refresh()

                return toast.success("Password changed.\nLogout and log back in to activate");
            }
            if (response.status == 201) {
                return toast.error("Wrong current user password");
            }
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };

    const updateProfile = async (e: any) => {
        try {
            e.preventDefault();


            if (lastName == "") {
                return toast.error("Surname cannot be empty");
            }
            if (firstName == "") {
                return toast.error("Other Names cannot be empty");
            }
            if (email == "") {
                return toast.error("Email cannot be empty");
            }
            if (phoneNumber == "") {
                return toast.error("PhoneNumber cannot be empty");
            }
            let data = {
                userId,
                lastName,
                firstName,
                email,
                phoneNumber,
                currentPassword,
                changePassword: 0
            };


            const response = await axios.put("/api/auth/profile", data);
            setSurname("");
            setOtherNames("");
            setEmail("");
            setPhoneNumber("");
            setCurrentPassword("");
            setNewPassword("");

            if (response.status == 200) {
                router.refresh()

                return toast.success("User profile update");
            }
            if (response.status == 201) {
                return toast.error("Wrong current user password");
            }
        } catch (error) {
            console.log(error);
            return toast.error("An error occurred");
        }
    };


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
                <h1>PROFILE</h1>
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

                                <div className="row">

                                    <div className="col-sm-3 mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Surname
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Surname' onChange={(e) => setSurname(e.target.value)} value={lastName} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3  mb-3">
                                        <label htmlFor="inputText" className="col-sm-12 col-form-label">
                                            Other name(s)
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Other names' onChange={(e) => setOtherNames(e.target.value)} value={firstName} />
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
                                            Phone Number
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" placeholder='Phone number' onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-4">


                                            <button
                                                className="btn btn-warning"
                                                onClick={(e) => {
                                                    updateProfile(e);
                                                }}
                                            >
                                                Update Profile
                                            </button>

                                        </div>



                                    </div>

                                </div>
                            </div>
                        </div>
                        {message ? <div className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show" role="alert">
                            {message}
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div> : <></>}

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Change Password</h5>
                                {/* General Form Elements */}

                                <div className="row">



                                    <div className="col-sm-3 mb-3">
                                        <label
                                            htmlFor="inputNumber"
                                            className="col-sm-12 col-form-label"
                                        >
                                            Current Password
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Enter current password' onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-3">
                                        <label
                                            htmlFor="inputNumber"
                                            className="col-sm-12 col-form-label"
                                        >
                                            New Password
                                        </label>
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                                        </div>
                                    </div>




                                    <div className="col-sm-3 mb-3">

                                        <label
                                            htmlFor="inputNumber"
                                            className="col-sm-12 col-form-label"
                                        >
                                            .
                                        </label>
                                        <button
                                            className="btn btn-success"
                                            onClick={(e) => {
                                                changePassword(e);
                                            }}
                                        >
                                            Update Password
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
