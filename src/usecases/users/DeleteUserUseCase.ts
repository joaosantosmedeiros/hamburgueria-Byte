import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteUserUseCase {
    async execute(id: string, userId:string) {

        // Verifica se o usuário existe
        const userExists = await prisma.user.findUnique({ where: { id } })
        if (!userExists) {
            throw new AppError('Usuário não encontrado.')
        }

        // Verifica se o usuario está tentando deletar outro usuario
        if(userId !== userExists.id){
            throw new AppError('Não é possivel deletar a conta de outro usuário.', 403)
        }

        await prisma.user.delete({ where: { id } })
    
    }
}