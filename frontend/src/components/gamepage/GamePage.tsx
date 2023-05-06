import React, { useState } from "react";
import SubmitBot from "../submitbot/SubmitBot";
import Leaderboard from "../leaderboard/Leaderboard";
import Submissions from "../submissions/Submissions";
import useToken from "../../useToken";
import Pagetitle from "../pagetitle/Pagetitle";
import "./GamePage.css";
import { Tabs, Tab } from "@mui/material";

interface Game {
  _id: string,
  name: string,
  controller: string,
  startState: string,
  description: string,
  icon: string
}

interface GameProps {
  game: Game
}

const Game = (gameProps: GameProps) => {
  const { getToken } = useToken();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Pagetitle title={gameProps.game.name} desc={gameProps.game.description} />
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
        {value === 0 && <h2>{gameProps.game.description}</h2>}
        {value === 1 && <Leaderboard gameId={gameProps.game._id} />}
        {value === 2 && <h2>{gameProps.game.description}</h2>}

        {getToken() && <SubmitBot gameId={gameProps.game._id} />}
      </div>
    </div>
  );
};

export default Game;
