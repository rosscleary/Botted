import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Paper, Button, TextField } from "@mui/material";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/user/newUser", {
      username: username,
      email: email,
      password: password,
    });
    navigation("/");
  };

  return (
    <div id="register-wrapper">
      <Paper id="register-paper" elevation={5}>
        <h1>Register</h1>
        <form id="login-form"onSubmit={handleSubmit}>
          <TextField
            className="register-inputs"
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="register-inputs"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className="register-inputs"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button id="register-button" variant="contained" type="submit">Register</Button>
        </form>
        <Button id="have-account-button" href="/login">Have an account?</Button>
      </Paper>
    </div>
  );
};

export default Register;
