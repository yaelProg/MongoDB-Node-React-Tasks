import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useUpdateUserMutation } from '../../users/userApiSlice';
import { InputAdornment } from '@material-ui/core';
import IsraelFlag from './IsraelFlag.png';

/**
 * UserDialog component for editing user details.
 * Renders a dialog form for editing user information.
**/
function UserDialog({ user, open, setOpen }) {
  const [Edit] = useUpdateUserMutation()

  const [firstName, setFirstName] = React.useState(user.firstName)
  const [lastName, setLastName] = React.useState(user.lastName)
  const [userName, setUserName] = React.useState(user.username)
  const [email, setEmail] = React.useState(user.email)
  const [address, setAddress] = React.useState(user.address)
  const [phone, setPhone] = React.useState(user.phone)

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the save action.
   * Calls the mutation to update the user details and closes the dialog.
   */
  const handleSave = () => {
    Edit({ _id: user._id, firstName: firstName, lastName: lastName, userName: userName, email: email, address: address, phone: phone })
    handleClose();
  }

  // Checks if the input fields are valid for enabling the save button.
  const isValid = userName && firstName && lastName

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the fields you wish
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            defaultValue={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Last Name"
            type="text"
            defaultValue={user.lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            type="text"
            defaultValue={user.username}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            defaultValue={user.address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            defaultValue={user.phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            type="tel"
            inputProps={{ inputMode: 'tel', pattern: '[0-9]{3}-[0-9]{7}' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={IsraelFlag} alt="Israel Flag"
                    style={{ height: '20px', marginRight: '5px' }}
                  />
                  +972
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!isValid}
            onClick={() => {
              handleSave();
            }} color='primary'
          >
            Save
          </Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserDialog;