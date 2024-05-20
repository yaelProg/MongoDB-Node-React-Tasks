////הורדתי תעמוד הזה קומפלט מMUIד
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from "react-redux";
import { useCreateUserMutation } from '../../users/userApiSlice';
import { Password } from '@mui/icons-material';

function AddUserDialog({ user }) {
  const [Add] = useCreateUserMutation()



  const [open, setOpen] = React.useState(true);
  const [firstName, setFirstName] = React.useState()
  const [lastName, setLastName] = React.useState()
  const [userName, setUserName] = React.useState()
  const [email, setEmail] = React.useState()
  const [address, setAddress] = React.useState()
  const [phone, setPhone] = React.useState()
  const [pwd, setPwd] = React.useState()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Add({ firstName: firstName, lastName: lastName, userName: userName, email: email, address: address, phone: phone, password: pwd })
  }

  return (

    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the fields you wish
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="firstname"
            type="text"
            placeholder={'enter the name'}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth

          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="lastname"
            type="text"
            placeholder={'enter the name'}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth

          />

          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="userName"
            type="text"
            placeholder={'enter userName'}
            onChange={(e) => setUserName(e.target.value)}

            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="password"
            type="text"
            placeholder={'enter password'}
            onChange={(e) => setPwd(e.target.value)}

            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="email"
            type="email"
            placeholder={'enter email'}
            onChange={(e) => setEmail(e.target.value)}

            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="address"
            type="text"
            placeholder={'enter address'}
            onChange={(e) => setAddress(e.target.value)}

            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="phone"
            type="text"
            placeholder={'enter phone'}
            onChange={(e) => setPhone(e.target.value)}

            fullWidth
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleSave();
            handleClose();
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

