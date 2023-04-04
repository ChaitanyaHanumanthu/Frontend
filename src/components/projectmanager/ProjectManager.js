import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import GetAllProjects from "../admin/GetAllProjects";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function ProjectManager() {
  // let get the state from the redux store
  let userObj = useSelector((state) => state.login);
  console.log(userObj.userObj.userId);

  // navigate
  let navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token == null) {
      console.log("Token not found");
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="text-center"></div>
      <div style={{ minHeight: "80vh" }} className="Navbars">
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectManager;
