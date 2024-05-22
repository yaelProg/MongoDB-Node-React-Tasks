////הורדתי תעמוד הזה קומפלט מMUIד
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreatePostMutation } from '../../posts/postsApiSlice';


function AddPostDialog({ open, setOpen }) {
  const [Add] = useCreatePostMutation()

  const [title, setTitle] = React.useState()
  const [body, setBody] = React.useState()
  const [likes, setLikes] = React.useState()

  const handleClose = () => {
    // setLikes()
    setOpen(false);
  };

  const handleSave = () => {
    Add({ title: title, body: body, likes: likes })
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Enter the post title"
            type="text"
            placeholder={'enter the post title'}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            autoFocus
            multiline
            rows={4}
            margin="dense"
            id="body"
            label="Enter post body"
            type="text"
            placeholder={'enter post body'}
            onChange={(e) => setBody(e.target.value)}
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
export default AddPostDialog;

