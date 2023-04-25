import axios from "axios";
import { useState, useEffect } from "react";
import { Bot } from "../../../../backend/src/models/bot.model";
import "./Leaderboard.css";

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
      <h1 id="title">Leaderboard</h1>
      <table>
        <tr>
          <th>Rank</th>
          <th>Bot</th>
          <th>Win Percentage</th>
        </tr>
        {leaderboard.map((entry: Bot) => (
          <tr>
            <td> {entry.rank} </td>
            <td> {entry.name} </td>
            <td> {entry.winPercentage} </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Leaderboard;
