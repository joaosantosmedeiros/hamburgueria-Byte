import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../usecases/users/DeleteUserUseCase";
import { AppError } from "../../errors/AppError";

const deleteUser = new DeleteUserUseCase()

export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const id = req.params.id
        const { userId } = req

        if(!userId){
            throw new AppError('Acesso negado.', 401)
        }

        await deleteUser.execute(id, userId)

        return res.json({ message: 'Usuário deletado com sucesso.' })
    }
}