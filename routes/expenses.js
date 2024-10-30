import express from 'express';
const expenseRouter = express.Router();
import expenseControllers from '../controllers/expense.js';

expenseRouter.post('/add', expenseControllers.addExpense);
expenseRouter.get('/getAll', expenseControllers.getAllExpenses);
expenseRouter.get('/getById/:id', expenseControllers.getById);
expenseRouter.get('/getByCategory/:category', expenseControllers.getByCategory);
expenseRouter.put('/update/:id', expenseControllers.updateExpense);
expenseRouter.delete('/delete/:id', expenseControllers.deleteExpense);

export default expenseRouter;

