import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../usecases/users/UpdateUserUseCase";
import { AppError } from "../../errors/AppError";

const updateUser = new UpdateUserUseCase()

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const id = req.params.id
        const userId = req.userId

        // Verifica se o usuário tem o Id da conta que quer alterar
        if(id !== userId){
            throw new AppError('Não é possível alterar a conta de outro usuário', 403)
        }

        const { email, password, phone, address } = req.body

        const user = await updateUser.execute(id, { email, password, phone, address })

        return res.json({ message: 'Usuário alterarado com sucesso.', user })
    }
}