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
import { useUpdatePhotoMutation } from '../../photos/photosApiSlice';

function PhotoDialog({ photo }) {
  const [Edit] = useUpdatePhotoMutation()



  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState(photo.title)
  const [imageUrl, setImageUrl] = React.useState(photo.imageUrl)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Edit({ _id: photo._id, title: title, imageUrl: imageUrl })

  }

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
            label="title"
            type="text"
            defaultValue={photo.title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required

          />

          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="pic"
            type="text"
            defaultValue={photo.imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}

            fullWidth
          />




        </DialogContent>
        <DialogActions>
          <Button 
          disabled = {!title}
          onClick={() => {
            handleSave();
            handleClose();
          }} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );

}
export default PhotoDialog;

