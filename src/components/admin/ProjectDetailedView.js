import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function ProjectDetailedView() {
  // props from the parent

  let token = sessionStorage.getItem("token");
  let projectId = useParams();
  console.log(projectId);

  // projectDetailed view
  let [projectById, setProjectById] = useState([]); // get Specifici detialed projects

  const getProjectsById = async (projectId) => {
    let projects = await axios.get(
      `http://localhost:8080/admin-api/project/${projectId.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log( "data",projects.data.Projects);
    setProjectById(projects.data.Projects);
  };

  console.log(projectById, "projects");
  // use Effect
  useEffect(() => {
    getProjectsById(projectId);
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <td>projectId</td>
          <td>projectName</td>
          <td>Client</td>
        </thead>
        <tbody>
          {projectById.map((project, index) => (
            <tr>
              <td>{project.projectName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectDetailedView;
