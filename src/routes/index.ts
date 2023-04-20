import { Router, Response, Request } from "express";
import { productRoutes } from "./product.routes";
import { userRoutes } from "./user.routes";
import { orderRoutes } from "./order.routes";

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Ok' })
})
routes.use('/product', productRoutes)
routes.use('/user', userRoutes)
routes.use('/order', orderRoutes)

export { routes }