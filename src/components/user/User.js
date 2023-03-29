import React from "react";
import { useSelector } from "react-redux";

function User() {
  // state from the slice
  let userObj = useSelector((state) => state.login);
  console.log("form user",userObj);
  return (
    <div>
      <h3>{userObj.userObj.firstName+" "+userObj.userObj.lastName}</h3>
    </div>
  );
}

export default User;
