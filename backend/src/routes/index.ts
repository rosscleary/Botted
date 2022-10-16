import { Router } from 'express';
import userRoutes from './user';
import gameRoutes from './game';

const router = Router();

router.use('/user', userRoutes);
router.use('/game', gameRoutes);

export default router;
