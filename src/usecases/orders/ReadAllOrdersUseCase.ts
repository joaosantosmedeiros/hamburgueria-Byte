import { prisma } from "../../prisma/client";

export class ReadAllOrdersUseCase {
    async execute() {   
        const orders = await prisma.order.findMany()

        return orders
    }
}