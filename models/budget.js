import mongoose from "mongoose";
import { model, Schema} from "mongoose";

const budgetSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    expenseId: {
        type: Schema.Types.ObjectId,
        ref: "expenses",
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["food", "Entertainment", "travel", "Transportation", "clothing", "health","others"]
    },
    amount: {
        type: Number,
        required: true
    },
    currentSpent: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});
const budgetModel = mongoose.model('budgets', budgetSchema);
export default budgetModel;