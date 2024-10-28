import express from 'express';
const Router = express.Router();
import userRouter from './user.js';

Router.use('/users', userRouter);

export default Router;