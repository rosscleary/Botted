import { Request, Response } from 'express';
import userModel from '../../models/user.model';
import botModel from '../../models/bot.model';

const getBots = async (req: Request, res: Response): Promise<void> => {
  const id = req.body.id;
  if (typeof id != 'string') {
    res
      .status(400)
      .json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  const user = await userModel.findOne({ _id: id });
  if (!user) {
    res.status(400).json({ error: 'User with given id does not exist.' });
    return;
  }

  const allBots = await botModel.find({ user: id });

  res.status(200).json({ user: user, bots: allBots });
};

export default getBots;
