// importing the required modules
import React from "react";

// Project concerns widget
function ProjectUpdatesWidget({ projectConcerns }) {

  // getting props from the detailed view
  return (
    <div>
      <div className="container bg-light mt-5 p-2">
        <h4 className="text-center p-1 text-bg-dark">Project Concerns</h4>
        {projectConcerns?.length == 0 ? (
          <h4 className="text-danger text-center p-4 m-4"> No Concerns </h4>
        ) : (
          <table className="table table-striped text-capitalize table-responsive text-center table-bordered">
            <thead className="fw-bold thead">
              <tr>
                <td>concernId</td>
                <td>Description</td>
                <td> Raised By</td>
                <td>Project Id</td>
                <td className="text-center"> concern Date</td>
                <td>Severity</td>
                {/* <td>Status</td> */}
                <td>Concern By Client</td>
              </tr>
            </thead>
            <tbody>
              {projectConcerns?.map((project, index) => (
                <tr key={index}>
                  <td>{project.concernId}</td>
                  <td>{project.concernDesc}</td>
                  <td>{project.concernRaisedBy}</td>
                  <td>{project.projectId}</td>
                  <td>{project.concernRaisedDate}</td>
                  <td>{project.concernSeverity}</td>
                  {/* <td>{project.concernStatus}</td> */}
                  {project.concernByClient == false ? (
                    <td className="text-center"> No </td>
                  ) : (
                    <td className="text-center"> Yes </td>
                  )}
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
