import BadRequestError from "../Errors/BadRequest.js";
import NotFoundError from "../Errors/NotFoundError.js";
import { validationResult } from "express-validator";
import expenseModel from "../models/expense.js";
import asyncWrapper from "../middleware/async.js";

const addExpense = asyncWrapper(async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const newExpense = await expenseModel.create(req.body);
    return res.status(201).json(newExpense);
});

const getAllExpenses = asyncWrapper(async(req, res, next) =>{
    const expenses = await expenseModel.find({})
    if(expenses){
        return res.status(201).json({
            nbHits: expenses.length,
            expenses
        })
    }
});

const getById = asyncWrapper(async(req, res, next) =>{
    const id = req.params.id;
    const foundExpense = await expenseModel.findById(id);
    if(!foundExpense){
        return next(new NotFoundError('Expense not found'));
    }
    res.status(201).json(foundExpense);
});

const getByCategory = asyncWrapper(async(req, res, next) =>{
    const category = req.params.category;
    const foundExpense = await expenseModel.find({category: {$regex: `.*${category}.*`, $options: 'i'}})
    if(!foundExpense){
        return next(new NotFoundError('Category not found'));
    }
    res.status(201).json(foundExpense);
});

const updateExpense = asyncWrapper(async(req, res, next) =>{
    const id = req.params.id;
    const updates = req.body;
    const updateExpense = await expenseModel.findByIdAndUpdate(id, updates, {new: true});
    if(!updateExpense){
        return next(new NotFoundError('Expense not found'));
    }
    res.status(201).json(updateExpense);
});

const deleteExpense = asyncWrapper(async(req, res, next) =>{
    const id = req.params.id;
    const deletedExpense = await expenseModel.findByIdAndDelete(id)
    if(!deletedExpense){
        return next(new NotFoundError('Expense not found'));
    }
    res.status(201).json({message: 'Deleted successfully.'});
});

//missing doing the filter by category and puting total maount.
const expenseControllers = {
    addExpense,
    getAllExpenses,
    getById,
    getByCategory,
    updateExpense,
    deleteExpense
}

export default expenseControllers;