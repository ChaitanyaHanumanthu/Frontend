// importing the requiried components and modules

import "./Login.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slices/loginSlice";
import { NavLink, useNavigate } from "react-router-dom";

// login component
function Login() {
  // error state
  let [err, setErr] = useState("");
  console.log(err);

  const { role, errorMessage } = useSelector((state) => state.login);
  // dispatch
  let dispatch = useDispatch();

  // navigate
  let navigate = useNavigate();

  // From the use Form
  let {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  // useEffect to navigate after clicking on login
  useEffect(() => {
    let token = sessionStorage.getItem("token");
    role == "superadmin" && token && navigate("/super-admin");
    role == "gdo" && token && navigate("/gdo");
    role == "admin" && token && navigate("/admin");
    role == "manager" && token && navigate("/project-manager");
    // role == "null" &&
  }, [role]);

  // onsubmit function
  const onSubmit = (userObj) => {
    // console.log(userObj);
    let actionObj = userLogin(userObj);
    // console.log(actionObj);
    dispatch(actionObj);
    // reset();
  };

  // returning the login page
  return (
    <div className=" h-100 pt-5 login">
      <div className="text-center">
        <h5 className="lead display-4 text-success fw-bold">Login</h5>
      </div>
      <div className="row">
        {errorMessage && (
          <h5 className="text-danger text-center"> {errorMessage}</h5>
        )}
        <div className=" pt-2 col-10 col-sm-9 col-md-7 col-lg-7 m-auto formtable shadow rounded-4 mb-5 mt-3">
          {/* form */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <label htmlFor="email" className="mt-3 fw-bold">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              className="form-control mt-2 mb-2"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger"> Enter registered Email</p>
            )}

            {/* password */}
            <label htmlFor="password" className="mt-2 fw-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="form-control mt-2 mb-1 "
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Kindly enter the password</p>
            )}

            {/* register button */}
            <div className="text-center mb-1">
              <div className="m-auto mt-4">
                <button className="btn btn-success ">Login</button>
              </div>
              <div className="text-secondary">
                <NavLink
                  className="text-danger nav nav-link text-decoration-none fw-semibold"
                  to="/forgot-password"
                >
                  Forgotten Password?
                </NavLink>
              </div>
            </div>
          </form>
          <div>
            <p className="text-center mt-4 fw-semibold">
              Don't have an account, click to
              <NavLink className="nav-link" to="/register">
                <p className="text-success fw-bold"> Register</p>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// exporting the login
export default Login;
