import { Request, Response } from 'express';
import versionModel from '../../../models/version.model';
import botModel from '../../../models/bot.model';
import { Version } from '../../../models/version.model';
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

const gameOver = (gameStateString: String): Boolean => {
  // Check rows
  for (let i = 0; i <= 6; i += 3) {
    if (
      gameStateString[i] == gameStateString[i + 1] &&
      gameStateString[i + 1] == gameStateString[i + 2] &&
      gameStateString[i] != 'E'
    ) {
      return true;
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      gameStateString[i] == gameStateString[i + 3] &&
      gameStateString[i + 3] == gameStateString[i + 6] &&
      gameStateString[i] != 'E'
    ) {
      return true;
    }
  }

  return false;
};

const newGameString = (
  currGameString: string,
  move: string,
  player: string
): string => {
  if (move.length != 3 || move[1] != ' ') {
    return 'Loss';
  }
  const row: number = Number(move[0]);
  const column: number = Number(move[2]);

  const index: number = (row - 1) * 3 + column - 1;
  if (currGameString[index] !== 'E') {
    return 'Loss';
  }
  currGameString =
    currGameString.substring(0, index) +
    player +
    currGameString.substring(index + 1);
  return currGameString;
};

const flipGameString = (gameString: string) => {
  let flippedGameString = '';
  for (let i = 0; i < gameString.length; i++) {
    if (gameString[i] === 'E') {
      flippedGameString += 'E';
    } else {
      flippedGameString += gameString[i] === 'X' ? 'O' : 'X';
    }
  }

  return flippedGameString;
};

const playGame = async (
  player1Version: Version,
  player2Version: Version
): Promise<Number> => {
  let gameStateString = 'EEEEEEEEE';
  while (true) {
    const player1Move: string = await callPiston(
      player1Version.sourceCode,
      player1Version.language,
      gameStateString
    );
    gameStateString = newGameString(gameStateString, player1Move, 'X');
    if (gameStateString === 'Loss') {
      return 2;
    }
    if (gameOver(gameStateString)) {
      return 1;
    }
    const player2Move: string = await callPiston(
      player2Version.sourceCode,
      player2Version.language,
      flipGameString(gameStateString)
    );
    gameStateString = newGameString(gameStateString, player2Move, 'O');
    if (gameStateString === 'Loss') {
      return 1;
    }
    if (gameOver(gameStateString)) {
      return 2;
    }
  }
};

interface winCount {
  count: number;
  index: number;
}

const tictactoe = async (req: Request, res: Response): Promise<void> => {
  const { botId, language, sourceCode } = req.body;

  const newVersion = await versionModel.create({
    language: language,
    sourceCode: sourceCode,
    date: Date.now(),
  });

  const bot = await botModel.findOne({ _id: botId });
  if (!bot) {
    res.status(400).json({ error: 'Bot with given id does not exist.' });
    return;
  }

  bot.versions.push(newVersion._id);
  await bot.save();

  const gameBots = (await botModel.find({ game: 'tictactoe' })).map(
    (result) => {
      return result;
    }
  );
  let winCounts: winCount[] = [];
  for (let i = 0; i < gameBots.length; i++) {
    winCounts.push({ count: 0, index: i });
  }

  for (let i = 0; i < gameBots.length - 1; i++) {
    for (let j = i + 1; j < gameBots.length; j++) {
      const bot1 = gameBots[i];
      const bot2 = gameBots[j];
      const bot1Version = (await versionModel.findOne({
        _id: bot1.versions[bot1.versions.length - 1],
      })) as Version;
      const bot2Version = (await versionModel.findOne({
        _id: bot2.versions[bot2.versions.length - 1],
      })) as Version;
      const gameResult = await playGame(bot1Version, bot2Version);
      if (gameResult === 1) {
        winCounts[i].count++;
      } else {
        winCounts[j].count++;
      }
    }
  }

  winCounts.sort((a: winCount, b: winCount) => {
    return a.count - b.count;
  });

  let rank: number = 1;
  for (let i = winCounts.length - 1; i >= 0; i--) {
    gameBots[winCounts[i].index].rank = rank;
    gameBots[winCounts[i].index].winPercentage =
      winCounts[i].count / (gameBots.length - 1);
    await gameBots[winCounts[i].index].save();
    if (i != 0 && winCounts[i - 1].count < winCounts[i].count) {
      rank++;
    }
  }

  res.status(200).json({ message: 'Successfully updated bot version' });
};

export default tictactoe;