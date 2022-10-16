import SubmitBot from "../submitbot/SubmitBot";
import Leaderboard from "../leaderboard/Leaderboard";
import useToken from "../../useToken";

interface gameProps {
  name: string;
  description: string;
}

const Game = ({ name, description }: gameProps) => {
  const { getToken } = useToken();

  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      {getToken() && <SubmitBot name="tictactoe" />}
      <Leaderboard name="tictactoe" />
    </div>
  );
};

export default Game;
