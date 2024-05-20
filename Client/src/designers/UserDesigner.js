import React from "react";
import { Box, Card, CardContent, Fab } from "@mui/material";
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
          {/* <p>{user.email}</p> */}
          <Box display="flex" justifyContent="flex-end" marginRight="8px">
            <Box>
              {/* <Fab color="secondary" aria-label="edit" size="small" onClick={() => setOpenDialog(true)}>
                <EditIcon />
              </Fab>
              <Fab color="error" aria-label="delete" size="small" onClick={handleDeleteClick} sx={{ marginLeft: 1 }}>
                <DeleteIcon />
              </Fab> */}
              <div >
          <EditIcon
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}
            // style={{ cursor: "pointer", marginRight: "8px" }}
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
      {openDialog && <UserDialog user={user} />}
    </Box>
  );
};

export default UserDesigner;
