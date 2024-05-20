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
import { useUpdatePostMutation } from '../../posts/postsApiSlice';

function PostDialog({ post }) {
  const [Edit] = useUpdatePostMutation()



  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState(post.title)
  const [body, setBody] = React.useState(post.body)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Edit({ _id: post._id, title: title, body: body, likes: post.likes })
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
            id="title"
            label="title"
            type="text"
            defaultValue={post.title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth

          />

          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="body"
            type="text"
            defaultValue={post.body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            fullWidth
          />




        </DialogContent>
        <DialogActions>
          <Button
            disabled={!title}
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
export default PostDialog;

