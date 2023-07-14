import { Router } from 'express';
import createGame from './game/createGame';
import updateGameBotRoute from './game/updateGameBot';
import getGameBots from './game/getGameBots';
import getGameBotVersionsByUserId from './game/getGameBotVersionsByUserId';
import getGames from './game/getGames';

const router = Router();

router.post('/createGame', createGame);
router.post('/getGameBots', getGameBots);
router.post('/getGameBotVersionsByUserId', getGameBotVersionsByUserId);
router.post('/updateGameBot', updateGameBotRoute);
router.post('/getGames', getGames);

export default router;
