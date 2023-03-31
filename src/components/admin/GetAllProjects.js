import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateProject from "./CreateProject";

function GetAllProjects({ url, api }) {
  // userObj
  let userObj = useSelector((state) => state.login);

  // projects
  let [projects, setProjects] = useState([]);

  //  Navigate;
  let navigate = useNavigate();

  // token
  let token = sessionStorage.getItem("token");

  // get all the projects
  const getProjects = async () => {
    let projects = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(projects);
    setProjects(projects.data.Projects);
  };

  console.log(projects, "projects");

  // load the projects
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <h2 className="text-center">Welcome Back {userObj.userObj.firstName}</h2>
      <h4 className="text-center mt-5">Here is the all Projects</h4>
      <div className="container mt-5 text-center">
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
          </thead>
          <tbody>
            {projects?.map((project, index) => (
              <tr key={index}>
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
                        state: { projectId: project.projectId, api: api },
                      });
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {api == "admin-api" && (
        <div className="pt-5">
          <CreateProject />
        </div>
      )}
    </div>
  );
}

export default GetAllProjects;
