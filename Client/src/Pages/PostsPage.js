import React from "react";
import { Grid, Typography } from "@mui/material";
import PostDesigner from "../designers/PostDesigner";
import AddButton from "../designers/AddButton";
import { useGetPostsQuery } from "../posts/postsApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import AddPostDialog from "../designers/Dialogs/AddPostDialog";

const PostsPage = () => {
  const { CheckToken } = PrivateRoute();
  CheckToken();

  const { data: posts, isError, isLoading, error } = useGetPostsQuery("", {
    refetchOnMountOrAgChange: true,
    refetchOnFocus: true
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);

  return (
    <div className="sPage">
      <NavBar_Caller />
      <br></br>
      <AddButton setOpenDialog={setOpenDialog} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {posts && posts.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px' }}>
          <br></br>

          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} md={4} lg={3}>
              <PostDesigner post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No photos in DB</Typography>
      )}
      <AddPostDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default PostsPage;
