import { Request, Response } from 'express';
import gameModel from '../../models/game.model';

const createGame = async (req: Request, res: Response): Promise<void> => {
  const { name, controller, startState, description, icon } = req.body;
  if (
    typeof name != 'string' ||
    typeof controller != 'string' ||
    typeof startState != 'string' ||
    typeof description != 'string' ||
    typeof icon != 'string'
  ) {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const game = new gameModel({
    name: name,
    controller: controller,
    startState: startState,
    description: description,
    icon: icon,
  });
  await game.save();

  res.status(200).json({ game: game });
};

export default createGame;