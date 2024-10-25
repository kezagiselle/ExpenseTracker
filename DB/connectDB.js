import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default function connectDB(){
    mongoose.connect(`mongodb://localhost:27017/expenses
`)
.then(() => console.log("connected to MongoDB"))
.catch(err => console.log(err));
}