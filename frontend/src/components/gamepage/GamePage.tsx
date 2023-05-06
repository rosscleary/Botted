import React, { useState } from "react";
import SubmitBot from "../submitbot/SubmitBot";
import Leaderboard from "../leaderboard/Leaderboard";
import Submissions from "../submissions/Submissions";
import useToken from "../../useToken";
import Pagetitle from "../pagetitle/Pagetitle";
import "./GamePage.css";
import { Tabs, Tab } from "@mui/material";

interface gameProps {
  name: string;
  description: string;
}

const Game = ({ name, description }: gameProps) => {
  const { getToken } = useToken();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Pagetitle title={name} desc={description} />
      {!getToken() && (
        <h3>
          <a href="\login">Login</a> to submit
        </h3>
      )}
      <div className="tabs">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="tabs"
        >
          <Tab label="Description" />
          <Tab label="Leaderboard" />
          <Tab label="Your Bots" />
        </Tabs>
      </div>
      <div className="gamePage">
        {value === 0 && <h2>{description}</h2>}
        {value === 1 && <Leaderboard name="tictactoe" />}
        {value === 2 && <Submissions name="tictactoe" />}

        {getToken() && <SubmitBot name="tictactoe" />}
      </div>
    </div>
  );
};

export default Game;
