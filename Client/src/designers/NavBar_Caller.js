import React from "react";
import DecodeToken from "../auth/decodeToken";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";

/**
 * NavBar_Caller component determines whether to render the navigation bar for an admin user.
 * It checks the role of the user decoded from the token.
 */
const NavBar_Caller = () => {
    // Decode the token to get user information
    const Token = DecodeToken();

    // Hook for navigation
    const navigate = useNavigate();

    return (
        <>
            {/* Render the NavBar component with isAdmin prop based on user role */}
            <NavBar isAdmin={Token.roles === "admin"} />
        </>
    )
}

export default NavBar_Caller;
