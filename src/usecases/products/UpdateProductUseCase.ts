import { ProductDTO } from "../../dto/product/ProductDTO";
import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma/client";

export class UpdateProductUseCase {
    async execute(id: string, { name, description, price }: ProductDTO) {

        // Verifica se o produto existe
        const product = await prisma.product.findFirst({ where: { id } })
        if (!product) {
            throw new AppError('Produto não encontrado.')
        }

        // Caso algum dos campos não sejam preenchidos, a informação do campo permanece
        if (!name){
            name = product.name
        }
        if (!description){
            description = product.description
        }
        if (!price){
            price = product.price
        }

        // Verifica se o novo nome do produto já está em uso
        const nameIsTaken = await prisma.product.findUnique({ where: { name } })
        if (nameIsTaken && product.name != name) {
            throw new AppError('Já possui um produto cadastrado com este nome. Tente novamente')
        }

        // Atualiza o produto
        const productUpdated = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price
            }
        })

        return productUpdated
    }
}