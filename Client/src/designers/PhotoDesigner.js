import React from "react";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoDialog from "./Dialogs/PhotoDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDeletePhotoMutation } from "../photos/photosApiSlice";
import { Typography } from "@material-ui/core";

// PhotoDesigner component displays a card for a photo with options to edit and delete it.
const PhotoDesigner = ({ photo }) => {
  const [Delete] = useDeletePhotoMutation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  // Handles the click event for deleting the photo.
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  // Confirms the deletion of the photo.
  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(photo._id);
  };

  // Cancels the deletion action.
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      <br />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column", // Set flex direction to column
          justifyContent: "space-between",
          p: 1,
          mx: 2, // Add margin on the x-axis (horizontal)
        }}
      >
        <CardMedia
          component="img"
          height="300"
          width="400"
          image={photo.imageUrl}
          alt={photo.title}
        />
        <Box sx={{ p: 1 }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            {photo.title}
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
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
          {/* Confirmation dialog for delete action */}
          <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {photo.title}?
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
        </Box>
      </Card>
      {/* Dialog for editing photo */}
      <PhotoDialog photo={photo} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
};

export default PhotoDesigner;