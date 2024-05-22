import React, { useState } from "react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
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

// PostDesigner component displays a card for a post with options to edit, delete, and like it.
const PostDesigner = ({ post }) => {
  const [Delete] = useDeletePostMutation();
  const [Edit] = useUpdatePostMutation()

  const [openDialog, setOpenDialog] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [postLikes, setPostLikes] = React.useState(post.likes ? post.likes : 0);

  // Handles the click event for deleting the post.
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  // Confirms the deletion of the post.
  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(post._id);
  };

  // Cancels the deletion action.
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  // Toggles the visibility of the post body.
  const toggleBody = () => {
    setShowBody(!showBody);
  };

  // Handles the click event for adding a like to the post.
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
            <IconButton onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}>
              <EditIcon
                color="primary"
              />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon
                color="error"
              />
            </IconButton>
          </div>
        </div>
        {/* Confirmation dialog for delete action */}
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
      {/* Dialog for editing post */}
      <PostDialog post={post} open={openDialog} setOpen={setOpenDialog} />
    </Card>
  );
};

export default PostDesigner;