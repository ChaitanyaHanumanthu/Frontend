// Importing the required modules
import React from "react";

// Project details widget component
function ProjectDetailsWidget({ projectDetails }) {
  // return the component
  return (
    <div className="container ">
      <div className="card text-capitalize">
        <div className="card-header bg-dark text-white text-center fw-bolder">
          Project Detailed View
        </div>
        {/* {console.log("project details", projectDetails)} */}

        <div className="row fw-semibold">
          <div className="card-body  col-7  col-sm-5 col-md-4 col-lg-4">
            <div className="row ms-1 border">
              <p className="col-6"> projectId: </p>
              <p className="col-6"> {projectDetails?.projectId} </p>
              <p className="col-6">project Name: </p>
              <p className="col-6"> {projectDetails?.projectName} </p>
              <p className="col-6"> Client : </p>{" "}
              <p className="col-6">{projectDetails?.client} </p>
              <p className="col-6">Client Manager : </p>{" "}
              <p className="col-6">{projectDetails?.clientAccountManager} </p>
            </div>
          </div>
          <div className="card-body col-7 col-sm-5 col-md-4 col-lg-4">
            <div className="row border">
              <p className="col-6"> Status: </p>{" "}
              <p className="col-6">{projectDetails?.statusOfProject} </p>
              <p className="col-6"> Start Date: </p>{" "}
              <p className="col-6">{projectDetails?.startDate} </p>
              {/* <p className="col-6"> End Date : </p>{" "}
              <p className="col-6">{projectDetails?.endDate} </p> */}
              <p className="col-6"> Updates : </p>{" "}
              <p className="col-6">{projectDetails?.updates?.length} </p>
              <p className="col-6"> Domain : </p>{" "}
              <p className="col-6">{projectDetails?.domainOfProject} </p>
            </div>
          </div>
          <div className="card-body col-7 col-sm-5 col-md-4 col-lg-4">
            <div className="row border">
              <p className="col-6">Type of Project: </p>
              <p className="col-6"> {projectDetails?.typeOfProject}</p>
              <p className="col-6">Project Manger: </p>
              <p className="col-6"> {projectDetails?.projectManager_id} </p>
              {/* <p className="col-6">Hr Manager : </p>
              <p className="col-6"> {projectDetails?.hrManager_id} </p> */}

              <p className="col-6">Concerns : </p>
              <p className="col-6"> {projectDetails?.concerns?.length} </p>

              <p className="col-6"> Gdo :</p>
              <p className="col-6"> {projectDetails?.GdoId} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the component
export default ProjectDetailsWidget;
