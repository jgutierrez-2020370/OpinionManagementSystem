import { existEmail, existUser } from "./db.validator.js";
import { validateError } from "./validate.error.js";
import { body } from "express-validator";

export const registerValidator = [
    body('name', 'Name is required ').notEmpty(),
    body('userDescription', 'Description is required').notEmpty(),
    body('userName', 'Username is required').notEmpty().custom(existUser),
    body('email', 'Email is required').notEmpty().isEmail().custom(existEmail),
    body('password', 'Password is required').notEmpty().isStrongPassword().isLength({min: 8}),
    validateError
]

export const loginValidator = [
    body('email', 'Email is required').optional(),
    body('userName', 'User name is required').optional(),
    body('password', 'Password is required').notEmpty().isStrongPassword().isLength({min: 8}),
    validateError
]

export const updateProfileValidator = [
    body('name', 'The name cannot exceed 50 characters').optional().isLength({max: 50}),
    body('userDescription', 'The description cannot exceed 75 characters').optional().isLength({max: 75}),
    body('userName', 'User name most be different').optional().custom(existUser),
    body('email', 'Email cannot be empty or is not a valid email').optional().isEmail().custom(existEmail),
    validateError
]