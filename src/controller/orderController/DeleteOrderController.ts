import { Request, Response } from "express";
import { DeleteOrderUseCase } from "../../usecases/orders/DeleteOrderUseCase";
import { AppError } from "../../errors/AppError";

const deleteOrder = new DeleteOrderUseCase()

export class DeleteOrderController {
    async handle(req: Request, res: Response) {

        const orderId = req.params.id
        const { userId, is_admin } = req

        // Verifica se o id de usuario foi passado
        if(!userId){
            throw new AppError('Acesso negado.', 401)
        }

        // Verifica se o usuario é admin
        if(is_admin){
            throw new AppError('Admins não podem deletar pedidos.')
        }

        await deleteOrder.execute(orderId, userId)

        return res.json({message: 'Pedido deletado com sucesso.'})
    }
}