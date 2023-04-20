import { Request, Response } from "express";
import { ReadAllUsersUseCase } from "../../usecases/users/ReadAllUsersUseCase";
import { AppError } from "../../errors/AppError";

const readAllUsers = new ReadAllUsersUseCase()

export class ReadAllUsersController {
    async handle(req: Request, res: Response) {
        
        // Verifica se o usuário é admin
        if(!req.is_admin){
            throw new AppError('Acesso negado.', 403)
        }

        const users = await readAllUsers.execute()
        
        return res.json(users)
    }
}