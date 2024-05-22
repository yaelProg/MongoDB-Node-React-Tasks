////הורדתי תעמוד הזה קומפלט מMUIד
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useUpdatePostMutation } from '../../posts/postsApiSlice';

function PostDialog({ post, open, setOpen }) {
  const [Edit] = useUpdatePostMutation()

  const [title, setTitle] = React.useState(post.title)
  const [body, setBody] = React.useState(post.body)

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Edit({ _id: post._id, title: title, body: body, likes: post.likes })
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
            id="title"
            label="Title"
            type="text"
            defaultValue={post.title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
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

