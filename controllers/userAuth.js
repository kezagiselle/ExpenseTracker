import userModel from "../models/userAuth.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequest.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../utils/asyncWrapper.js";
import sendEmail from "../utilis/sendEmail.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import otpGenerator from "../utilis/otp.js";

const signUp = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    };
    const foundUser = await userModel.findOne({email: req.body.email});
    if(foundUser){
        return next(new BadRequestError("Email already in use"));
    };
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime() + (60 * 1000 * 5)

    const newUser = await userModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        otp,
        otpExpires: otpExpirationDate,
    });
    const savedUser = await newUser.save();
    sendEmail(req.body.email, "verify your account", `Your otp is ${otp}`);
    if(savedUser){
        return res.status(201).json({
            message: 'user account created!',
            user: savedUser
        });
    }
});

const validateOtp = asyncWrapper(async (req, res) => {
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    //checking 
})