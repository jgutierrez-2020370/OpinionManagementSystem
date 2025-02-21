import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { createPublication, deletePublication, getPublications, updatePublication } from "./publication.controller.js";
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

api.put(
    '/:id',
    [
        validateJwt
    ],
    updatePublication
)

api.delete(
    '/:id',
    [
        validateJwt
    ],
    deletePublication
)

api.get(
    '/',
    [
        validateJwt
    ],
    getPublications
)

export default api