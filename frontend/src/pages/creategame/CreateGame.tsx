import React, { useState } from "react";
import axios from "axios";

import { Button, TextField } from "@mui/material";
import Pagetitle from "../../components/pagetitle/Pagetitle";
import "./CreateGame.css";

const CreateGame = () => {
 
  return (
    <div>
        <form>
            <Pagetitle title={"Create a Game"} desc={""} />
            <TextField></TextField>
            <TextField></TextField>
            <TextField></TextField>
            <TextField></TextField>
            <TextField></TextField>
            <Button variant="contained">Submit</Button>
        </form>
    </div>
  );
};

export default CreateGame;
