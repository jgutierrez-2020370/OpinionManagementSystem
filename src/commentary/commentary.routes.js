import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createCommentary, deleteCommentary, getMyCommentaries, updateCommentary } from "./commentary.controller.js"

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
        validateJwt
    ],
    createCommentary
)

api.put(
    '/:id',
    [
        validateJwt
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