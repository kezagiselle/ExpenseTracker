import {body} from 'express-validator';

const signUpValidation = [
    body("firstName", "First name is required").not().isEmpty(),
    body("lastName", "Last name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
];

const signInValidation = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
    body("password", "password is required").not().isEmpty(),
];

const otpValidation = [
    body("otp", "otp must be provided").not().isEmpty()
];

const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty()
];

const resetPasswordValidation = [
    body("password", "password must be provided").not().isEmpty(),
    body("password", "password should contain atleast 8 characters, uppercase and lower case letters, numbers and symbols").isStrongPassword(),

];

// const addBudgetValidation = [
//     body('userId').notEmpty().withMessage('User ID is required'),
//     body('category').notEmpty().withMessage('Category is required'),
//     body('amount').isNumeric().withMessage('Amount should be a number'),
//     body('startDate').isISO8601().withMessage('Start date should be a valid date'),
//     body('endDate').isISO8601().withMessage('End date should be a valid date')
// ]

const allValidations = {
    signUpValidation,
    signInValidation,
    otpValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    // addBudgetValidation,
 };

export default allValidations;