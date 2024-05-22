import React from "react";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserDialog from "./Dialogs/UserDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useDeleteUserMutation } from "../users/userApiSlice";
import { Typography } from "@material-ui/core";

// Component for displaying user details with edit and delete functionalities.
const UserDesigner = ({ user }) => {
  const [Delete] = useDeleteUserMutation();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(user._id);
  };

  // Function to handle canceling delete operation
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <br />
          {/* Display user's full name */}
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            {user.firstName + ' ' + user.lastName}
          </Typography>
          {/* Buttons for edit and delete actions */}
          <Box display="flex" justifyContent="flex-end" marginRight="8px">
            <Box>
              <div >
                {/* Button to open edit dialog */}
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  setOpenDialog(true);
                }}>
                  <EditIcon
                    color="primary"
                  /></IconButton>
                {/* Button to initiate delete action */}
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </div>
              {/* Dialog for confirming delete operation */}
              <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {/* Confirmation message with user's name */}
                    Are you sure you want to delete {user.firstName} {user.lastName}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  {/* Button to cancel delete operation */}
                  <Button onClick={handleDeleteCancel} color="primary">
                    Cancel
                  </Button>
                  {/* Button to confirm delete operation */}
                  <Button onClick={handleDeleteConfirm} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {/* Dialog for editing user details */}
      <UserDialog user={user} open={openDialog} setOpen={setOpenDialog} />
    </Box>
  );
};

export default UserDesigner;