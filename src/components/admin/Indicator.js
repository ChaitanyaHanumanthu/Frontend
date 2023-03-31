import axios from "axios";
import React, { useEffect, useState } from "react";

function Indicator({ state }) {
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
    console.log("indicator", details.data.payload);
    setProjectDetails(details.data.payload);
  };

  useEffect(() => {
    getProjectDetailes();
  }, []);

  return (
    <div className="container">
      <div className="row text-center fw-bold m-auto justify-content-center">
        {/* project fitness indicator */}
        <div className=" card ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header">Project Fitness Indicator</div>
          {projectDetails.projectFitnessIndicator == "Amber" ? (
            <div className="card-body fw-bold text-center display-6 text-warning">
              {projectDetails.projectFitnessIndicator}
            </div>
          ) : projectDetails.projectFitnessIndicator === "Green" ? (
            <div className="text-success">
              {projectDetails.projectFitnessIndicator}
            </div>
          ) : (
            <div className="text-danger">
              {projectDetails.projectFitnessIndicator}
            </div>
          )}
        </div>

        {/* Concerns count */}
        <div className="card ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header">Concerns Count</div>

          <div className="card-body fw-bold text-center display-6">
            {projectDetails.concerns?.length}
          </div>
        </div>

        {/* Team memberes count */}

        <div className="card ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header">Team Size</div>

          <div className="card-body fw-bold text-center display-6">
            {projectDetails.teamSize?.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Indicator;
