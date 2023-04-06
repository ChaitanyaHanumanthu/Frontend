// importing the modules and components
import React from "react";
import { useSelector } from "react-redux";

// user component
function User() {
  // state from the slice
  let userObj = useSelector((state) => state.login);
  console.log("form user", userObj);
  return (
    <div>
      <h3>{userObj.userObj.firstName + " " + userObj.userObj.lastName}</h3>
    </div>
  );
}

// exporting the component
export default User;
