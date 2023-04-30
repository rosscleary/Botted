import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Paper, Button, TextField } from "@mui/material";
import "./Login.css";

interface loginProps {
  setToken: (userToken: string) => void;
}

const loginUser = async (
  username: string,
  password: string,
  setWrong: (error: string) => void
): Promise<string> => {
  let token: string = "";
  await axios
    .post("http://localhost:3001/api/user/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      token = response.data.token;
    })
    .catch((error) => {
      setWrong(error.response.data.message);
    });
  return token;
};

const Login = ({ setToken }: loginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string = await loginUser(username, password, setWrong);
    setToken(token);
    console.log(token);
    if(token){
      navigation("/");
    }
  };

  return (
    <div id="login-wrapper">
      <Paper id="login-paper" elevation={5}>
        <h1>Login</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <TextField
            className="login-inputs"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="login-inputs"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {wrong && (
            <small id="wrong-credentials">
              {wrong}
            </small>
          )}
          <Button id="login-button" variant="contained" type="submit">
            Login
          </Button>
        </form>
        <Button id="login-register-button" href="/register">
          Register
        </Button>
        <Button id="forgot-password">Forgot Password?</Button>
      </Paper>
    </div>
  );
};

export default Login;
