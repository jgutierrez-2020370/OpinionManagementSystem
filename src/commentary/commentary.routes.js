import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createCommentary, deleteCommentary, getMyCommentaries, updateCommentary } from "./commentary.controller.js"
import { createCommentaryValidator, updateCommentaryValidate } from "../../middlewares/validators.js"

const api = Router()

api.get(
    '/',
    [
        validateJwt
    ],
    getMyCommentaries
)

api.post(
    '/:id',
    [
        validateJwt,
        createCommentaryValidator
    ],
    createCommentary
)

api.put(
    '/:id',
    [
        validateJwt,
        updateCommentaryValidate

    ],
    updateCommentary
)

api.delete(
    '/:id',
    [
        validateJwt
    ],
    deleteCommentary
)

export default api