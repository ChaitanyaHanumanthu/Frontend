import "./Header.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearState } from "../../slices/loginSlice";

function Header() {
  // let dispatch
  let dispatch = useDispatch();

  // let navigate
  let navigate = useNavigate();

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    // clear the state
    dispatch(clearState());
    navigate("/");
  };

  // status from the store
  const { status } = useSelector((state) => state.login);

  return (
    <div className="Navbars d-flex">
      <ul className="nav fw-bold float-start">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link text-white" : "inactive nav-link"
            }
            to="/"
          >
            Project Pulse
          </NavLink>
        </li>
      </ul>

      {status == "success" && (
        <ul className="nav justify-content-end m-auto float-end">
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
          <li className="nav-item text-end align-content-end">
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
