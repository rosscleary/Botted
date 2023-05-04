import Pagetitle from "../components/pagetitle/Pagetitle";
import GameButton from "../components/gamebutton/GameButton";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <div className="home">
      <Pagetitle title="Games" desc="" />
      <Grid container spacing={2} columns={6}>
        <Grid item xs={1}>
          <GameButton
            name="Tic-Tac-Toe"
            image="https://cdn-icons-png.flaticon.com/512/3367/3367478.png"
            link="\tictactoe"
          />
        </Grid>
        <Grid item xs={1}>
          <GameButton
            name="Battleship"
            image="https://cdn-icons-png.flaticon.com/512/3367/3367430.png"
            link="\tictactoe"
          />
        </Grid>
        <Grid item xs={1}>
          <GameButton
            name="Mancala"
            image="https://cdn-icons-png.flaticon.com/512/3367/3367626.png"
            link="\tictactoe"
          />
        </Grid>
        <Grid item xs={1}>
          <GameButton
            name="Four in a Row"
            image="https://cdn-icons-png.flaticon.com/512/3367/3367465.png"
            link="\tictactoe"
          />
        </Grid>
        <Grid item xs={1}>
          <GameButton
            name="Five in a Row"
            image="https://cdn-icons-png.flaticon.com/512/3367/3367671.png"
            link="\tictactoe"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
