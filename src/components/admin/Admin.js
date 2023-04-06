// Importing required modules and components
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Admin function
function Admin() {
  let userObj = useSelector((state) => state.login);

  // returning the admin homepage
  return (
    <div>
      <div className="container"></div>
      <div style={{ minHeight: "20vh" }}>
        <Outlet />
      </div>
      <div className="mt-5"></div>
    </div>
  );
}

// exporting admin
export default Admin;
