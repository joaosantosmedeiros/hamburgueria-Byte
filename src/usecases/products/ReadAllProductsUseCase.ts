import { prisma } from "../../prisma/client";

export class ReadAllProductsUseCase{
    async execute(){
        const products = await prisma.product.findMany({})

        return products
    }
}