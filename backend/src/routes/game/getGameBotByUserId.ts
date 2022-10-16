import { Request, Response } from 'express';
import botModel from '../../models/bot.model';

const getGameBotByUserId = async (req: Request, res: Response): Promise<void> => {
  const { gameName, userId } = req.body;
  if (typeof gameName != 'string' || typeof userId != 'string') {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const bot = await botModel.findOne({ game: gameName, user: userId });

  res.status(200).json({ bot: bot });
};

export default getGameBotByUserId;
