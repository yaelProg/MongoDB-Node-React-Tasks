import React from "react";
import { Box, Card, CardContent, Fab, Checkbox, IconButton } from "@mui/material";
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

// TodoDesigner component displays a todo item with options to mark as complete, edit, and delete.
const TodoDesigner = ({ todo }) => {
  const [UpdateCompleted] = useUpdateTodoCompleteMutation();
  const [Delete] = useDeleteTodoMutation();

  const [isChecked, setIsChecked] = React.useState(todo.completed);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const todoTags = todo.tags
  const [newTags, setNewTags] = React.useState(todoTags ? todoTags : []);

  // Handles the click event for deleting the todo item.
  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  // Confirms the deletion of the todo item.
  const handleDeleteConfirm = () => {
    setConfirmDelete(false);
    Delete(todo._id);
  };

  // Cancels the deletion action.
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  // Handles the change event for toggling the completion status of the todo item.
  const handleCheckChange = () => {
    setIsChecked(!isChecked);
    UpdateCompleted({ id: todo._id });
  };

  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <Checkbox checked={isChecked} onChange={handleCheckChange} />
          <h2>{todo.title}</h2>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
            <IconButton onClick={(e) => {
              e.stopPropagation();
              setOpenDialog(true);
            }}>
              <EditIcon
                color="primary"
              />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon
                color="error"
              />
            </IconButton>
          </div>
          {/* Confirmation dialog for delete action */}
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
        </CardContent>
      </Card>
      {/* Dialog for editing todo */}
      <TodoDialog todo={todo} open={openDialog} setOpen={setOpenDialog} />
    </Box>
  );
};

export default TodoDesigner;