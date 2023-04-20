import { prisma } from "../../prisma/client";
import { Product } from "@prisma/client"
import { AppError } from "../../errors/AppError";
import { ProductDTO } from "../../dto/product/ProductDTO";

export class CreateProductUseCase {
    async execute({ name, description, price }: ProductDTO): Promise<Product> {

        // Verifica se todos os campos foram preenchidos
        if(!name || !description || !price){
            throw new AppError('Preencha todos os campos.')
        }

        // Verifica se o produto já existe
        const productExists = await prisma.product.findUnique({ where: { name } })
        if(productExists){
            throw new AppError("Produto já existente.")
        }

        // Cria o produto
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price
            }
        })

        return product
    }
}