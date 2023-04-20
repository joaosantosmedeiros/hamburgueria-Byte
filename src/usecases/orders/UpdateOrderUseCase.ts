import { OrderDTO } from "../../dto/order/OrderDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class UpdateOrderUseCase {
    async execute(orderId: string, userId: string, { productId, quantity }: OrderDTO) {

        // Verifica se o pedido existe
        const order = await prisma.order.findUnique({ where: { id: orderId } })
        if (!order) {
            throw new AppError('Pedido não encontrado.')
        }

        // Verifica se o usuario foi quem fez o pedido
        if (userId != order.userId) {
            throw new AppError('Não é possível alterar o pedido de outro usuário.', 403)
        }

        // Verifica se o status do pedido esta como 'Pendente'
        if(order.situation != 'PENDING'){
            throw new AppError('Só é possivel alterar um pedido que está com o status pendentes.')
        }

        // Verifica se os campos foram enviados. Caso não, seus valores não são alterados
        if (!productId) {
            productId = order.productId
        }
        if (!quantity) {
            quantity = order.quantity
        }

        // Verifica se o produto existe
        const product = await prisma.product.findUnique({ where: { id: productId } })
        if (!product) {
            throw new AppError('Produto não existente.')
        }

        // Altera o preço total
        const total_price = product.price * quantity

        // Atualiza o pedido
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                productId,
                quantity,
                total_price
            }
        })

        return updatedOrder
    }
}