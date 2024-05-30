import React from "react";
import { Grid, Typography } from "@mui/material";
import UserDesigner from "../designers/UserDesigner";
import AddButton from "../designers/AddButton";
import { useGetUsersQuery } from "../users/userApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import DecodeToken from "../auth/decodeToken";
import AddUserDialog from "../designers/Dialogs/AddUserDialog";

/**
 * Component for rendering the page displaying users.
 * This component fetches users from the server and displays them in a grid layout.
 * Users with admin role are allowed access, others are shown a message.
 */
const UsersPage = () => {
  // Check authentication token when component mounts
  const { CheckToken } = PrivateRoute();
  CheckToken();

  // Fetch users from the server
  const { data: users, isError, isLoading, error } = useGetUsersQuery();
  const userRoles = DecodeToken().roles;
  const [openDialog, setOpenDialog] = React.useState(false);

  // If user is not an admin, display message and deny access
  if (userRoles !== "admin") {
    return <p>You are not allowed here</p>;
  }

  return (
    <div className="sPage">
      {/* Render the navigation bar */}
      <NavBar_Caller />
      <br />
      {/* Button to open the add user dialog */}
      <AddButton setOpenDialog={setOpenDialog} />
      {/* Display loading message while fetching users */}
      {isLoading && <p>Loading...</p>}
      {/* Display error message if there's an error fetching users */}
      {isError && <p>Error: {error.message}</p>}
      {/* Display users if available */}
      {users && users.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px', maxWidth:"98%" }}>
          <br />
          {/* Map through users and render UserDesigner component for each */}
          {users.map((user) => (
            <Grid item key={user._id} xs={12} sm={6} md={4} lg={3}>
              <UserDesigner user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Display message if there are no users in the database
        <Typography>No users in DB</Typography>
      )}
      {/* AddUserDialog component for adding new users */}
      <AddUserDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default UsersPage;