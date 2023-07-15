import Pagetitle from "../components/pagetitle/Pagetitle";
import GameButton from "../components/gamebutton/GameButton";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import GamePage from "../components/gamepage/GamePage";

const Home = () => {
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => { 
    const getGames = async () => {
      const gamesList = await axios.post("http://localhost:3001/api/game/getGames", {})
        .then(function (response) {
          setGamesList(response.data.games)
        })
        .catch(function () {
          return "Failed get games";
        });
    };

    getGames();

  }, []);

  return (
    <div className="home">
      <Pagetitle title="Games" desc="" />
      <Grid container spacing={2} columns={6}>
        {gamesList.map((game: any) => (
          <Grid item xs={1}>
            <GameButton
              name={game.name}
              image={game.icon}
              link={"/" + game.name.split(' ').join('-')}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
