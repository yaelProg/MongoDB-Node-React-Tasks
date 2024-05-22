import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreateUserMutation } from '../../users/userApiSlice';

/**
 * AddUserDialog component for adding new users.
 * Renders a dialog form for adding a new user with various fields.
**/
function AddUserDialog({ open, setOpen }) {
  const [Add] = useCreateUserMutation()

  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [userName, setUserName] = React.useState()
  const [email, setEmail] = React.useState()
  const [address, setAddress] = React.useState()
  const [phone, setPhone] = React.useState()
  const [pwd, setPwd] = React.useState()

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the save action.
   * Calls the mutation to add the new user and closes the dialog.
   */
  const handleSave = async () => {
    await Add({ firstName: firstName, lastName: lastName, userName: userName, email: email, address: address, phone: phone, password: pwd })
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            placeholder={'enter the name'}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            placeholder={'enter the name'}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            placeholder={'enter userName'}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="Password"
            type="text"
            placeholder={'enter password'}
            onChange={(e) => setPwd(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            placeholder={'enter email'}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            placeholder={'enter address'}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            placeholder={'enter phone'}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleSave();
          }} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUserDialog;