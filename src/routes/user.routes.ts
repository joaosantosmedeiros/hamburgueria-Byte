import { Request, Response, Router } from "express";
import { CreateUserController } from "../controller/userController/CreateUserController";
import { ReadAllUsersController } from "../controller/userController/ReadAllUsersController";
import { ReadOneUserController } from "../controller/userController/ReadOneUserController";
import { UpdateUserController } from "../controller/userController/UpdateUserController";
import { DeleteUserController } from "../controller/userController/DeleteUserController";
import { AuthenticateUserController } from "../controller/userController/AuthenticateUserController";
import auth from "../utils/auth";

const userRoutes = Router()

const create = new CreateUserController()
const readAll = new ReadAllUsersController()
const readOne = new ReadOneUserController()
const update = new UpdateUserController()
const deleteC = new DeleteUserController()

const authenticate = new AuthenticateUserController()

userRoutes.post('/create', create.handle)
userRoutes.get('/get/:id', auth, readOne.handle)
userRoutes.get('/get', auth, readAll.handle)
userRoutes.put('/update/:id', auth, update.handle)
userRoutes.delete('/delete/:id', auth, deleteC.handle)

userRoutes.post('/auth', authenticate.handle)

userRoutes.get('/', (req: Request, res: Response) => res.json({ message: 'User Routes' }))

export { userRoutes }