import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { createPublication } from "./publication.controller.js";
import { createPublicationValidator } from "../../middlewares/validators.js";

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        createPublicationValidator
    ],
    createPublication
)

export default api