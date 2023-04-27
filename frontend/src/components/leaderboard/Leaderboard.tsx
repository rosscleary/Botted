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
  name: string;
}

const Leaderboard = ({ name }: leaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const setLeaderboardCall = async () => {
      await axios
        .post("http://localhost:3001/api/game/getGameBots", {
          gameName: name,
        })
        .then(function (response) {
          setLeaderboard(
            response.data.bots.sort(
              (bot1: Bot, bot2: Bot) => bot1.rank - bot2.rank
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
      <TableContainer sx={{ width: 700, maxHeight: 600, overlowX: "hidden" }}>
        <Table stickyHeader sx={{ width: "100%", mt: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell
                className="cell"
                sx={{
                  background: "#d63230",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#d63230",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Bot
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#d63230",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Win Percentage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard.map((entry: Bot) => (
              <TableRow>
                <TableCell> {entry.rank} </TableCell>
                <TableCell> {entry.name} </TableCell>
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
