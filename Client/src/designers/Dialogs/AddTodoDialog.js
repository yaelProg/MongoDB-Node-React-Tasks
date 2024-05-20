////הורדתי תעמוד הזה קומפלט מMUIד
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCreateTodoMutation } from '../../todos/todosApiSlice';
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControl, InputLabel, MenuItem, Select, Paper, IconButton } from '@mui/material';

function AddTodoDialog() {
  const [Add] = useCreateTodoMutation()



  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState()
  const [tags, setTags] = React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onChangeTag = (val, index) => {
    const updatedTagsArray = [...tags];
    updatedTagsArray[index] = val;
    setTags(updatedTagsArray);
  };

  const onAddTag = () => {
    setTags([...tags, ""]);
  };

  const onDeleteTag = (index) => {
    const updatedTagsArray = [...tags];
    updatedTagsArray.splice(index, 1);
    setTags(updatedTagsArray);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    Add({ title: title, tags: tags })

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
            label="title"
            type="text"
            placeholder='add a title'
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
                  <DeleteIcon color="error" onClick={() => onDeleteTag(index)} style={{ cursor: "pointer" }} />
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
export default AddTodoDialog;
