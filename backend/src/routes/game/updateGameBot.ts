import { Request, Response } from 'express';
import versionModel from '../../models/version.model';
import botModel from '../../models/bot.model';
import { Version } from '../../models/version.model';
import axios from 'axios';

const callPiston = async (
  sourceCode: string,
  language: string,
  input: string
): Promise<string> => {
  const result = await axios.post('https://emkc.org/api/v2/piston/execute', {
    language: language,
    version: '10.2.0',
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input,
  });

  return result.data.run.stdout;
};

const playGame = async (
  player1Version: Version,
  player2Version: Version,
  controller: string,
  startstate: string
): Promise<Number> => {
 return 0;
};

const reRankBots = async (gameId: string): Promise<void> => {
  // Todo
};

const updateGameBot = async (req: Request, res: Response): Promise<void> => {
  const { userId, gameId, botCode } = req.body;
  if (typeof userId != 'string' || typeof gameId != 'string' || typeof botCode != 'string') {
    res.status(400).json({ error: 'Validation failed, variable types are incorrect.' });
    return;
  }

  let userBot = await botModel.findOne({ user: userId, game: gameId });
  if (!userBot) {
    userBot = new botModel({
      versions: [],
      user: userId,
      game: gameId,
      rank: 0,
      winPercentage: 0,
    });
    await userBot.save();
  }

  const version = new versionModel({
    language: 'c++',
    sourceCode: botCode,
    date: new Date(),
  });

  await version.save();

  reRankBots(gameId);
};

export default updateGameBot;