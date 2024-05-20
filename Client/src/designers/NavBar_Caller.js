import React from "react";
import DecodeToken from "../auth/decodeToken";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
const NavBar_Caller = () => {
    const Token = DecodeToken()
    const navigate = useNavigate()

    return (
        <>
            <NavBar isAdmin={Token.roles === "admin"} />
        </>
    )
}
export default NavBar_Caller