import { Request, Response } from "express";
import { generateToken } from "../../utils/generateToken";
import { CreateUserUseCase } from "../../usecases/users/CreateUserUseCase";

const createUser = new CreateUserUseCase()

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { email, password, phone, address } = req.body

        const user = await createUser.execute({ email, password, phone, address })
        const token = generateToken({ id: user.id, is_admin: user.is_admin })
        req.headers.authorization = `Bearer ${token}`

        return res.status(201).json({ message: 'Usuário criado com sucesso.', token })
    }
}   