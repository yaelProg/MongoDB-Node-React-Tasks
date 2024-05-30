import React from "react";
import { Grid, Typography } from "@mui/material";
import PostDesigner from "../designers/PostDesigner";
import AddButton from "../designers/AddButton";
import { useGetPostsQuery } from "../posts/postsApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import AddPostDialog from "../designers/Dialogs/AddPostDialog";

/**
 * Component for rendering the page displaying posts.
 * This component fetches posts from the server and displays them in a grid layout.
 * Users can add new posts via the AddPostDialog component.
 */
const PostsPage = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);

  // Check authentication token when component mounts
  const { CheckToken } = PrivateRoute();
  CheckToken();

  // Fetch posts from the server
  const { data: posts, isError, isLoading, error } = useGetPostsQuery("", {
    refetchOnMountOrAgChange: true,
    refetchOnFocus: true
  });

  return (
    <div className="sPage">
      {/* Render the navigation bar */}
      <NavBar_Caller />
      <br></br>
      {/* Button to open the add post dialog */}
      <AddButton setOpenDialog={setOpenDialog} />
      {/* Display loading message while fetching posts */}
      {isLoading && <p>Loading...</p>}
      {/* Display error message if there's an error fetching posts */}
      {isError && <p>Error: {error.message}</p>}
      {/* Display posts if available */}
      {posts && posts.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px', maxWidth:"98%" }}>
          <br></br>
          {/* Map through posts and render PostDesigner component for each */}
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
              <PostDesigner post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Display message if there are no posts in the database
        <Typography>No photos in DB</Typography>
      )}
      {/* AddPostDialog component for adding new posts */}
      <AddPostDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default PostsPage;