import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const AddButton = ({ setOpenDialog }) => {

  return (
    <>
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
