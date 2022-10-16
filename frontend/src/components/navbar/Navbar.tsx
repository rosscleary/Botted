import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useToken from "../../useToken";
import "./Navbar.css";

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
          console.log("Testing " + response.data.user.username);
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
      <div>
        <Link to="/">
          <span className="logo">Botted</span>
        </Link>
      </div>
      <div>
        {!getToken() && <Link to="/login">Login </Link>}
        {!getToken() && <Link to="/register">Register</Link>}
        {getToken() && <p> {username} </p>}
        {getToken() && (
          <button id="logoutButton" onClick={logout}>
            {" "}
            Logout{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
