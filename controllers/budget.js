import budgetModel from "../models/budget.js";
import NotFoundError from "../Errors/NotFoundError.js";
import { validationResult } from "express-validator";
import expenseModel from "../models/expense.js";
import BadRequestError from "../Errors/BadRequest.js";
import asyncWrapper from "../middleware/async.js";

const createBudget = async(req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const { user, expenseId, category, amount, currentSpent, startDate, endDate } = req.body;

    try{
   //check if a budget already exists for this category and time frame
   const existingBudget = await budgetModel.findOne({
    user: user,
    expenseId: expenseId,
    category: category,
    amount: amount,
    currentSpent: currentSpent,
    startDate: { $lte: new Date(endDate) },
    endDate: { $gte: new Date(startDate) },
   });
   if(existingBudget){
    return next(new BadRequestError("A budget already exists for this category and time frame."));
   }

   //find all expenses for the category in the time frame
   const expenses = await expenseModel.find({
    userId: user,
    category: category,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) }
   });
   //calculate total spent on this category within the time frame
   const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

   //create new budget
   const newBudget = new budgetModel({
    user: user,
    expenseId,
    category,
    amount,
    currentSpent: totalSpent,
    startDate,
    endDate,
    isExceeded: totalSpent > amount,
    expenses: expenses.map(expense => expense._id)
});
await newBudget.save();
res.status(201).json({ message: 'Budget set successfully', newBudget });
} catch (error) {
next(error);
}
};


const getAllBudgets = asyncWrapper(async(req, res, next) =>{
    const budgets = await budgetModel.find({});
    if(budgets){
        return res.status(201).json({
            nbHits: budgets.length,
            budgets
        });
    }
});

const getById = asyncWrapper(async(req,res,next) =>{
    const id = req.params.id;
    const foundBudget = await budgetModel.findById(id);
    if(!foundBudget){
        return next(new NotFoundError('Budget not found'));
    }
    res.status(201).json(foundBudget);
});

const updateBudget = asyncWrapper(async(req, res, next) =>{
    const id = req.params.id;
    const updates = req.body;
    const updateBudget = await budgetModel.findByIdAndUpdate(id, updates, {new: true});
    if(!updateBudget){
        return next(new NotFoundError('Budget not found'));
    }
    res.status(201).json(updateBudget);
});

const deleteBudget = asyncWrapper(async(req, res, next) =>{
    const id = req.params.id;
    const deletedBudget = await budgetModel.findByIdAndDelete(id)
    if(!deletedBudget){
        return next(new NotFoundError('Budget not found'));
    }
    res.status(201).json({message: 'Deleted successfully.'});
});

const budgetControllers = {
    createBudget,
    getAllBudgets,
    getById,
    updateBudget,
    deleteBudget
};

export default budgetControllers;