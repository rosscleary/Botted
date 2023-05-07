import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../useToken";
import "./Navbar.css";
import { Button, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const { setToken, getToken } = useToken();

  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleMenu = (index: number) => {
    setOpen(false);
    if(index == 1){
      navigation("/");
    }
    if(index == 2){
      navigation("/creategame");
    }
  }

  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="icon"
          src="https://icones.pro/wp-content/uploads/2022/10/icone-robot-rouge.png"
        ></img>
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
        {getToken() && (
          <>
            <Button className="username" onClick={handleClick} size="large" sx={{color: "white"}}>
              {username}
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClick}>
              <MenuItem value={1} onClick={() => handleMenu(1)}>Profile</MenuItem>
              <MenuItem value={2} onClick={() => handleMenu(2)}>Create a Game</MenuItem>
              <MenuItem value={3} onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
