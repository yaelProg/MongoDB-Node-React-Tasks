import { useFunctionTokenMutation } from "./authApiSlice"
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * PrivateRoute component to protect routes.
 * Checks if the user has a valid token stored in local storage.
 * If the token is valid, allows access to the route; otherwise, redirects to the login page.
 * returns {object} - Object containing a function to check the token.
 */
const PrivateRoute = () => {
    const navigate = useNavigate() // React Router navigation hook

    /**
     * Function to check the validity of the token.
     * Redirects to the login page if no token is found or if the token is invalid.
     */
    const CheckToken = async () => {
        if (localStorage.length == 0) { // Check if local storage is empty
            navigate("/login") // Redirect to the login page if no token is found
        }
        // Send a request to the server to check the validity of the token
        const ans = await axios("http://localhost:2004/api/functionToken/" + localStorage.getItem("token"))
        console.log(ans.data.ans)
        if (ans.data.ans == false) {
            navigate("/login")
        }
    }
    return { CheckToken }
}
export default PrivateRoute