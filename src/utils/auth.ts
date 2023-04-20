import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from 'jsonwebtoken'
const authConfig = require('../config/auth.json')

export = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    
    // Verifica se há cabeçalho
    if (!authHeader) {
        throw new AppError('No token provided.', 401)
    }

    // Verficia se o token pode ser dividido em dois
    const parts = authHeader.split(' ')
    if (parts.length !== 2) {
        throw new AppError('Invalid token.', 401)
    }
    
    const [scheme, token] = parts
    
    // Verifica se o token está formatado
    if(!/^Bearer$/i.test(scheme)){
        throw new AppError('Invalid token.', 401)
    }
    
    // Verifica se o token é valido
    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if(err){
            throw new AppError('Invalid token.', 401)
        }
        
        req.userId = decoded.params.id
        req.is_admin = decoded.params.is_admin
        return next()
    })
    
}