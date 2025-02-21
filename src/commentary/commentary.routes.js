import { Router } from "express"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { createCommentary } from "./commentary.controller.js"

const api = Router()

api.post(
    '/:id',
    [
        validateJwt
    ],
    createCommentary
)

export default api