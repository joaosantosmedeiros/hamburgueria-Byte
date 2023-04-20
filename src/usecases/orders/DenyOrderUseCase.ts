import { Status } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DenyOrderUseCase {
    async execute(id: string) {

        // Verifica se o pedido existe
        const order = await prisma.order.findUnique({ where: { id } })
        if (!order) {
            throw new AppError('Pedido não existente.')
        }

        // Verificas e o pedido está com o status pendente
        if (order.situation != 'PENDING') {
            throw new AppError('Só é possivel mudar o status de um pedido pendente.')
        }
        
        const orderUpdated = await prisma.order.update({
            where: { id },
            data: {
                situation: Status.DENIED
            }
        })

        return orderUpdated
    }
}