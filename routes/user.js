import userControllers from "../controllers/userAuth.js";
import allValidations from "../utilis/validation.js";
import express from "express";
const userRouter = express.Router();

userRouter.post('/signup', userControllers.signUp, allValidations.signUpValidation);
userRouter.post('/login', userControllers.signIn, allValidations.signInValidation);
userRouter.post('/verify', userControllers.validateOtp, allValidations.otpValidation);
userRouter.post('/forgotPassword', userControllers.forgotPassword, allValidations.forgotPasswordValidation);
userRouter.post('/resetPassword', userControllers.resetPassword, allValidations.resetPasswordValidation);
userRouter.delete('/delete/:id', userControllers.deleteUser);

export default userRouter;

