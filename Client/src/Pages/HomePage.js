import React from "react";
import NavBar from "../designers/NavBar";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
// import LogOut from "../auth/LogOut";
import "./Home.css"

const HomePage = () => {
  const { CheckToken } = PrivateRoute();
  CheckToken();

  return (
    <>
      <NavBar_Caller />
      <div className="background-container">
        <div className="content-wrapper">
          {/* <LogOut /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
