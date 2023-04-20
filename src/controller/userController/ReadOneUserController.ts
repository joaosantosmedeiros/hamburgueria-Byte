import { Request, Response } from "express";
import { ReadOneUserUseCase } from "../../usecases/users/ReadOneUserUseCase";
import { AppError } from "../../errors/AppError";

const readOneUser = new ReadOneUserUseCase()

export class ReadOneUserController {
    async handle(req: Request, res: Response) {
        
        const id = req.params.id
        const { is_admin, userId } = req

        // Verifica se o usuário não é admin e não tem o Id da conta que quer ver 
        if(!is_admin && userId != id){
            throw new AppError('Acesso negado.', 403)
        }

        const users = await readOneUser.execute(id)

        return res.json(users)
    }
}