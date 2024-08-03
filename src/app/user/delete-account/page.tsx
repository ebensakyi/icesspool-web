'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter, usePathname, redirect } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams()

    const error = searchParams.get("error")

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const deleteAccount = async (e: any) => {
        e.preventDefault();
        try {
            if (password == "" || phoneNumber == "") {

                return toast.error("Form cannot be empty");
            }
            try {
                const response = await axios.delete(`/api/auth/delete-account`, {
                    data: { phoneNumber, password },
                }
                );
                setPassword("")
                setPhoneNumber("")
                return toast.success("Your account is deleted successfully");
                router.refresh()

            } catch (error) {
                console.log(error);
            }


        } catch (error) {
            console.log("error===>", error);
        }
    };

    const handlePasswordVisibility = () => {

        setShowPassword(!showPassword);
    };

    return (
   
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                {/* <div className="d-flex justify-content-center py-4">
                                    <Link
                                        href="/"
                                        className="logo d-flex align-items-center w-auto"
                                    >
                                        <img src="../../assets/img/logo.png" alt="" />
                                        <span className="d-none d-lg-block">ESICApps</span>
                                    </Link>
                                </div> */}
                                {/* End Logo */}
                                <div className="card mb-3">


                                    <div className="card-body"> {error == "CredentialsSignin" ? <div className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show" role="alert">
                                        Wrong phone number or password
                                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div> : <></>}
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">
                                                Delete Your Account
                                            </h5>
                                            <p className="text-center small">
                                                Enter your phone number &amp; password to delete account
                                            </p>
                                        </div>
                                        <form className="row g-3 needs-validation">
                                            <div className="col-12">
                                                <label htmlFor="yourUsername" className="form-label">
                                                    Phone Number
                                                </label>
                                                <div className="input-group has-validation">
                                                    <span
                                                        className="input-group-text"
                                                        id="inputGroupPrepend"
                                                    >
                                                        #
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        id="username"
                                                        value={phoneNumber}
                                                        required
                                                        onChange={(e) => setPhoneNumber(e.target.value.trim())}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please enter your phone number.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">
                                                    Password
                                                </label>

                                                <div className="input-group has-validation">
                                                    <span
                                                        className="input-group-text"
                                                        id="inputGroupPrepend"
                                                    >
                                                        *
                                                    </span>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        className="form-control"
                                                        id="password"
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value.trim())}
                                                    />
                                                    <button
                                                        className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                        type="button"
                                                        id="password-addon"
                                                        onClick={() => handlePasswordVisibility()}
                                                    >
                                                        <i className="ri-eye-fill align-middle"></i>
                                                    </button>
                                                    <div className="invalid-feedback">
                                                        Please enter your password.
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              defaultValue="true"
                              id="rememberMe"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="rememberMe"
                            >
                              Remember me
                            </label>
                          </div>
                        </div> */}
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-danger w-100"
                                                    type="button"
                                                    onClick={(e) => deleteAccount(e)}
                                                >
                                                    Delete Account
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                                {/* <div className="credits">
                 
                  Designed by{" "}
                  <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        //       <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

        //   <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
        //   <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        //   <script src="assets/vendor/chart.js/chart.umd.js"></script>
        //   <script src="assets/vendor/echarts/echarts.min.js"></script>
        //   <script src="assets/vendor/quill/quill.min.js"></script>
        //   <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
        //   <script src="assets/vendor/tinymce/tinymce.min.js"></script>
        //   <script src="assets/vendor/php-email-form/validate.js"></script>

        //   <script src="assets/js/main.js"></script>

        // </body>

        // </html>
    );
}
