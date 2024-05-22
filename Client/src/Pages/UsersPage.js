import React from "react";
import { Grid, Typography } from "@mui/material";
import UserDesigner from "../designers/UserDesigner";
import AddButton from "../designers/AddButton";
import { useGetUsersQuery } from "../users/userApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import DecodeToken from "../auth/decodeToken";
import AddUserDialog from "../designers/Dialogs/AddUserDialog";

const UsersPage = () => {
  const { CheckToken } = PrivateRoute();
  CheckToken();
  const { data: users, isError, isLoading, error } = useGetUsersQuery();
  const userRoles = DecodeToken().roles;
  const [openDialog, setOpenDialog] = React.useState(false);

  if (userRoles !== "admin") {
    return <p>You are not allowed here</p>;
  }

  return (
    <div className="sPage">
      <NavBar_Caller />
      <br />
      <AddButton setOpenDialog={setOpenDialog} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {users && users.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px' }}>
          <br />
          {users.map((user) => (
            <Grid item key={user._id} xs={12} sm={6} md={4} lg={3}>
              <UserDesigner user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No users in DB</Typography>
      )}
      <AddUserDialog open={openDialog} setOpen={setOpenDialog}/>
    </div>
  );
};

export default UsersPage;
