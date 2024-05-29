import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreateTodoMutation } from '../../todos/todosApiSlice';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Paper } from '@mui/material';

/**
 * AddTodoDialog component for adding new todos.
 * Renders a dialog form for adding a new todo with title and tags.
**/
function AddTodoDialog({ open, setOpen }) {
  const [Add] = useCreateTodoMutation()

  const [title, setTitle] = React.useState()
  const [tags, setTags] = React.useState([])

  // Handles changes in the tag input.
  const onChangeTag = (val, index) => {
    const updatedTagsArray = [...tags];
    updatedTagsArray[index] = val;
    setTags(updatedTagsArray);
  };

  // Adds a new tag to the tags array.
  const onAddTag = () => {
    setTags([...tags, ""]);
  };

  // Deletes a tag from the tags array.
  const onDeleteTag = (index) => {
    const updatedTagsArray = [...tags];
    updatedTagsArray.splice(index, 1);
    setTags(updatedTagsArray);
  }

  // Handles the closure of the dialog.
  const handleClose = () => {
    setOpen(false);
  };

  /**
  * Handles the save action.
  * Calls the mutation to add the new todo and closes the dialog.
  */
  const handleSave = () => {
    Add({ title: title, tags: tags })
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Fill the fields below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            placeholder='Add a title'
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <Paper fullWidth style={{ padding: "1rem", marginTop: "1rem" }}>
            <h4>Tags:</h4>
            {tags?.map((tag, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Paper style={{ display: 'flex', alignItems: 'center', margin: "0.5rem", padding: "0.5rem" }}>
                  <TextField
                    id={index}
                    autoFocus
                    margin="dense"
                    label="Tag"
                    type="text"
                    value={tag}
                    onChange={(e) => onChangeTag(e.target.value, index)}
                    fullWidth
                    style={{ marginRight: '8px' }} // Adjust spacing between TextField and DeleteIcon
                  />
                  <IconButton onClick={() => onDeleteTag(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Paper>
              </div>
            ))}
          </Paper>
          <Button color="primary" onClick={onAddTag}>Add Tag</Button>
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

export default AddTodoDialog;