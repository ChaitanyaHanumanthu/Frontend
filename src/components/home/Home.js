// import "./Home.cs"
import React from "react";
import { useSelector } from "react-redux";
import Login from "../login/Login";

function Home() {
  let { status } = useSelector((state) => state.login);
  // console.log(status);
  return (
    <div>
      <div className="m-5"></div>
      <div className="row ">
        <img alt="" />
        <div className=" text-center col-10 col-sm-8 col-md-6 col-lg-4 m-auto bgimage">
          <div className="container">
            <h3 className="display-3 mt-5 pt-5 fw-bold text-success">
              Project Pulse
            </h3>
          </div>
          <div>
            <p className="display-6 lead mt-5 pt-3">
              This product will serve as tracking tool for projects and
              portfolio for each GDO and overall organisation.
            </p>
          </div>
        </div>
        <div className="col-10 col-sm-8 col-md-6 col-lg-4  m-auto">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;
