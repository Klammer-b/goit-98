import { Router } from 'express';
import studentsRouter from './students.js';
import authRouter from './auth.js';

const rootRouter = Router();

rootRouter.use('/students', studentsRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
