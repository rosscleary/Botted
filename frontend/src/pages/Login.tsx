import React, { useState } from "react";
import axios from "axios";

interface loginProps {
  setToken: (userToken: string) => void;
}

const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  let token: string = "";
  await axios
    .post("http://localhost:3001/api/user/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      token = response.data.token;
    });
  return token;
};

const Login = ({ setToken }: loginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string = await loginUser(username, password);
    console.log("Testing " + token);
    setToken(token);
  };

  return (
    <div id="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
