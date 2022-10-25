import SubmitBot from "../submitbot/SubmitBot";
import Leaderboard from "../leaderboard/Leaderboard";
import useToken from "../../useToken";
import Pagetitle from "../pagetitle/Pagetitle";
import "./GamePage.css";

interface gameProps {
  name: string;
  description: string;
}

const Game = ({ name, description }: gameProps) => {
  const { getToken } = useToken();

  return (
    <div>
      <Pagetitle title={name} desc={description} />
      <div className="gamePage">
        {getToken() && <SubmitBot name="tictactoe" />}
        <Leaderboard name="tictactoe" />
      </div>
    </div>
  );
};

export default Game;
