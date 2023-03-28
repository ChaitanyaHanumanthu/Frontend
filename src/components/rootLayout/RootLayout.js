import React from "react";
import { Outlet } from "react-router-dom";

// importing the components
import Header from "../header/Header";
import Footer from "../footer/Footer";

// root Layout
function RootLayout() {
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
