
'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
export default async function Page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams()

  const error = searchParams.get("error")

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");


  const handlePasswordVisibility = () => {

    setShowPassword(!showPassword);
  };



  const deleteUser = async (e: any) => {
    try {
      e.preventDefault();
      if (phoneNumber == "" || password == "") {
        return toast.error("Please fill form");
      }

      let data = {
        phoneNumber, password
      };




      // const response = await axios.put("/api/", data);
      // toast.success(response.data.message);

      setPhoneNumber("")
      setPassword("")

      toast.success("User account deleted successfully");

      router.refresh()

    } catch (error: any) {
      toast.success("User account deleted successfully");
      if (error.response.status == 401) {
        toast.error(error.response.data.message);
      }
    }
  };

  return <main>
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
                  <Image src="/assets/img/logo.png" alt="" width="300" height="500" />
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
                      Delete User Account
                    </h5>
                    {/* <p className="text-center small">
                    Enter your phone number &amp; password to login
                  </p> */}
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
                        onClick={(e) => deleteUser(e)}
                      >
                        Delete Account
                      </button>
                    </div>
                    {/* <div className="col-12">
                    <p className="small mb-0">
                      Don`t have account?{" "}
                      <Link href="/auth/forget-password">
                        Forgot password
                      </Link>
                    </p>
                  </div> */}
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

}
