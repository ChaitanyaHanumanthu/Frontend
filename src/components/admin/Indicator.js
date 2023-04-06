import axios from "axios";
import React, { useEffect, useState } from "react";

function Indicator({ fitness, concernsCount, teamCount }) {
  console.log("fitness", fitness);
  return (
    <div className="container">
      <div className="row text-center fw-bold m-auto justify-content-center">
        {/* project fitness indicator */}
        <div className="mb-3 card ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header text-bg-dark m-2 lead fw-bold">
            Project Fitness Indicator
          </div>
          {fitness == "Amber" ? (
            <div className="card-body fw-bold text-center display-6 text-warning">
              {fitness}
            </div>
          ) : fitness === "green" ? (
            <div className="card-body fw-bold text-center display-6  text-success">
              {fitness}
            </div>
          ) : (
            <div className="card-body fw-bold text-center display-6 text-danger">
              {fitness}
            </div>
          )}
        </div>

        {/* Concerns count */}
        <div className="mb-3 card ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header text-bg-dark m-2 lead fw-bold  ">
            Concerns Count
          </div>

          <div className="card-body fw-bold text-center display-6">
            {concernsCount}
          </div>
        </div>

        {/* Team memberes count */}

        <div className="card mb-3 ms-3 me-4 col-8 col-sm-8 col-md-5 col-lg-3">
          <div className="card-header text-bg-dark m-2 lead fw-bold">
            Team Size
          </div>

          <div className="card-body fw-bold text-center display-6">
            {teamCount == null ? 0 : teamCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Indicator;
