import axios from "axios";
import { useState, useEffect } from "react";
import { Bot } from "../../../../backend/src/models/bot.model";
import "./Submissions.css";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

interface submissionProps {
  name: string;
}

const Submissions = ({ name }: submissionProps) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const setSubmissionsCall = async () => {
      await axios
        .post("http://localhost:3001/api/game/getGameBots", {
          gameName: name,
        })
        .then(function (response) {
          setSubmissions(
            response.data.bots.sort(
              (bot1: Bot, bot2: Bot) => bot1.rank - bot2.rank
            )
          );
        })
        .catch(function () {
          return "Failed get submissions";
        });
    };

    setSubmissionsCall();
  }, []);

  return (
    <div>
      <TableContainer sx={{ width: 700, maxHeight: 600 }}>
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
                Win Percentage
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Date
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Language
              </TableCell>
              <TableCell
                className="cell"
                sx={{
                  background: "#E6002B",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((entry: Bot) => (
              <TableRow>
                <TableCell> {entry.rank} </TableCell>
                <TableCell> {entry.winPercentage} </TableCell>
                <TableCell> View </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Submissions;
