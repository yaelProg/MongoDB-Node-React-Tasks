import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DecodeToken from "./decodeToken";
export default async function CheckToken() {
  const navigate = useNavigate()
  // קבלת טוקן מה-localStorage
  //const token = localStorage.getItem("token");
  const { token } = DecodeToken()

  // שליחת בקשה לשרת
  const response = await axios.get("http://localhost:2004/api/functionToken/" + token);

  // בדיקת תוקף הטוקן
  if (response.data.ans === false) {
    // הפניית המשתמש לעמוד התחברות
    navigate("/Login");
  }

  // החזרת פונקציה ריקה
  return () => { };
}
