import React from "react";
import Indicator from "./Indicator";
import ProjectDetailsWidget from "./ProjectDetailsWidget";
import ProjectUpdatesWidget from "./ProjectUpdatesWidget";
import ProjectConcerns from "./ProjectConcerns";
import { useLocation } from "react-router-dom";

function DetailedView() {
  let { state } = useLocation();
  console.log("state", state);
  return (
    <div>
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
    </div>
  );
}

export default DetailedView;
