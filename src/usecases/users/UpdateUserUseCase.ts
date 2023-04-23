import { UserDTO } from "../../dto/user/UserDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";
import bcrypt from 'bcryptjs'

export class UpdateUserUseCase {
    async execute(id: string, { email, password, phone, address }: UserDTO) {

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw new AppError('Usuário não encontrado.')
        }

        // Caso algum dos campos não sejam preenchidos, a informação do campo permanece
        if (!email) {
            email = user.email
        }
        if( !phone){
            phone = user.phone
        }
        if( !address){
            address = user.address
        }
        
        // Verifica se o email já está em uso por outro usuário
        const emailIsTaken = await prisma.user.findUnique({ where: { email } })
        if (emailIsTaken && user.email != email) {
            throw new AppError('Email em uso')
        }
        
        // Codifica a senha
        const salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password, salt)

        // Verifica se a senha nao foi alterada
        if (!password || password.length == 0 || /^\s*$/.test(password)) {
            hashedPassword = user.password
        }

        // Atualiza o usuario
        const userUpdated = await prisma.user.update({
            where: { id },
            data: {
                email,
                password: hashedPassword,
                phone, 
                address
            }
        })

        return userUpdated
    }
}