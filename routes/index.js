import express from 'express';
const Router = express.Router();
import userRouter from './user.js';
import tokenRouter from './token.js';
import expenseRouter from './expenses.js';
import budgetRouter from './budget.js';

Router.use('/users', userRouter);
Router.use('/tokens', tokenRouter);
Router.use('/expenses', expenseRouter);
Router.use('/budgets', budgetRouter);

export default Router;