import { Request, Response } from "express";
import { ReadOneOrderUseCase } from "../../usecases/orders/ReadOneOrderUseCase";
import { AppError } from "../../errors/AppError";

const readOneOrder = new ReadOneOrderUseCase()

export class ReadOneOrderController {
    async handle(req: Request, res: Response) {

        const { is_admin, userId } = req
        const orderId = req.params.id

        const order = await readOneOrder.execute(is_admin, userId, orderId)

        return res.json(order)
    }
}