import React from "react";
import { Grid, Typography } from "@mui/material";
import PhotoDesigner from "../designers/PhotoDesigner";
import AddButton from "../designers/AddButton";
import { useGetPhotosQuery } from "../photos/photosApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import "./page.css"

const UsersPage = () => {
  const { CheckToken } = PrivateRoute();
  CheckToken();
  const { data: photos, isError, isLoading, error } = useGetPhotosQuery();

  return (
    <div className="sPage">
      <NavBar_Caller />
      <br></br>
      <AddButton p={"Photos"} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {photos && photos.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px' }}>
          <br></br>

          {photos.map((photo) => (
            <Grid item key={photo._id} xs={12} sm={6} md={4} lg={3}>
              <PhotoDesigner photo={photo} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No photos in DB</Typography>
      )}
    </div>
  );
};

export default UsersPage;
