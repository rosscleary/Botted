import { Request, Response } from 'express';
import versionModel from '../../models/version.model';
import botModel from '../../models/bot.model';
import gameModel from '../../models/game.model';
import { Version } from '../../models/version.model';
import axios from 'axios';

const callPiston = async (
  sourceCode: string,
  input: string
): Promise<string> => {
  const result = await axios.post('https://emkc.org/api/v2/piston/execute', {
    language: 'c++',
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

// 1 if player 1 wins, 0 if tie, -1 if player 2 wins
const playGame = async (
  player1Version: Version,
  player2Version: Version,
  controller: string,
  startState: string
): Promise<number> => {
  let currState = startState;
  let oneTurn = true;
  for (let rep = 0; rep < 10; rep++) {
    if (oneTurn) {
      const move = await callPiston(player1Version.sourceCode, currState);
      const controllerInput = currState.concat('\n').concat(move);
      currState = await callPiston(controller, controllerInput);
    } else {
      const move = await callPiston(player2Version.sourceCode, currState);
      const controllerInput = currState.concat('\n').concat(move);
      currState = await callPiston(controller, controllerInput);
    }
    if (currState === "Win") {
      return oneTurn ? 1 : -1;
    }
    if (currState == "Lose") {
      return oneTurn ? -1 : 1;
    }
    oneTurn = !oneTurn;
  }
  return 0;
};

const reRankBots = async (gameId: string): Promise<void> => {
  const game = await gameModel.findOne({ _id: gameId });
  const controller = game?.controller;
  const startState = game?.startState;
  const bots = await botModel.find({ game: gameId });
  for (let i = 0; i < bots.length; i++) {
    let currCount = 0;
    for (let j = 0; j < bots.length; j++) {
      if (i == j) {
        continue;
      }
      const player1Version = await versionModel.findOne({ _id: bots[i].versions.slice(-1) });
      const player2Version = await versionModel.findOne({ _id: bots[j].versions.slice(-1) });
      let result = 0;
      if (player1Version && player2Version && controller && startState != undefined) {
        result = await playGame(player1Version, player2Version, controller, startState);
      }
      if (result == 1) {
        currCount++;
      } else if (result == -1) {
        currCount--;
      }
    }
    bots[i].rank = currCount;
    bots[i].winPercentage = currCount;
    await bots[i].save();
  }
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
      rank: -1000000,
      winPercentage: -1000000,
    });
    await userBot.save();
  }

  const version = new versionModel({
    language: 'c++',
    sourceCode: botCode,
    date: new Date(),
  });

  await version.save();
  userBot.versions.push(version._id);
  await userBot.save();

  await reRankBots(gameId);
};

export default updateGameBot;