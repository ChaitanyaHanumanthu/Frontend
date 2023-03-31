import React from "react";
import { Outlet } from "react-router-dom";
import RaiseResourceRequest from "./RaiseResourceRequest";

function Gdo() {
  return (
    <div>
      hai
      <div>
        <Outlet />
      </div>
      {/* <div>
        <RaiseResourceRequest/>
      </div> */}
    </div>
  );
}

export default Gdo;
