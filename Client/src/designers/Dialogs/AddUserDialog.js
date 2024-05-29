import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRegisterMutation } from '../../auth/authApiSlice';
import { InputAdornment } from '@mui/material';
import IsraelFlag from './IsraelFlag.png';

/**
 * AddUserDialog component for adding new users.
 * Renders a dialog form for adding a new user with various fields.
**/
function AddUserDialog({ open, setOpen }) {
  const [Add] = useRegisterMutation()

  const [newUser, setNewUser] = React.useState()

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the save action.
   * Calls the mutation to add the new user and closes the dialog.
   */

  const handleSave = async () => {
    debugger
    var res = await Add(newUser);
    if (res.error) {
      alert(res.error.data.message);
    } else {
      handleClose()
    }
  }

  // Checks if the input fields are valid for enabling the save button.
  const isValid = newUser?.username && newUser?.firstName && newUser?.lastName

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
            placeholder={'Enter the name'}
            onChange={(e) => setNewUser({ ...newUser, ["firstName"]: e.target.value })}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            placeholder={'Enter the name'}
            onChange={(e) => setNewUser({ ...newUser, ["lastName"]: e.target.value })}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="User Name"
            type="text"
            placeholder={'Enter user name'}
            onChange={(e) => setNewUser({ ...newUser, ["username"]: e.target.value })}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Password"
            type="password"
            placeholder={'Enter password'}
            onChange={(e) => setNewUser({ ...newUser, ["password"]: e.target.value })}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            placeholder={'Enter email'}
            onChange={(e) => setNewUser({ ...newUser, ["email"]: e.target.value })}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            placeholder={'Enter address'}
            onChange={(e) => setNewUser({ ...newUser, ["address"]: e.target.value })}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            onChange={(e) => setNewUser({ ...newUser, ["phone"]: e.target.value })}
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