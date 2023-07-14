import { Request, Response } from 'express';
import gameModel from '../../models/game.model';

const getGames = async (req: Request, res: Response): Promise<void> => {

  const games = await gameModel.find({});

  res.status(200).json({ games: games });
};

export default getGames;
