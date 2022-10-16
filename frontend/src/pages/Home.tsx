import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/tictactoe">Tic-Tac-Toe</Link>
    </>
  );
};

export default Home;
