// Importing the required modules
import React from "react";

// Project updates widget component
function ProjectUpdatesWidget({ projectUpdates }) {
  return (
    <div>
      <div className="container bg-light p-2 mt-5">
        <h4 className="text-center text-bg-dark p-1">Project Updates Widget</h4>
        {projectUpdates?.length == 0 ? (
          <h4 className="text-danger text-center p-4 m-4"> No Updates </h4>
        ) : (
          <table className="table text-capitalize table-bordered text-center">

            {/* thead */}
            <thead className=" thead  fw-bold ">
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

            {/* Tbody */}
            <tbody className="table-light">
              {projectUpdates?.map((project, index) => (
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

// Exporting the component
export default ProjectUpdatesWidget;
