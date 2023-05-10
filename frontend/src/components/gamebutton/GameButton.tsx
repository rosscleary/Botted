import { Button } from "@mui/material";
import "./GameButton.css";

interface gameButtonProps {
  name: string;
  image: string;
  link: string;
}

const GameButton = ({ name, image, link }: gameButtonProps) => {
  return (
    <Button
      className="gameButton"
      variant="contained"
      size="large"
      href={link}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "black",
        "&:hover": { background: "#E6002B" },
      }}
    >
      <img className="gameImage" src={image} width="100%" alt={name} />
      <label>{name}</label>
    </Button>
  );
};

export default GameButton;
