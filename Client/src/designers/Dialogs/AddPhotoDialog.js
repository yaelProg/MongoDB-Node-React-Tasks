import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreatePhotoMutation } from '../../photos/photosApiSlice';
import { UploadFile } from '@mui/icons-material';
import { MuiFileInput } from 'mui-file-input'

/**
 * AddPhotoDialog component for adding new photos.
 * Renders a dialog form for adding a new photo with title and image URL.
 **/
function AddPhotoDialog({ open, setOpen }) {
  const [Add] = useCreatePhotoMutation()

  const [title, setTitle] = React.useState()
  const [imageUrl, setImageUrl] = React.useState()
  const [file, setFile] = React.useState(null);

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  /**
  * Handles the save action.
  * Calls the mutation to add the new photo and closes the dialog.
  */
  const handleSave = () => {
    Add({ title: title, imageUrl: file });
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Photo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="Add Picture URL"
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
          {/* <div className="card flex justify-content-center">
    <MuiFileInput value={imageUrl} onChange={handleChange} />
          </div>
          <div className="card flex justify-content-center">
            <FileUpload fullWidth name="demo[]" auto accept="image/*" maxFileSize={1000000000000000} emptyTemplate={<p className="m-0">upload picture</p>}
              uploadLabel='&nbsp;העלאה' cancelLabel='&nbsp;ביטול' chooseLabel='choose &nbsp;'
                                    customUpload
              // uploadHandler={(e) => setImageUrl(e.files[0])}
            // />

          // </div> 
          // */}
          <MuiFileInput value={file} onChange={handleChange} display="inline-block"
            fullWidth
            placeholder='Upload Photo'
          >
            <UploadFile />
          </MuiFileInput>
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

export default AddPhotoDialog;