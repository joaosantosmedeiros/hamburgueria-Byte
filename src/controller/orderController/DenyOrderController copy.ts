import { Request, Response } from "express";
import { DenyOrderUseCase } from "../../usecases/orders/DenyOrderUseCase";
import { AppError } from "../../errors/AppError";

const denyOrder = new DenyOrderUseCase()

export class DenyOrderController {
    async handle(req: Request, res: Response) {

        // Verifica se o usuario é adm
        const { is_admin } = req
        if (!is_admin) {
            throw new AppError('Acesso Negado', 403)
        }

        const id = req.params.id

        const order = await denyOrder.execute(id)

        return res.json({ message: 'Pedido negado com sucesso.', order })
    }
}