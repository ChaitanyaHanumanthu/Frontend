import React from "react";
import { useSelector } from "react-redux";
import GetAllProjects from "../admin/GetAllProjects";
import { NavLink, Outlet } from "react-router-dom";

function ProjectManager() {
  // let get the state from the redux store
  let userObj = useSelector((state) => state.login);
  console.log(userObj.userObj.userId);

  return (
    <div>
      <div className="text-center"></div>
      <div style={{ minHeight: "80vh" }} className="Navbars">
        <div className="container nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav active p-2" : "nav inactive"
              }
              to="projects"
            >
              All Projects
            </NavLink>
          </li>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProjectManager;
