import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useUpdatePhotoMutation } from '../../photos/photosApiSlice';

/**
 * PhotoDialog component for editing photo details.
 * Renders a dialog form for editing photo title and image URL.
**/
function PhotoDialog({ photo, open, setOpen }) {
  const [Edit] = useUpdatePhotoMutation()

  const [title, setTitle] = React.useState(photo.title)
  const [imageUrl, setImageUrl] = React.useState(photo.imageUrl)

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the save action.
   * Calls the mutation to update the photo details and closes the dialog.
   */
  const handleSave = () => {
    Edit({ _id: photo._id, title: title, imageUrl: imageUrl })
    handleClose();
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
            label="Title"
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
            label="Pic"
            type="text"
            defaultValue={photo.imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!title}
            onClick={() => {
              handleSave();
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