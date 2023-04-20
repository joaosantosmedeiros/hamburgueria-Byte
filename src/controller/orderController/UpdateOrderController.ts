import { Request, Response } from "express-serve-static-core";
import { UpdateOrderUseCase } from "../../usecases/orders/UpdateOrderUseCase";
import { AppError } from "../../errors/AppError";

const updateOrder = new UpdateOrderUseCase()

export class UpdateOrderController {
    async handle(req: Request, res: Response) {

        const orderId = req.params.id
        const { userId } = req

        // Verifica se o userId foi enviado
        if (!userId) {
            throw new AppError('Acesso negado.', 401)
        }

        const { productId, quantity } = req.body

        const order = await updateOrder.execute(orderId, userId, { productId, quantity })

        return res.json({ message: 'Pedido atualizado com sucesso.', order })
    }
}