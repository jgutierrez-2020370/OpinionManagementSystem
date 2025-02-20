'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'

const configs = (app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(limiter)
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use(authRoutes)
    app.use('/v1/User', userRoutes)
    app.use('/v1/Category', categoryRoutes)
    app.use('/v1/Publication', publicationRoutes)
}

export const initServer = async()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}