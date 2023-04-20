import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import { AppError } from './errors/AppError'
import { routes } from './routes'
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

// Uso das rotas
app.use(routes)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ status: "error", message: err.message })
    }

    return res.status(500).json({status: "error", message: `Internal server error - ${err.message}`})
})

app.listen(PORT || 3000, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})