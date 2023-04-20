import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { AcceptOrderUseCase } from "../../usecases/orders/AcceptOrderUseCase";

const acceptOrder = new AcceptOrderUseCase()

export class AcceptOrderController {
    async handle(req: Request, res: Response) {

        // Verifica se o usuario é adm
        const { is_admin } = req
        if (!is_admin) {
            throw new AppError('Acesso Negado', 403)
        }

        const id = req.params.id

        const order = await acceptOrder.execute(id)

        return res.json({ message: 'Pedido aceito com sucesso.', order })
    }
}