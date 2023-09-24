import axios from "axios";
import { useState, useEffect } from "react";
import { Bot } from "../../../../backend/src/models/bot.model";
import "./Leaderboard.css";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

interface leaderboardProps {
  gameId: string;
}

const Leaderboard = (leaderboardProps: leaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const setLeaderboardCall = async () => {
      console.log(leaderboardProps.gameId);
      await axios
        .post("http://localhost:3001/api/game/getGameBots", {
          gameId: leaderboardProps.gameId,
        })
        .then(function (response) {
          console.log(response);
          setLeaderboard(
            response.data.bots.sort(
              (bot1: Bot, bot2: Bot) => bot2.rank - bot1.rank
            )
          );
        })
        .catch(function () {
          return "Failed get leaderboard";
        });
    };

    setLeaderboardCall();
  }, []);

  return (
    <div>
      <TableContainer sx={{ width: 700, maxHeight: 600}}>
        <Table stickyHeader sx={{ width: "100%", mt: 1 }}>
          <TableHead>
            <TableRow className="head">
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                User
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Win +/-
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((entry: Bot, index) => (
              <TableRow>
                <TableCell> {index + 1} </TableCell>
                <TableCell> {String(entry.user)} </TableCell>
                <TableCell> {entry.winPercentage} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;
