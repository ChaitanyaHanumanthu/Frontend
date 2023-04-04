import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  let navigate = useNavigate();

  //form controls
  let {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //otp state
  let [userEmail, setUserEmail] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [resetSuccess, setResetSuccess] = useState("");

  const otpData = async (Data) => {
    console.log("otp");
    let res = await axios.post(
      "http://localhost:8080/user-api/forgot-password",
      Data
    );
    console.log(Data.email);
    setUserEmail(Data.email);
  };

  const forgotPasswordData = async (passwordObject) => {
    delete passwordObject.email;
    console.log("pwdObj", passwordObject);
    let res = await axios.post(
      ` http://localhost:8080/user-api/reset-password/email/${userEmail}`,
      passwordObject
    );
    if (res.data.message === "Invalid OTP, try again") {
      setErrorMessage(res.data.message);
    } else {
      setResetSuccess("Password reset sucessfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="row container m-auto">
      <div className=" col-6 col-sm-8 col-md-5 m-auto">
        <div className="mx-auto">
          {resetSuccess !== "" && (
            <p className="text-success fs-1 m-5">{resetSuccess}</p>
          )}
          <h2 className="text-center text-success">Forgot Password</h2>
          <div className="">
            <form className="form" onSubmit={handleSubmit(otpData)}>
              <div className="m-3 mx-auto">
                <label htmlFor="email" className="form-label mt-5 ps-3">
                  Enter Registered Email Address
                </label>
                <input
                  {...register("email", {
                    required: "** Please Enter Registered Email Address",
                  })}
                  className="form-control m-2"
                  type="email"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-danger text-start ms-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Otp Button  */}
              <div className="m-3 text-center">
                <button className="btn btn-success">Get OTP</button>
              </div>
            </form>
          </div>
        </div>

        {userEmail === "" ? (
          <p></p>
        ) : (
          <div>
            <p className="text-success text-center fw-semibold">
              Otp is sent to your registered email ,
            </p>
            <p className="text-danger text-center fw-semibold">
              Enter OTP to reset your password
            </p>

            {/* Form to change the password */}
            <form className="form " onSubmit={handleSubmit(forgotPasswordData)}>
              {/* OTP input field */}
              <div className="m-3 mx-auto m">
                {errorMessage !== "" && (
                  <p className="text-danger ">{errorMessage}</p>
                )}
                <label htmlFor="otp" className="form-label">
                  Enter OTP
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("otp", { required: "OTP is required" })}
                  placeholder="Enter OTP"
                />

                {/* Error messsage */}
                {errors.otp && (
                  <p className="text-danger text-start ms-2">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              {/* Password input field */}
              <div>
                <label htmlFor="password" className="fw-semibold form-label">
                  Enter new password
                </label>

                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="New password"
                />

                {/* Error message */}
                {errors.password && (
                  <p className="text-danger text-start ms-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Password input field */}
              <div>
                <label
                  htmlFor="passwordReset"
                  className="form-label fw-semibold mt-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("confirmPassword", {
                    required: "ConfirPassword is required",
                  })}
                  placeholder="Confirm Password"
                />

                {/* Error message */}
                {errors.confirmPassword && (
                  <p className="text-danger text-start ms-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="m-3 text-center">
                <button className="btn btn-success">Reset Passowrd</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
