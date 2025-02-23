import { validateJwt } from "../../middlewares/validate.jwt.js"
import { passwordUpdateValidator, updateProfileValidator } from "../../middlewares/validators.js"
import { updatePassword, updateProfile } from "./user.controller.js"
import { Router } from 'express'

const api = Router()

api.put(
    '/',
    [
        validateJwt,
        updateProfileValidator
    ],
    updateProfile
)

api.put(
    '/updatePassword',
    [
        validateJwt,
        passwordUpdateValidator
    ],
    updatePassword
)

export default api