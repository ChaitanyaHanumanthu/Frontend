// importing the required modules and components

import React from "react";
import { useSelector } from "react-redux";
import RegisteredUsers from "../registeredsers/RegisteredUsers";

// superadmin component
function SuperAdmin() {
  let userObj = useSelector((state) => state.login);

  // returning the super admin component
  return (
    <div>
      <div className="container">
        <h2 className="text-center">
          Welcome Back {userObj.userObj.firstName}
        </h2>
        <h4 className="text-center mt-5">Here is the all users</h4>
      </div>
      <div>
        <RegisteredUsers />
      </div>
    </div>
  );
}

// exporting the superadmin component
export default SuperAdmin;
