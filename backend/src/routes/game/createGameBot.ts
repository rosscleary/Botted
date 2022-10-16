import { Request, Response } from 'express';
import botModel from '../../models/bot.model';
import userModel from '../../models/user.model';

const createGameBot = async (req: Request, res: Response): Promise<void> => {
  const { botName, userId, gameName } = req.body;
  if (
    typeof botName != 'string' ||
    typeof userId != 'string' ||
    typeof gameName != 'string'
  ) {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const bot = new botModel({
    name: botName,
    versions: [],
    user: userId,
    game: gameName,
    rank: 1,
    winPercentage: 0,
  });
  await bot.save();

  const user = await userModel.findOne({ _id: userId });
  if (user) {
    user.bots.push(bot._id);
    await user.save();
  } else {
    res.status(400).json({ error: 'Could not find user with given id.' });
    return;
  }

  res.status(200).json({ bot: bot });
};

export default createGameBot;
