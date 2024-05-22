import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DecodeToken from "./decodeToken";

/* Asynchronously checks the validity of the token by sending a request to the server.
* If the token is invalid, redirects the user to the login page.*/
export default async function CheckToken() {
  const navigate = useNavigate()
  // Get token from localStorage
  //const token = localStorage.getItem("token");
  const { token } = DecodeToken()

  // Sending a request to the server to validate the token
  const response = await axios.get("http://localhost:2004/api/functionToken/" + token);

  // Checking the validity of the token
  if (response.data.ans === false) {
    // Redirecting the user to the login page if the token is invalid
    navigate("/Login");
  }

  // return an empty function
  return () => { };
}