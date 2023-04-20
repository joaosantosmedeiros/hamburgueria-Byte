import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../usecases/products/DeleteProductUseCase";
import { AppError } from "../../errors/AppError";

const deleteProduct = new DeleteProductUseCase()

export class DeleteProductController {
    async handle(req: Request, res: Response) {
        
        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const id = req.params.id

        await deleteProduct.execute(id)

        return res.json({ message: 'Produto deletado com sucesso.' })
    }
}