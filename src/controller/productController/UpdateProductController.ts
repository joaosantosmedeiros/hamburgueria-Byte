import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../usecases/products/UpdateProductUseCase";
import { AppError } from "../../errors/AppError";

const updateProduct = new UpdateProductUseCase()

export class UpdateProductController {
    async handle(req: Request, res: Response) {
        
        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const id = req.params.id

        const { name, description, price } = req.body

        const product = await updateProduct.execute(id, { name, description, price })

        return res.json({ message: "Produto atualizado com sucesso.", product })
    }
}