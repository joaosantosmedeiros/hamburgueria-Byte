import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class DeleteProductUseCase {
    async execute(id: string) {
        
        // Verifica se o produto existe
        const productExists = await prisma.product.findFirst({ where: { id } })
        if (!productExists) {
            throw new AppError('Produto não encontrado.')
        }

        await prisma.product.delete({ where: { id } })
    }
}