import React from "react";
import { Grid, Typography } from "@mui/material";
import PhotoDesigner from "../designers/PhotoDesigner";
import AddButton from "../designers/AddButton";
import { useGetPhotosQuery } from "../photos/photosApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import "./page.css"
import AddPhotoDialog from "../designers/Dialogs/AddPhotoDialog";

/**
 * Component for rendering the page displaying photos.
 * This component fetches photos from the server and displays them in a grid layout.
 * Users can add new photos via the AddPhotoDialog component.
 */
const UsersPage = () => {
  const { data: photos, isError, isLoading, error } = useGetPhotosQuery();
  const [openDialog, setOpenDialog] = React.useState(false);

  // Check authentication token when component mounts
  const { CheckToken } = PrivateRoute();
  CheckToken();

  return (
    <div className="sPage">
      {/* Render the navigation bar */}
      <NavBar_Caller />
      <br></br>
      {/* Button to open the add photo dialog */}
      <AddButton setOpenDialog={setOpenDialog} />
      {/* Display loading message while fetching photos */}
      {isLoading && <p>Loading...</p>}
      {/* Display error message if there's an error fetching photos */}
      {isError && <p>Error: {error.message}</p>}
      {/* Display photos if available */}
      {photos && photos.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px' }}>
          <br></br>
          {/* Map through photos and render PhotoDesigner component for each */}
          {photos.map((photo) => (
            <Grid item key={photo._id} xs={12} sm={6} md={4} lg={3}>
              <PhotoDesigner photo={photo} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Display message if there are no photos in the database
        <Typography>No photos in DB</Typography>
      )}
      {/* AddPhotoDialog component for adding new photos */}
      <AddPhotoDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default UsersPage;