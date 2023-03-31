import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CreateProject from "./CreateProject";

function Admin() {
  let userObj = useSelector((state) => state.login);

  return (
    <div>
      <div className="container"></div>
      <div style={{ minHeight: "20vh" }}>
        <Outlet />
      </div>
      <div className="mt-5">
        
      </div>
    </div>
  );
}

export default Admin;
