import { Router } from 'express';
import tictactoeRoute from './updateGameBots/tictactoe';

const router = Router();

router.post('/tictactoe', tictactoeRoute);

export default router;
