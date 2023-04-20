import { Request, Response } from "express";
import { ReadAllProductsUseCase } from "../../usecases/products/ReadAllProductsUseCase";
import { AppError } from "../../errors/AppError";

const readAllProducts = new ReadAllProductsUseCase()

export class ReadAllProductsController {
    async handle(req: Request, res: Response) {

        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const products = await readAllProducts.execute()

        // Verifica se há produtos cadastrados
        if (!products) {
            return res.json({ message: 'Não há produtos cadastrados.' })
        }

        return res.json(products)
    }
}