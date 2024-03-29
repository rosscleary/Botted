import React, { useEffect, useState } from "react";
import axios from "axios";
import useToken from "../../useToken";
import { Version } from "../../../../backend/src/models/version.model";
import "./SubmitBot.css";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface SubmitBotProps {
  gameId: string;
}

const SubmitBot = (submitBotProps: SubmitBotProps) => {
  const [code, setCode] = useState("");
  const [botCode, setBotCode] = useState<Version[]>();
  const { getToken } = useToken();

  useEffect(() => {
    const setBotCodeValue = async () => {
      await axios
        .post("http://localhost:3001/api/game/getGameBotVersionsByUserId", {
          gameId: submitBotProps.gameId,
          userId: getToken(),
        })
        .then(function (response) {
          setBotCode(response.data.versions);
          setCode(response.data.versions[0].sourceCode);
        })
        .catch(function () {
          return "Failed get previous submission";
        });
    };

    setBotCodeValue();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/game/updateGameBot", {
        userId: getToken(),
        gameId: submitBotProps.gameId,
        botCode: code,
      })
      .catch(function () {
        return "Failed to update bot";
      });
  };

  const [language, setLanguage] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <form id="submitForm" onSubmit={handleSubmit}>
      <FormControl size="small" sx={{ minWidth: 100 }} id="languageSelect">
        <InputLabel>Language</InputLabel>
        <Select
          labelId="languageLabel"
          label="Language"
          value={language}
          onChange={handleChange}
        >
          <MenuItem value={"1"}>C++</MenuItem>
          <MenuItem disabled value={"2"}>
            Python
          </MenuItem>
          <MenuItem disabled value={"3"}>
            Java
          </MenuItem>
        </Select>
      </FormControl>
      <div id="textArea">
        {/* <textarea id="lineCounter"></textarea> */}
        <textarea
          id="textField"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type code here..."
        />
      </div>
      <Button id="submitButton" variant="contained" type="submit">
        {botCode ? "Update Bot" : "Submit Bot"}
      </Button>
    </form>
  );
};

export default SubmitBot;
