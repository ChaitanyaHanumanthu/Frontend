import axios from "axios";
import React, { useEffect, useState } from "react";

function ProjectUpdatesWidget({ state }) {
  // project id from params
  const projectId = state.projectId;

  let [concerns, setConcerns] = useState(false);
  // token
  let token = sessionStorage.getItem("token");

  let [projectConcerns, setProjectConcerns] = useState([]);

  const getProjectDetailes = async () => {
    let details = await axios.get(
      `http://localhost:8080/${state.api}/project/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (details.data.message !== "No concerns for this project") {
      setProjectConcerns(details.data.payload.concerns);
      console.log("concerns", details.data.payload.concerns);
    } else {
      setConcerns(true);
    }
  };
  // console.log(projectDetails.updateId);

  useEffect(() => {
    getProjectDetailes();
  }, []);

  return (
    <div>
      <div className="container bg-light mt-5 p-2">
        <h4 className="text-center m-3">Project Concerns</h4>
        {projectConcerns.length == 0 ? (
          <h4 className="text-danger text-center"> No Concerns </h4>
        ) : (
          <table className="table table-light">
            <thead className="bg-info">
              <tr>
                <td>concernId</td>
                <td>Description</td>
                <td> Raised By</td>
                <td>Project Id</td>
                <td className="text-center"> concern Date</td>
                <td>Severity</td>
                <td>Status</td>
                <td>Mitigation Date</td>
                <td>Concern By Client</td>
              </tr>
            </thead>
            <tbody>
              {projectConcerns.map((project, index) => (
                <tr key={index}>
                  <td>{project.concernId}</td>
                  <td>{project.concernDesc}</td>
                  <td>{project.concernRaisedBy}</td>
                  <td>{project.projectId}</td>
                  <td>{project.concernRaisedDate}</td>
                  <td>{project.concernSeverity}</td>
                  <td>{project.concernStatus}</td>
                  <td>{project.concernMitigatedDate}</td>
                  {project.concertByClient == "false"}
                  <td className="text-center"> ___ </td>
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
