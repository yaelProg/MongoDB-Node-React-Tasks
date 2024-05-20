import React from "react";
import { Box, Card, CardContent, Fab, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoDialog from "./Dialogs/TodoDialog";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useUpdateTodoCompleteMutation, useDeleteTodoMutation } from "../todos/todosApiSlice";

const TodoDesigner = ({ todo }) => {
  const [isChecked, setIsChecked] = React.useState(todo.completed);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [UpdateCompleted] = useUpdateTodoCompleteMutation();
  const [Delete] = useDeleteTodoMutation();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const todoTags = todo.tags
  const [newTags, setNewTags] = React.useState(todoTags ? todoTags : []);

  const onChangeValue = (index, key, val) => {
    const updatedTagsArray = [...todoTags];
    updatedTagsArray[index] = { ...updatedTagsArray[index], [key]: val };
    setNewTags(updatedTagsArray);
  };

  const onAddTag = () => {
    let i = 0;
    setNewTags([...todoTags, { "tag": ""}]);
  };

  const onDeleteTag = (index) => {
    const updatedTagsArray = [...todoTags];
    updatedTagsArray.splice(index, 1);
    setNewTags(updatedTagsArray);
  }

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(todo._id);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };


  const handleCheckChange = () => {
    setIsChecked(!isChecked);
    UpdateCompleted({id :todo._id});
  };

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <Checkbox checked={isChecked} onChange={handleCheckChange} />
          <h2>{todo.title}</h2>
          {/* <Box display="flex" justifyContent="center"> */}
            {/* <Box> */}
              {/* <Fab color="secondary" aria-label="edit" size="small" onClick={() => setOpenDialog(true)}>
                <EditIcon />
              </Fab>
              <Fab color="error" aria-label="delete" size="small" onClick={handleDeleteClick} sx={{ marginLeft: 1 }}>
                <DeleteIcon />
              </Fab> */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px"}}>
          <EditIcon
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          <DeleteIcon
            color="error"
            onClick={handleDeleteClick}
            style={{ cursor: "pointer" }}
          />
          </div>
              <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete {todo.title}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteCancel} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteConfirm} color="secondary">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            {/* </Box> */}
          {/* </Box> */}
        </CardContent>
      </Card>
      {openDialog && <TodoDialog todo={todo} />}
    </Box>
  );
};

export default TodoDesigner;
