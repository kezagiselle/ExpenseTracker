import budgetControllers from "../controllers/budget.js";
// import allValidations from "../utilis/validation.js";
import express from "express";
const budgetRouter = express.Router();

budgetRouter.post('/add', budgetControllers.createBudget);
budgetRouter.get('/getAll', budgetControllers.getAllBudgets);
budgetRouter.get('/getById/:id', budgetControllers.getById);
budgetRouter.put('/update/:id', budgetControllers.updateBudget);
budgetRouter.delete('/delete/:id', budgetControllers.deleteBudget);

export default budgetRouter;