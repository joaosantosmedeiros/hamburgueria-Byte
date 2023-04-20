import { Product } from "@prisma/client";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class ReadOneProductUseCase {
    async execute(id: string): Promise<Product> {
        const product = await prisma.product.findFirst({ where: { id } })

        // Verifica se o produto existe
        if(!product){
            throw new AppError('Produto não encontrado.')
        }

        return product
    }
}