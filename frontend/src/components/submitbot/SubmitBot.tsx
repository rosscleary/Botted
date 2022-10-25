import React, { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../../useToken";
import { Version } from "../../../../backend/src/models/version.model";
import "./SubmitBot.css";
import { Button } from "@mui/material"

interface leaderboardProps {
  name: string;
}

const SubmitBot = ({ name }: leaderboardProps) => {
  const [code, setCode] = useState("");
  const [botName, setBotName] = useState("");
  const [botCode, setBotCode] = useState<Version[]>();
  const { getToken } = useToken();

  useEffect(() => {
    const setBotCodeValue = async () => {
      await axios
        .post("http://localhost:3001/api/game/getGameBotVersionsByUserId", {
          gameName: name,
          userId: getToken(),
        })
        .then(function (response) {
          setBotCode(response.data.versions);
        })
        .catch(function () {
          return "Failed get leaderboard";
        });
    };

    setBotCodeValue();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitted");
    e.preventDefault();

    let botId = "";
    if (!botCode) {
      await axios
        .post("http://localhost:3001/api/game/createGameBot", {
          botName: botName,
          userId: getToken(),
          gameName: name,
        })
        .then(function (response) {
          botId = response.data.bot._id;
        })
        .catch(function () {
          return "Failed new bot";
        });
    } else {
      await axios
        .post("http://localhost:3001/api/game/getGameBotByUserId", {
          gameName: name,
          userId: getToken(),
        })
        .then(function (response) {
          botId = response.data.bot._id;
        })
        .catch(function () {
          return "Failed to find bot";
        });
    }

    console.log("Id is " + botId);
    await axios
      .post("http://localhost:3001/api/game/updateGameBot/tictactoe", {
        botId: botId,
        language: "c++",
        sourceCode: code,
      })
      .catch(function () {
        return "Failed to update bot";
      });
  };

  return (
    <form id="submitForm" onSubmit={handleSubmit}>
      <div id="textArea">
        <textarea
          id="textField"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={botCode ? botCode[0].sourceCode : "Type code here..."}
        ></textarea>
        {!botCode && (
          <textarea
            id="textField"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="This is you first submission, give your bot a name."
          ></textarea>
        )}
      </div>
      <Button id="submitButton" variant="contained">
        {botCode ? "Update Bot" : "Submit Bot"}
      </Button>
    </form>
  );
};

export default SubmitBot;
