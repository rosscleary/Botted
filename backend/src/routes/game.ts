import { Router } from 'express';
import createGame from './game/createGame';
import updateGameBotRoute from './game/updateGameBot';
import getGameBots from './game/getGameBots';
import getGameBotVersionsByUserId from './game/getGameBotVersionsByUserId';

const router = Router();

router.post('/createGame', createGame);
router.post('/getGameBots', getGameBots);
router.post('/getGameBotVersionsByUserId', getGameBotVersionsByUserId);
router.post('/updateGameBot', updateGameBotRoute);

export default router;
