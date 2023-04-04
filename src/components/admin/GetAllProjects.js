import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function GetAllProjects({ url, api }) {
  // userObj
  let userObj = useSelector((state) => state.login);
  console.log("User", userObj.userObj);

  // projects
  let [projects, setProjects] = useState([]);

  let [deleteStatus, setDeleteStatus] = useState(false);

  //  Navigate;
  let navigate = useNavigate();

  // token
  let token = sessionStorage.getItem("token");

  // get all the projects
  const getProjects = async () => {
    let projects = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(projects.data.Projects);
    setProjects(projects.data.Projects);
  };

  console.log("projects", projects);

  const deleteProjects = async (projectId) => {
    let projects = await axios.put(
      `http://localhost:8080/admin-api/project/${projectId}`,
      { status: false },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("status", projects);
    setDeleteStatus(true);
  };

  // load the projects
  useEffect(() => {
    getProjects();
  }, [deleteStatus]);

  return (
    <div>
      <div>
        {api == "admin-api" && (
          <div className="nav">
            <li className="nav-link">
              <NavLink
                className="nav-item text-white text-decoration-none active p-2 fw-bold"
                to={"add-project"}
              >
                Add Project
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink
                className="nav-item text-white text-decoration-none active p-2 fw-bold"
                to="resource-requests"
              >
                Resource Requests
              </NavLink>
            </li>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-center mt-5">
          Welcome Back {userObj.userObj.firstName}
        </h2>
      </div>
      {projects?.length == 0 || projects == undefined ? (
        <div>
          <h5 className="text-danger text-center mt-5">
            There are no projects
          </h5>
        </div>
      ) : (
        <div className="container mt-5 text-center">
          <h4 className="text-center mt-5 mb-3">Here is the all Projects</h4>
          <table className="table table-striped table-borderless">
            <thead className="bg-dark text-white">
              <td>ProjectName</td>
              <td>Client</td>
              <td>Fitness Indicator</td>
              <td>Manager</td>
              <td>Start Date</td>
              <td>Status</td>
              {/* <td>updates</td> */}
              <td>View </td>

              {api == "admin-api" && <td> Action</td>}
            </thead>
            <tbody>
              {projects?.map((project, index) => (
                <tr key={index}>
                  {console.log("project data", project)}
                  <td>{project.projectName}</td>
                  <td>{project.client}</td>
                  <td>{project.projectFitnessIndicator}</td>
                  <td>{project.projectManager_id}</td>
                  <td>{project.startDate}</td>
                  <td>{project.statusOfProject}</td>
                  {/* <td>{project.updates.length}</td> */}
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        navigate(`detailed-view/${project.projectId}`, {
                          state: {
                            projectId: project.projectId,
                            api: api,
                          },
                        });
                      }}
                    >
                      View
                    </button>
                  </td>
                  {api == "admin-api" && (
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteProjects(project.projectId);
                        }}
                      >
                        {console.log(project.projectId)}Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {api == "admin-api" && (
        // <div className="pt-5">
        //   <CreateProject />
        // </div>
        <div></div>
      )}
    </div>
  );
}

export default GetAllProjects;
