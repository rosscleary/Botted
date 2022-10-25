import { Link } from "react-router-dom";
import Pagetitle from "../components/pagetitle/Pagetitle";

const Home = () => {
  return (
    <div className="home">
      <Pagetitle title="Games" desc=""/>
      <Link to="/tictactoe">Tic-Tac-Toe</Link>
    </div>
  );
};

export default Home;
