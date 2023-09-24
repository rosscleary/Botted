import { Request, Response } from 'express';
import botModel from '../../models/bot.model';

const getGameBots = async (req: Request, res: Response): Promise<void> => {
  const { gameId } = req.body;
  if (typeof gameId != 'string') {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const bots = await botModel.find({ bot: gameId });

  res.status(200).json({ bots: bots });
};

export default getGameBots;
