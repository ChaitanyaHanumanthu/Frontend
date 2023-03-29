import React from "react";
import { useSelector } from "react-redux";
import GetAllProjects from "../admin/GetAllProjects";
import { Outlet } from "react-router-dom";

function ProjectManager() {
  // let get the state from the redux store
  let userObj = useSelector((state) => state.login);
  console.log(userObj.userObj.userId);

  return (
    <div>
      <div className="text-center">
        <h3 className="">Welcome Back {userObj.userObj.firstName}</h3>
        <h4 className="mt-3">Here are the projects</h4>
      </div>
      <div style={{ minHeight: "80vh" }}>
        {/* <GetAllProjects
          url={`http://localhost:8080/manager-api/project-manager/${userObj.userObj.userId}`}
        /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectManager;
