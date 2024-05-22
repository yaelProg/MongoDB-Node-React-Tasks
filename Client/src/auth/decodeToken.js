import { jwtDecode } from 'jwt-decode'

/**
 * Decodes the JWT token stored in localStorage to extract user information.
 * Returns an object containing user roles, ID, and full name if the token exists.
 * returns {Object | null} Object with user roles, ID, and full name or null if token is not found
 */
const DecodeToken = () => {
    const token = localStorage.getItem("token")

    if (token != undefined) {
        // Decode the JWT token to extract user information
        const userDecode = jwtDecode(token)
        const { roles } = userDecode
        const { _id } = userDecode
        const { firstName } = userDecode
        const { lastName } = userDecode
        const fullname = firstName + ' ' + lastName
        console.log(`id = ${_id}, fULLname = ${fullname} ROLES ${roles}`)
        return { roles, _id, fullname }
    }
    // Return null if token is not found
    return null
}

export default DecodeToken