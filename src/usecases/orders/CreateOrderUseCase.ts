import { OrderDTO } from "../../dto/order/OrderDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class CreateOrderUseCase {
    async execute(userId: string, { productId, quantity }: OrderDTO) {

        // Verifica se todos os campos foram passados
        if(!productId || !quantity){
            throw new AppError('Preencha todos os campos.')
        }

        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({ where: { id: userId } })

        // Verifica se o produto existe
        const product = await prisma.product.findUnique({ where: { id: productId } })
        if (!product) {
            throw new AppError('Produto não existente.')
        }

        // Determina o total a ser pago
        const total_price = product.price * quantity

        const order = await prisma.order.create({
            data: {
                userId,
                productId,
                quantity,
                total_price
            }
        })

        return order
    }
}