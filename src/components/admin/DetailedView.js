// Importing the required components, modules and css files

import "./DetailedView.css";
import React, { useEffect, useState } from "react";
import Indicator from "./Indicator";
import ProjectDetailsWidget from "./ProjectDetailsWidget";
import ProjectUpdatesWidget from "./ProjectUpdatesWidget";
import ProjectConcerns from "./ProjectConcerns";
import { useLocation } from "react-router-dom";
import RaiseConcern from "../projectmanager/RaiseConcern";
import RaiseUpdate from "../projectmanager/RaiseUpdate";
import axios from "axios";
import AddTeamMembers from "../gdo/AddTeamMembers";
import { useSelector } from "react-redux";
import TeamCompositionWidget from "./TeamCompositionWidget";
import RaiseResourceRequest from "../gdo/RaiseResourceRequest";

// Detailed view component
function DetailedView() {
  // to get the values from the navigate
  let { state } = useLocation();

  // console.log("state", state);

  // getting the userObject from the login slice
  let userObj = useSelector((state) => state.login);

  // token from the session storage
  let token = sessionStorage.getItem("token");

  // state to update the component
  let [updates, setUpdates] = useState(false);
  let [projectDetails, setProjectDetails] = useState([]);

  // Function to get the paricular project details
  const getProjectDetailes = async () => {
    let details = await axios.get(
      `http://localhost:8080/${state.api}/project/${state.projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("indicator", details.data);
    setProjectDetails(details.data.payload);
  };

  // to render the project detailes
  useEffect(() => {
    getProjectDetailes();
  }, [updates]);

  // returning the detailed view
  return (
    <div>
      <h2 className="text-center mt-5">
        Here is the detailed view of the project
      </h2>

      {/* Indicator */}
      <div className="mb-5 mt-5">
        <Indicator
          fitness={projectDetails?.projectFitnessIndicator}
          concernsCount={projectDetails?.concerns?.length}
          teamCount={projectDetails?.projectTeams?.length}
        />
      </div>

      {/* Project details widget */}
      <div className="mb-5 mt-5">
        <ProjectDetailsWidget projectDetails={projectDetails} />
      </div>

      {/* Team composition widget */}
      <div>
        <TeamCompositionWidget projectDetails={projectDetails} />
      </div>

      {/* project updates widget */}
      <div className="mb-5 mt-5">
        <ProjectUpdatesWidget projectUpdates={projectDetails?.updates} />
      </div>

      {/* project concerns */}
      <div className="mb-5 mt-5">
        <ProjectConcerns projectConcerns={projectDetails?.concerns} />
      </div>

      {/* this is only applicable for the the manager login */}
      {state.api == "manager-api" && (
        <div className="row m-auto justify-content-center">
          <div>
            <h2 className="text-dark m-4 mb-5 text-center">
              Here are some additional functions
            </h2>
          </div>

          {/* Raising concerns */}
          <div className="mb-5 col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseConcern
              projectId={projectDetails?.projectId}
              setUpdates={setUpdates}
            />
          </div>

          {/* Raising Updates */}
          <div className="col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseUpdate
              projectId={projectDetails?.projectId}
              setUpdates={setUpdates}
            />
          </div>
        </div>
      )}

      {/* This is only applicable for the gdo login */}
      {state.api == "gdo-api" && (
        <div className="container">
          <div className="row">

            {/* Adding team members */}
            <div className=" col-12 col-sm-12 col-md-6 col-lg-6 m-auto">
              <AddTeamMembers
                url={`http://localhost:8080/gdo-api/gdo/${userObj.userObj.userId}/add-team`}
                projectId={projectDetails?.projectId}
                setUpdates={setUpdates}
                api="gdo-api"
              />
            </div>

            {/* Raising resource request */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 m-auto">
              <RaiseResourceRequest projectId={projectDetails?.projectId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exporting the detailed view
export default DetailedView;
