import React from "react";
import { Grid, Typography } from "@mui/material";
import TodoDesigner from "../designers/TodoDesigner";
import AddButton from "../designers/AddButton";
import { useGetTodosQuery } from "../todos/todosApiSlice";
import PrivateRoute from "../auth/PrivateRoute";
import NavBar_Caller from "../designers/NavBar_Caller";
import AddTodoDialog from "../designers/Dialogs/AddTodoDialog";

/**
 * Component for rendering the page displaying todos.
 * This component fetches todos from the server and displays them in a grid layout.
 * Users can add new todos via the AddTodoDialog component.
 */
const TodosPage = () => {
  // Check authentication token when component mounts
  const { CheckToken } = PrivateRoute();
  CheckToken();

  // Fetch todos from the server
  const { data: todos, isError, isLoading, error } = useGetTodosQuery();

  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <div className="sPage">
      {/* Render the navigation bar */}
      <NavBar_Caller />
      <br />
      {/* Button to open the add todo dialog */}
      <AddButton setOpenDialog={setOpenDialog} />
      {/* Display loading message while fetching todos */}
      {isLoading && <p>Loading...</p>}
      {/* Display error message if there's an error fetching todos */}
      {isError && <p>Error: {error.message}</p>}
      {/* Display todos if available */}
      {todos && todos.length > 0 ? (
        <Grid container spacing={2} style={{ marginLeft: '5px', marginRight: '5px', maxWidth:"98%"}}>
          <br />
          {/* Map through todos and render TodoDesigner component for each */}
          {todos.map((todo) => (
            <Grid item key={todo._id} xs={12} sm={6} md={4} lg={3}>
              <TodoDesigner todo={todo} />
            </Grid>
          ))}
        </Grid>
      ) : (
        // Display message if there are no todos in the database
        <Typography>No todos in DB</Typography>
      )}
      {/* AddTodoDialog component for adding new todos */}
      <AddTodoDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default TodosPage;