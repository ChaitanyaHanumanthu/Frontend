import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CreateProject from "./CreateProject";

function Admin() {
  let userObj = useSelector((state) => state.login);

  return (
    <div>
      <div className="container">
        <h2 className="text-center">
          Welcome Back {userObj.userObj.firstName}
        </h2>
        <h4 className="text-center mt-5">Here is the all Projects</h4>
      </div>
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
