import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class ReadOneOrderUseCase {
    async execute(is_admin: boolean | undefined, userId: string | undefined, orderId: string) {

        // Verifica se o pedido existe
        const order = await prisma.order.findUnique({ where: { id: orderId } })
        if (!order) {
            throw new AppError('Pedido não encontrado.')
        }

        // Verifica se o usuário não é admin e não foi quem fez o pedido
        if (!is_admin && order.userId != userId) {
            throw new AppError('Acesso negado.', 403)
        }

        return order
    }
}