import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// importing the components
import Header from "../header/Header";
import Footer from "../footer/Footer";

// root Layout
function RootLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    // if there is no token then redirect to login component
    if (sessionStorage.getItem("token") === null) {
      console.log("token not found");
      navigate("/");
    }
  }, []);

  return (
    <div className="root">
      <div className="header  p-3 text-center">
        <Header />
      </div>
      <div className="outlet " style={{ minHeight: "90vh" }}>
        <Outlet />
      </div>
      <div className="footer p-3">
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
