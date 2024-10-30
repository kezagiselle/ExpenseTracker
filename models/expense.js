import mongoose from "mongoose";
import { model, Schema} from 'mongoose';

const expenseSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["food", "Entertainment","travel","Transportation", "utilities", "clothing", "health","others"]
    }
});
const expenseModel = mongoose.model('expenses', expenseSchema);
export default expenseModel;