import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectDetailsWidget({ state }) {
  // project id from params
  const projectId = state.projectId;

  // token
  let token = sessionStorage.getItem("token");

  let [projectDetails, setProjectDetails] = useState([]);

  const getProjectDetailes = async () => {
    let details = await axios.get(
      `http://localhost:8080/${state.api}/project/${projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProjectDetails(details.data.payload);
    console.log("details", details.data.payload);
  };

  useEffect(() => {
    getProjectDetailes();
  }, []);

  return (
    <div className="container ">
      <div className="card ">
        <div className="card-header text-center fw-bolder">
          Project Detailed View
        </div>

        <div className="row">
          <div className="card-body col-12  col-sm-8 col-md-6 col-lg-4">
            <p> projectId: {projectDetails.projectId} </p>
            <p>project Name: {projectDetails.projectName} </p>
            <p> Client : {projectDetails.client} </p>
            <p> Client Manager : {projectDetails.clientAccountManager} </p>
          </div>
          <div className="card-body col-12 col-sm-8 col-md-6 col-lg-4">
            <p> Status: {projectDetails.statusOfProject} </p>
            <p>Start Date: {projectDetails.startDate} </p>
            <p> End Date : {projectDetails.endDate} </p>
            <p> Domain : {projectDetails.domainOfProject} </p>
          </div>
          <div className="card-body col-12 col-sm-8 col-md-6 col-lg-4">
            <p> Type of Project: {projectDetails.typeOfProject} </p>
            <p>Project Manger: {projectDetails.projectManager_id} </p>
            <p> Hr Manager : {projectDetails.hrManager_id} </p>
            <p> Gdo : {projectDetails.GdoId} </p>
          </div>
        </div>

        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default ProjectDetailsWidget;
