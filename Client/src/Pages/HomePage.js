import React from "react";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import "./Home.css"

/**
 * Component for rendering the home page.
 * This component includes the navigation bar and handles authentication.
 */
const HomePage = () => {
  // Check authentication token when component mounts
  const { CheckToken } = PrivateRoute();
  CheckToken();

  return (
    <>
      {/* Render the navigation bar */}
      <NavBar_Caller />
      <div className="background-container">
        <div className="content-wrapper">
        </div>
      </div>
    </>
  );
};

export default HomePage;