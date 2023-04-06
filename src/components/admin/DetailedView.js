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

function DetailedView() {
  let { state } = useLocation();

  console.log("state", state);

  let userObj = useSelector((state) => state.login);

  // token from the session storage
  let token = sessionStorage.getItem("token");

  // state to update the component
  let [updates, setUpdates] = useState(false);

  let [projectDetails, setProjectDetails] = useState([]);

  const getProjectDetailes = async () => {
    let details = await axios.get(
      `http://localhost:8080/${state.api}/project/${state.projectId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("indicator", details.data);
    setProjectDetails(details.data.payload);
  };

  useEffect(() => {
    getProjectDetailes();
  }, [updates]);

  return (
    <div>
      <h2 className="text-center mt-5">
        Here is the detailed view of the project
      </h2>
      <div className="mb-5 mt-5">
        <Indicator
          fitness={projectDetails?.projectFitnessIndicator}
          concernsCount={projectDetails?.concerns?.length}
          teamCount={projectDetails?.projectTeams?.length}
        />
      </div>
      <div className="mb-5 mt-5">
        <ProjectDetailsWidget projectDetails={projectDetails} />
      </div>
      <div>
        <TeamCompositionWidget projectDetails={projectDetails} />
      </div>
      <div className="mb-5 mt-5">
        <ProjectUpdatesWidget projectUpdates={projectDetails?.updates} />
      </div>
      <div className="mb-5 mt-5">
        <ProjectConcerns projectConcerns={projectDetails?.concerns} />
      </div>
      {state.api == "manager-api" && (
        <div className="row m-auto justify-content-center">
          <div>
            <h2 className="text-dark m-4 mb-5 text-center">
              Here are some additional functions
            </h2>
          </div>
          <div className="mb-5 col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseConcern
              projectId={projectDetails?.projectId}
              setUpdates={setUpdates}
            />
          </div>
          <div className="col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseUpdate
              projectId={projectDetails?.projectId}
              setUpdates={setUpdates}
            />
          </div>
        </div>
      )}

      {state.api == "gdo-api" && (
        <div className="container">
          <div className="row">
            <div className=" col-12 col-sm-12 col-md-6 col-lg-6 m-auto">
              <AddTeamMembers
                url={`http://localhost:8080/gdo-api/gdo/${userObj.userObj.userId}/add-team`}
                projectId={projectDetails?.projectId}
                setUpdates={setUpdates}
                api="gdo-api"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 m-auto">
              <RaiseResourceRequest projectId={projectDetails?.projectId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedView;
