import { Router } from 'express'
import { loginValidator, registerValidator } from '../../middlewares/validators.js';
import { CreateUser, login } from './auth.controller.js';

const api = Router()

api.post(
    '/register', 
    [registerValidator], 
    CreateUser
)

api.post(
    '/login', 
    [loginValidator], 
    login
)

export default api