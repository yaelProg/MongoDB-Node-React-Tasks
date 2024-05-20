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
import { useUpdateUserMutation } from '../../users/userApiSlice';
import {  InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IsraelFlag from './IsraelFlag.png'; // Assuming IsraelFlag component exists for displaying the flag


function UserDialog({ user }) {
  const [Edit] = useUpdateUserMutation()

  const [open, setOpen] = React.useState(true);
  const [firstName, setFirstName] = React.useState(user.firstName)
  const [lastName, setLastName] = React.useState(user.lastName)
  const [userName, setUserName] = React.useState(user.username)
  const [email, setEmail] = React.useState(user.email)
  const [address, setAddress] = React.useState(user.address)
  const [phone, setPhone] = React.useState(user.phone)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Edit({ _id: user._id, firstName: firstName, lastName: lastName, userName: userName, email: email, phone: phone, address: address })
  }

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
            label="firstname"
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
            label="lastname"
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
            label="userName"
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
            label="email"
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="address"
            type="text"
            defaultValue={user.address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
          {/* <FormControl fullWidth>
    <InputLabel htmlFor="phone">Phone number</InputLabel>
     <Select
        labelId="phone"
        id="phone"
        value={''}
        onChange={() => {}}
        startAdornment={
          
        <MenuItem value={''} disabled>Select country</MenuItem>
        <MenuItem value={'+972'}>+972 - Israel</MenuItem>
        {/* Add more countries as needed */}
    {/* </Select>  */}
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="phone"
            // type="text"
            defaultValue={user.phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            type="tel"
            inputProps={{ inputMode: 'tel', pattern: '[0-9]{3}-[0-9]{7}' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                {/* <IsraelFlag /> */}
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
            handleClose();
          }} color= 'primary'

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

