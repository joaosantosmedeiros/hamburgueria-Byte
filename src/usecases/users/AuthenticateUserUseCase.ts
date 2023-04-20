import { UserDTO } from "../../dto/user/UserDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import bcrypt from 'bcryptjs'

export class AuthenticateUserUseCase {
    async execute({ email, password }: UserDTO) {

        // Verifica se os campos foram preenchidos
        if (!email || !password) {
            throw new AppError('Preencha todos os campos.')
        }

        // Verifica se o usuario existe
        const userExists = await prisma.user.findUnique({ where: { email } })
        if (!userExists) {
            throw new AppError('Email ou senha não confere.')
        }

        // Verifica se a senha está correta
        const correctPassword = bcrypt.compareSync(password, userExists.password)
        if (!correctPassword) {
            throw new AppError('Email ou senha não confere.')
        }
        
        return userExists
    }
}