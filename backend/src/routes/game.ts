import { Router } from 'express';
import createGameBotRoute from './game/createGameBot';
import updateGameBotRoute from './game/updateGameBots';
import getGameBots from './game/getGameBots';
import getGameBotVersionsByUserId from './game/getGameBotVersionsByUserId';
import getGameBotByUserId from './game/getGameBotByUserId';

const router = Router();

router.post('/createGameBot', createGameBotRoute);
router.post('/getGameBots', getGameBots);
router.post('/getGameBotVersionsByUserId', getGameBotVersionsByUserId);
router.post('/getGameBotByUserId', getGameBotByUserId);
router.use('/updateGameBot', updateGameBotRoute);

export default router;
