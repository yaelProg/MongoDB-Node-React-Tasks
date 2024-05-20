import React, { useState } from "react";
import { Box, Card, CardMedia, Fab } from "@mui/material";
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

const PhotoDesigner = ({ photo }) => {
  const [Delete] = useDeletePhotoMutation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(photo._id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const [selectedPicture, setSelectedPicture] = useState(null);


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
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}> */}
            {/* <Fab
              color="primary"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDialog(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <EditIcon />
            </Fab> */}
            {/* <Fab
              color="error"
              aria-label="delete"
              onClick={handleDeleteClick}
              style={{ cursor: "pointer" }}
            >
              <DeleteIcon />
            </Fab> */}
           <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
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
        {/* </Box> */}
      </Card>
      {openDialog && <PhotoDialog photo={photo} />}
    </>
  );
};

export default PhotoDesigner;
