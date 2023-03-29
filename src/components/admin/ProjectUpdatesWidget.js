import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectUpdatesWidget({ state }) {
  // project id from params
  const projectId = state.projectId;

  let [updates, setUpdates] = useState(false);
  // token
  let token = sessionStorage.getItem("token");

  let [projectUpdates, setProjectUpdates] = useState([]);

  const getProjectDetailes = async () => {
    let details = await axios.get(
      `http://localhost:8080/${state.api}/project/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (details.data.message !== "No updates for this project") {
      setProjectUpdates(details.data.payload.updates);
      console.log("updates", details.data.payload.updates);
    } else {
      setUpdates(true);
    }
  };
  // console.log(projectDetails.updateId);

  useEffect(() => {
    getProjectDetailes();
  }, []);

  return (
    <div>
      <div className="container bg-light p-2 mt-5">
        <h4 className="text-center m-3">ProjectUpdatesWidget</h4>
        {updates ? (
          <h4 className="text-danger text-center"> No Updates </h4>
        ) : (
          <table className="table table-light">
            <thead className="bg-info">
              <tr>
                <td>updateId</td>
                <td>project Status</td>
                <td> Date</td>
                <td> User Id</td>
                <td>Project Id</td>
                <td>Quality status</td>
                <td>Resourcing status</td>
                <td>Schedule Status</td>
              </tr>
            </thead>
            <tbody>
              {projectUpdates.map((project, index) => (
                <tr key={index}>
                  <td>{project.updateId}</td>
                  <td>{project.projectStatusUpdate}</td>
                  <td>{project.date}</td>
                  <td>{project.userId}</td>
                  <td>{project.projectId}</td>
                  <td>{project.qualityStatus}</td>
                  <td>{project.resourcingStatus}</td>
                  <td>{project.scheduleStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProjectUpdatesWidget;
