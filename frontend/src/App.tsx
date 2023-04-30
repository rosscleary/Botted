import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material"

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TicTacToe from "./pages/TicTacToe";

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

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
