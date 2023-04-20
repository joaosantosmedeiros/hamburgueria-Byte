import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ReadAllOrdersUseCase } from "../../usecases/orders/ReadAllOrdersUseCase";

const readOrders = new ReadAllOrdersUseCase()

export class ReadAllOrdersController {
    async handle(req: Request, res: Response) {

        // Verifica se o usuário é admin
        if (!req.is_admin) {
            throw new AppError('Acesso negado.', 403)
        }

        const orders = await readOrders.execute()

        return res.json(orders)
    }
}