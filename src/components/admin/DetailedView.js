import React from "react";
import Indicator from "./Indicator";
import ProjectDetailsWidget from "./ProjectDetailsWidget";
import ProjectUpdatesWidget from "./ProjectUpdatesWidget";
import ProjectConcerns from "./ProjectConcerns";
import { useLocation } from "react-router-dom";
import RaiseConcern from "../projectmanager/RaiseConcern";
import RaiseUpdate from "../projectmanager/RaiseUpdate";

function DetailedView() {
  let { state } = useLocation();
  console.log("state", state);
  return (
    <div>
      <h2 className="text-center mt-5">
        Here is the detailed view of the project
      </h2>
      <div className="mb-5 mt-5">
        <Indicator state={state} />
      </div>
      <div className="mb-5 mt-5">
        <ProjectDetailsWidget state={state} />
      </div>
      <div className="mb-5 mt-5">
        <ProjectUpdatesWidget state={state} />
      </div>
      <div className="mb-5 mt-5">
        <ProjectConcerns state={state} />
      </div>
      {state.api == "manager-api" && (
        <div className="row m-auto justify-content-center">
          <div>
            <h3 className="text-dark m-4 text-center">
              Here are some additional functions
            </h3>
          </div>
          <div className="mb-5 col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseConcern state={state} />
          </div>
          <div className="col-10 col-sm-8 col-md-4 col-lg-4">
            <RaiseUpdate state={state} />
          </div>
        </div>
      )}

      {state.api == "admin-api" && <div></div>}
    </div>
  );
}

export default DetailedView;
