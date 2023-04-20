import { Request, Response, Router } from "express";
import { CreateOrderController } from "../controller/orderController/CreateOrderController";
import auth from "../utils/auth";
import { ReadAllOrdersController } from "../controller/orderController/ReadAllOrdersController";
import { ReadOneOrderController } from "../controller/orderController/ReadOneOrderController";
import { UpdateOrderController } from "../controller/orderController/UpdateOrderController";
import { DeleteOrderController } from "../controller/orderController/DeleteOrderController";
import { AcceptOrderController } from "../controller/orderController/AcceptOrderController";
import { DenyOrderController } from "../controller/orderController/DenyOrderController copy";

const orderRoutes = Router()

const create = new CreateOrderController()
const readAll = new ReadAllOrdersController()
const readOne = new ReadOneOrderController()
const update = new UpdateOrderController()
const deleteO = new DeleteOrderController()

const accept = new AcceptOrderController()
const deny = new DenyOrderController()

orderRoutes.get('/accept/:id', auth, accept.handle)
orderRoutes.get('/deny/:id', auth, deny.handle)

orderRoutes.post('/create', auth, create.handle)
orderRoutes.get('/get', auth, readAll.handle)
orderRoutes.get('/get/:id', auth, readOne.handle)
orderRoutes.put('/update/:id', auth, update.handle)
orderRoutes.delete('/delete/:id', auth, deleteO.handle)

orderRoutes.get('/', (req: Request, res: Response) => res.json({ message: 'Order routes' }))

export { orderRoutes }