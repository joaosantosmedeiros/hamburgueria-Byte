import { prisma } from "../../prisma/client";

export class ReadAllUsersUseCase {
    async execute() {
        const users = await prisma.user.findMany({
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

        return users
    }
}