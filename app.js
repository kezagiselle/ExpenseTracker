import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./DB/connectDB.js";
import Router from "./routes/index.js";

const app = express();

const corsOption = {
    origin: ["local link", "deployment link"],
    Credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT","DELETE", "OPTIONS"]
};

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("api/expenseTracker", Router);

//Routes
//Swagger Documentation

const start = async () => {
    try{
        connectDB()
        app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}`));
    } catch (error){
        console.log(error)
    }
}
start();