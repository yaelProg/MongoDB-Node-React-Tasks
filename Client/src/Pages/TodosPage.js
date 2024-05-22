import React from "react";
import { Grid, Typography } from "@mui/material";
import TodoDesigner from "../designers/TodoDesigner";
import AddButton from "../designers/AddButton";
import { useGetTodosQuery } from "../todos/todosApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddTodoDialog from "../designers/Dialogs/AddTodoDialog";


const TodosPage = () => {
  const { CheckToken } = PrivateRoute();
  CheckToken();
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="sPage">
      <NavBar_Caller />
      <br />
      <AddButton setOpenDialog={setOpenDialog} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {todos && todos.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px' }}>
          <br />
          {todos.map((todo) => (
            <Grid item key={todo._id} xs={12} sm={6} md={4} lg={3}>
              <TodoDesigner todo={todo} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No todos in DB</Typography>
      )}
      <AddTodoDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default TodosPage;
