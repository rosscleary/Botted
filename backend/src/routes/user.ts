import { Router } from 'express';
import getBotsRoute from './user/getBots';
import newUserRoute from './user/newUser';
import loginRoute from './user/login';
import getUserByIdRoute from './user/getUserById';

const router = Router();

router.get('/getBots', getBotsRoute);
router.post('/newUser', newUserRoute);
router.post('/login', loginRoute);
router.post('/getUserById', getUserByIdRoute);

export default router;
