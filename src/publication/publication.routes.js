import { Router } from "express";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { createPublication, deletePublication, getMyPublications, getPublications, updatePublication } from "./publication.controller.js";
import { createPublicationValidator, updatePublicationValidate } from "../../middlewares/validators.js";

const api = Router()

api.post(
    '/',
    [
        validateJwt,
        createPublicationValidator
    ],
    createPublication
)

api.get(
    '/',
    [
        validateJwt
    ],
    getPublications
)

api.get(
    '/MyPublications',
    [
        validateJwt
    ],
    getMyPublications
)


api.put(
    '/:id',
    [
        validateJwt,
        updatePublicationValidate
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


export default api