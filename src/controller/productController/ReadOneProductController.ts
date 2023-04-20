import { Request, Response } from "express";
import { ReadOneProductUseCase } from "../../usecases/products/ReadOneProductUseCase";
import { AppError } from "../../errors/AppError";

const readOneProduct = new ReadOneProductUseCase()

export class ReadOneProductController {
    async handle(req: Request, res: Response) {
        
        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const id = req.params.id

        const product = await readOneProduct.execute(id)

        return res.json(product)
    }
}