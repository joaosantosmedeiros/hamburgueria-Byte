import { Request, Response } from "express";
import { CreateProductUseCase } from "../../usecases/products/CreateProductUseCase";
import { AppError } from "../../errors/AppError";

const createProduct = new CreateProductUseCase()

export class CreateProductController {
    async handle(req: Request, res: Response) {

        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const { name, description, price } = req.body

        const product = await createProduct.execute({ name, description, price })

        return res.status(201).json({message: "Produto criado com sucesso.", product})
    }
}