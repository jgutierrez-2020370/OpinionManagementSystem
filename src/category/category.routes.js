import { Router } from "express";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { createCategory, deleteCategory, updateCategory } from "./category.controller.js";
import { categoryValidator, deleteValidator, updateCategoryValidate } from "../../middlewares/validators.js";

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        isAdmin,
        categoryValidator
    ],
    createCategory
)

api.delete(
    '/',
    [
        validateJwt,
        isAdmin,
        deleteValidator
    ],
    deleteCategory
)

api.put(
    '/:id',
    [
        validateJwt,
        isAdmin,
        updateCategoryValidate
    ],
    updateCategory
)


export default api