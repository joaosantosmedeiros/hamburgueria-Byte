import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class ReadOneUserUseCase {
    async execute(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                phone: true,
                address: true,
                is_admin: true,
                created_at: true,
                updated_at: true
            }
        })

        // Verifica se o usuário existe
        if (!user) {
            throw new AppError('Usuário não encontrado.')
        }

        return user
    }
}