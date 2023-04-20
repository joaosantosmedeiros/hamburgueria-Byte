import { Request, Response } from "express";
import { generateToken } from "../../utils/generateToken";
import { AuthenticateUserUseCase } from "../../usecases/users/AuthenticateUserUseCase";

const authenticateUser = new AuthenticateUserUseCase()

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const auth = await authenticateUser.execute({ email, password })
        const token = generateToken({ id: auth.id, is_admin: auth.is_admin })

        return res.json({ message: "Login realizado com sucesso.", token })
    }
}