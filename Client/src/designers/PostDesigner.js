import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDialog from "./Dialogs/PostDialog";
import { useUpdatePostMutation } from '../posts/postsApiSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDeletePostMutation } from "../posts/postsApiSlice";

const PostDesigner = ({ post }) => {
  const [Delete] = useDeletePostMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [postLikes, setPostLikes] = React.useState(post.likes ? post.likes : 0);
  const [Edit] = useUpdatePostMutation()

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(post._id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const toggleBody = () => {
    setShowBody(!showBody);
  };

  const addLike = () => {
    Edit({ _id: post._id, title: post.title, body: post.body, likes: postLikes + 1 });
    setPostLikes(postLikes + 1);
}


  return (
    <Card style={{ cursor: "pointer", marginBottom: "8px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ textAlign: "center" }}>

        </Typography>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
          <Typography
            variant="body1"
            onClick={toggleBody}
            style={{ cursor: "pointer", color: "#757575" }} // Set color to gray
          >
            <Button >{showBody ? "hide post" : "show post"}</Button>
          </Typography>
        </div>
        {showBody && (
          // <Typography variant="body1" gutterBottom>
          //   <br></br>
          //   {post.body}

          // </Typography>
          //           <Typography variant="body1" gutterBottom>
          //   {post.body.match(/.{1,20}/g).map((chunk, index) => (
          //     <React.Fragment key={index}>
          //       {chunk}
          //       <br />
          //     </React.Fragment>
          //   ))}
          // </Typography>
          <Typography variant="body1" gutterBottom>
            {post?.body?.split(' ').reduce((acc, word) => {
              if (acc.length === 0) {
                return [word];
              } else {
                const lastLine = acc[acc.length - 1];
                if ((lastLine + ' ' + word).length <= 20) {
                  acc[acc.length - 1] += ' ' + word;
                } else {
                  acc.push(word);
                }
                return acc;
              }
            }, []).map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>



        )}
     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", marginBottom: "0px" }}>
  <Button style={{ cursor: "pointer", marginRight: "8px", borderRadius: "100px", border: "1px solid" }} onClick={addLike}>
    <FavoriteIcon color="red" /> <div>{postLikes}</div>
  </Button>
  <div>
    <EditIcon
      color="primary"
      onClick={(e) => {
        e.stopPropagation();
        setOpenDialog(true);
      }}
      style={{ cursor: "pointer", marginRight: "8px" }}
    />
    <DeleteIcon
      color="error"
      onClick={handleDeleteClick}
      style={{ cursor: "pointer" }}
    />
  </div>
</div>
<Dialog open={confirmDelete} onClose={handleDeleteCancel}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete {post.title}?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDeleteCancel} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDeleteConfirm} color="secondary">
      Delete
    </Button>
  </DialogActions>
</Dialog>


      </CardContent>
      {openDialog && <PostDialog post={post} />}
    </Card>
  );
};

export default PostDesigner;
