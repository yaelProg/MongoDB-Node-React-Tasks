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
import { useCreatePhotoMutation } from '../../photos/photosApiSlice';
import { FileUpload } from '@mui/icons-material';


function AddPhotoDialog() {
  const [Add] = useCreatePhotoMutation()
  //const refetch = useSelector((myStore)=>myStore.PhotoSlice.refetch)


  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState()
  const [imageUrl, setImageUrl] = React.useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Add({ title: title, imageUrl: imageUrl })
    //refetch()
  }

  return (

    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the fields you wish
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="add title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="add picture url"
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}

            fullWidth
          />
        </DialogContent>


          <div className="card flex justify-content-center">
            <FileUpload name="demo[]" auto accept="image/*" maxFileSize={1000000000000000} emptyTemplate={<p className="m-0">upload picture</p>}
              uploadLabel='&nbsp;העלאה' cancelLabel='&nbsp;ביטול' chooseLabel='choose &nbsp;'
                                   /**/ customUpload
              uploadHandler={(e) => setImageUrl(e.files[0])}
            />

          </div>





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
export default AddPhotoDialog;

