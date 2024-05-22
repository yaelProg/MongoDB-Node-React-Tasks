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

const UserDesigner = ({ user }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [Delete] = useDeleteUserMutation();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(user._id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <br />
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Box display="flex" justifyContent="flex-end" marginRight="8px">
            <Box>
              <div >
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  setOpenDialog(true);
                }}>
                  <EditIcon
                    color="primary"
                  /></IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </div>
              <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete {user.firstName} {user.lastName}?
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
          </Box>
        </CardContent>
      </Card>
      <UserDialog user={user} open={openDialog} setOpen={setOpenDialog} />
    </Box>
  );
};

export default UserDesigner;
