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

const getByCategoryAndDate = asyncWrapper(async (req, res, next) => {
    const category = req.params.category;
    const { week, month, year } = req.query;
    
    // Build the date filter
    let dateFilter = {};

    // Filter by week (use the ISO standard week calculation)
    if (week && year) {
        const startOfWeek = new Date(year, 0, (week - 1) * 7 + 1);
        const endOfWeek = new Date(year, 0, week * 7);
        dateFilter = { date: { $gte: startOfWeek, $lte: endOfWeek } };
    }
    // Filter by month
    else if (month && year) {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0); // Last day of the month
        dateFilter = { date: { $gte: startOfMonth, $lte: endOfMonth } };
    }
    // Filter by year
    else if (year) {
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);
        dateFilter = { date: { $gte: startOfYear, $lte: endOfYear } };
    }

    // Find expenses by category and date
    const foundExpenses = await expenseModel.find({
        category: { $regex: `.*${category}.*`, $options: 'i' },
        ...dateFilter
    });

    if (!foundExpenses || foundExpenses.length === 0) {
        return next(new NotFoundError('No expenses found for this category and date range'));
    }

    res.status(200).json(foundExpenses);
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
    getByCategoryAndDate,
    deleteExpense
}

export default expenseControllers;