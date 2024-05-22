import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
// AddButton component represents a floating action button (FAB) for adding items.
const AddButton = ({ setOpenDialog }) => {

  return (
    <>
          {/* Floating action button for adding items */}
      <Fab
        color="secondary"
        aria-label={`Add`}
        onClick={() => {
          setOpenDialog(true);
        }}
        style={{
          position: "fixed",
          bottom: "20px",
        }}      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default AddButton;
