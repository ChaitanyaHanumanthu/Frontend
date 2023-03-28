import "./Header.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearState } from "../../slices/loginSlice";

function Header() {
  // let dispatch
  let dispatch = useDispatch();

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    // clear the state
    dispatch(clearState());
  };

  // status from the store
  const { status } = useSelector((state) => state.login);
  console.log(status);
  return (
    <div className="Navbars fw-bold">
      <ul className="nav text-start">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/"
          >
            Project Pulse
          </NavLink>
        </li>
      </ul>

      {status == "success" && (
        <ul className="nav justify-content-end m-auto">
          {/* project pulse
          <li className=" nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link" : "inactive nav-link"
              }
              to="/"
            >
              Project Pulse
            </NavLink>
          </li> */}

          {/* Logout */}
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
        </ul>
      )}
    </div>
  );
}

export default Header;
