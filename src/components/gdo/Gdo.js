import React from "react";
import { Outlet } from "react-router-dom";
import RaiseResourceRequest from "./RaiseResourceRequest";

function Gdo() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Gdo;
