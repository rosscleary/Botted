import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useToken from "../../useToken";
import "./Navbar.css";
import { Button } from "@mui/material";

const Navbar = () => {
  const { setToken, getToken } = useToken();

  const [username, setUsername] = useState("");

  useEffect(() => {
    const setUsernameInitial = async (): Promise<string> => {
      if (!getToken()) {
        return "";
      }
      await axios
        .post("http://localhost:3001/api/user/getUserById", {
          id: getToken(),
        })
        .then(function (response) {
          setUsername(response.data.user.username);
        })
        .catch(function () {
          return "Failed get user";
        });
      return "";
    };

    setUsernameInitial();
  });

  const logout = () => {
    setToken("");
  };

  return (
    <div className="navbar">
        <Link to="/">
          <img className="icon" src="https://icones.pro/wp-content/uploads/2022/10/icone-robot-rouge.png"></img>
          <span className="logo">Botted</span>
        </Link>
      <div className="buttons">
        {!getToken() && (
          <Button id="login" href="/login">
            Login{" "}
          </Button>
        )}
        {!getToken() && (
          <Button id="register" href="/register" variant="contained">
            Register
          </Button>
        )}
        {getToken() && <span className="username"> {username} </span>}
        {getToken() && (
          <Button id="logoutButton" variant="contained" onClick={logout} href="/">
            {" "}
            Logout{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
