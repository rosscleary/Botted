import { Request, Response } from 'express';
import botModel from '../../models/bot.model';

const getGameBots = async (req: Request, res: Response): Promise<void> => {
  const { gameName } = req.body;
  if (typeof gameName != 'string') {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const bots = await botModel.find({ game: gameName });

  res.status(200).json({ bots: bots });
};

export default getGameBots;
