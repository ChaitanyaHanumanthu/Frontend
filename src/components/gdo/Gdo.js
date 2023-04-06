// importing the required modules and components
import React from "react";
import { Outlet } from "react-router-dom";

// Gdo component
function Gdo() {

  // returnin the gdo homepage component
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}


// exporing the gdo 
export default Gdo;
