import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../usecases/orders/CreateOrderUseCase";
import { AppError } from "../../errors/AppError";

const createOrder = new CreateOrderUseCase()

export class CreateOrderController {
    async handle(req: Request, res: Response) {
        const {userId, is_admin} = req

        // Verifica se o id do usuario esta presente
        if(!userId){
            throw new AppError('Não é possivel realizar pedidos sem autenticação.', 401)
        }

        // Verifica se o usuario não é admin
        if(is_admin){
            throw new AppError('Admins não podem realizar pedidos.', 400)
        }

        const { productId, quantity } = req.body

        const order = await createOrder.execute(userId, {productId, quantity})

        return res.json({message: 'Pedido realizado com sucesso.', order})
    }
}