// import React from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../slices/loginSlice";

function Header() {
  // let status
  let { status } = useSelector((state) => state.login);
  const userObj = useSelector((state) => state.login);
  // console.log("user", userObj);
  // dispatch
  let dispatch = useDispatch();

  // naigate
  let navigate = useNavigate();

  // logout function
  const logout = () => {
    // remove the token
    sessionStorage.removeItem("token");
    // clear the state
    dispatch(clearState());
    navigate("/");
  };

  return (
    <div className=" Navbars p-2 mb-4 headers fw-bolder fs-5 ">
      {status == "success" ? (
        <ul className="nav  justify-content-end m-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="/"
              onClick={logout}
            >
              Logout
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => isActive && "inactive nav-link mine"}
            >
              {userObj.userObj.email}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav justify-content-between m-auto">
          <li className="nav-item text-start">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "active nav-link text-light"
                  : "inactive nav-link text-light"
              }
              to="/"
            >
              Project Pulse
            </NavLink>
          </li>

          {/* <li className="nav-item">
            <NavLink className="nav-link " to="/">
              Login
            </NavLink>
          </li> */}
        </ul>
      )}
    </div>
  );
}

export default Header;
