import { User } from "@prisma/client";
import { UserDTO } from "../../dto/user/UserDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import bcrypt from 'bcryptjs'

export class CreateUserUseCase {
    async execute({ email, password, phone, address }: UserDTO): Promise<User> {

        // Verifica se todos os campos foram passados
        if(!email || !password || !phone || !address){
            throw new AppError('Preencha todos os campos.')
        }

        // Verifica se o usuário ja existe
        const userExists = await prisma.user.findUnique({ where: { email } })
        if(userExists){
            throw new AppError("Email em uso.")
        }

        // Codifica a senha
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt)

        const user = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                phone,
                address
            }
        })

        return user
    }
}