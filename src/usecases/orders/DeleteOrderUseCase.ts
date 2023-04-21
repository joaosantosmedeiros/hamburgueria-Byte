import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteOrderUseCase {
    async execute(orderId: string, userId: string) {

        // Verifica se o pedido existe
        const order = await prisma.order.findUnique({ where: { id: orderId } })
        if (!order) {
            throw new AppError('Pedido não existente.')
        }

        // Verifica se o usuario é dono do pedido
        if (order.userId != userId) {
            throw new AppError('Não é possível deletar o pedido de outro usuário.', 403)
        }

        // Verifica se o status do pedido é pending
        if (order.situation != 'PENDING') {
            throw new AppError('Só é possível deletar um pedido que está com seu status pendente.')
        }

        await prisma.order.delete({ where: { id: orderId } })
    }
}