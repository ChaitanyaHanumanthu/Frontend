import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function Register() {
  // error state

  let [error, setError] = useState("");
  let [loginStatus, setLoginStatus] = useState("")

  // navigate
  let navigate = useNavigate();

  // use form
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userObj) => {
    console.log(userObj);

    let user = await axios.post(
      "http://localhost:8080/user-api/register",
      userObj
    );
    console.log("register",user);
    setError(user.data.message)
    setLoginStatus(user.data.message)
  };

    // useEffect to navigate after clicking on login
    useEffect(() => {
      if (loginStatus == "User created") {
        navigate("/");
      }
    }, [loginStatus]);



  return (
    <div className="row">
      {error && <h5 className="text-danger text-center mt-5"> {error} </h5>}
      <div>
        <h1 className="text-center text-success mt-4">Register</h1>
      </div>
      <div className="forms col-8 col-sm-6 col-md-5 col-lg-3 m-auto shadow rounded-4 mb-5 mt-5">
        {/* form */}
        <form action="" onSubmit={handleSubmit(onSubmit)} className="p-2">
          {/* name */}
          <label htmlFor="firstName" className="mt-3 fw-bold">
            First Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="firstName"
            className="form-control mt-2 mb-2"
            {...register("firstName", { required: true })}
          />
          {errors.firstName?.type === "required" && (
            <p className="text-danger"> Enter first name</p>
          )}

          {/* last Name */}
          {/* name */}
          <label htmlFor="lastName" className="mt-2 fw-bold">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Name"
            id="lastName"
            className="form-control mt-2 mb-2"
            {...register("lastName", { required: true })}
          />

          {/* email */}
          <label htmlFor="email" className="fw-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="form-control mt-2 mb-2"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-danger"> Email is mandatory</p>
          )}

          {/* password */}
          <label htmlFor="password" className="fw-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="form-control mt-2"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Enter the password</p>
          )}

          {/* register button */}
          <div className="text-center">
            <div>
              <button className="btn btn-success mt-3 mb-3">Register</button>
            </div>
          </div>
          {/* profiles */}
        </form>
      </div>
    </div>
  );
}

export default Register;
