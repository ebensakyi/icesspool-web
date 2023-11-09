'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams()

  const error = searchParams.get("error")

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e: any) => {
    e.preventDefault();
    try {
      if (password == "" || phoneNumber == "") {

        return toast.error("Login form cannot be empty");
      }
      let result = await signIn("credentials", {
        phoneNumber, password,
        callbackUrl: "/"
        //callbackUrl:SERVER_BASE_URL
        // callbackUrl: `${window.location.origin}/` 
      });
console.log("result==> ",result);


    } catch (error) {
      console.log("error===>", error);
    }
  };

  const handlePasswordVisibility = () => {
    console.log("LOL");

    setShowPassword(!showPassword);
  };

  return (
    // <html lang="en">

    // <head>


    //   <title>ESICApps</title>


    //   <link href="../assets/img/favicon.png" rel="icon"/>
    //   <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon"/>

    //   <link href="https://fonts.gstatic.com" rel="preconnect"/>
    //   <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"/>

    //   <link href="../assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/quill/quill.snow.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/quill/quill.bubble.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
    //   <link href="../assets/vendor/simple-datatables/style.css" rel="stylesheet"/>

    //   <link href="../assets/css/style.css" rel="stylesheet"/>


    // </head>

    // <body>
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link
                    href="/"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="../../assets/img/logo.png" alt="" />
                    {/* <span className="d-none d-lg-block">ICESSPOOL</span> */}
                  </Link>
                </div>
                {/* End Logo */}
                <div className="card mb-3">


                  <div className="card-body"> {error == "CredentialsSignin" ? <div className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show" role="alert">
                    Wrong phone number or password
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div> : <></>}
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login
                      </h5>
                      <p className="text-center small">
                        Enter your phone number &amp; password to login
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
                          className="btn btn-primary w-100"
                          type="button"
                          onClick={(e) => login(e)}
                        >
                          Login
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don`t have account?{" "}
                          <Link href="/auth/forget-password">
                            Forgot password
                          </Link>
                        </p>
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
