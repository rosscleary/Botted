import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { createTheme, ThemeProvider } from "@mui/material"

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreateGame from "./pages/creategame/CreateGame";
import GamePage from "./components/gamepage/GamePage";

import useToken from "./useToken";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E6002B",
    },
  }
});

const App = () => {
  const { setToken } = useToken();
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gamesList = await axios
        .post("http://localhost:3001/api/game/getGames", {})
        .then(function (response) {
          setGamesList(response.data.games);
        })
        .catch(function () {
          return "Failed get games";
        });
    };

    getGames();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/creategame" element={<CreateGame />} />
          <Route path="/forgotpassword" element={<h1>You forgot your password</h1>} />
          {gamesList.map((game: any) => (
          <Route path={"/" + game.name.split(' ').join('-')} element={<GamePage game={game} />} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
