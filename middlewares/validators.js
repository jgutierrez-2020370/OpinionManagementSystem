import { existCategory, existEmail, existPublication, existUser } from "./db.validator.js";
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

export const passwordUpdateValidator = [
    body('passwordconfirm', 'Password confirm is required').notEmpty(),
    body('password', 'Password is required').notEmpty(),
    validateError
]

export const categoryValidator = [
    body('name', 'name cannot be empty').notEmpty().custom(existCategory),
    body('description', 'description cannot be empty').notEmpty(),
    validateError
]

export const deleteValidator = [
    body('id', 'Id cannot be empty').notEmpty(),
    validateError
]

export const updateCategoryValidate = [
    body('name').optional(),
    body('description').optional().isLength({max: 100}),
    validateError
]

export const createPublicationValidator = [
    body('title', 'The title is required').notEmpty().custom(existPublication),
    body('description', 'The description is required').notEmpty(),
    body('category').optional(),
    validateError
]

export const updatePublicationValidate = [
    body('title', 'The title is required').optional().isLength({max: 30}),
    body('description', 'The description is required').optional().isLength({max: 400}),
    body('category').optional(),
    body('status').custom(() => { throw new Error('Status cannot be updated') }),
    validateError
]

export const createCommentaryValidator = [
    body('title', 'The title is required').notEmpty(),
    body('description', 'The description is required').notEmpty(),
    validateError
]

export const updateCommentaryValidate = [
    body('title', 'The title is required').optional().isLength({max: 40}),
    body('description', 'The description is required').optional().isLength({max: 400}),
    validateError
]

