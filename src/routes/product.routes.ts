import { Request, Response, Router } from "express";
import { CreateProductController } from "../controller/productController/CreateProductController";
import { ReadAllProductsController } from "../controller/productController/ReadAllProductsController";
import { ReadOneProductController } from "../controller/productController/ReadOneProductController";
import { UpdateProductController } from "../controller/productController/UpdateProductController";
import { DeleteProductController } from "../controller/productController/DeleteProductController";
import auth from "../utils/auth";

const productRoutes = Router()

const create = new CreateProductController()
const readAll = new ReadAllProductsController()
const readOne = new ReadOneProductController()
const update = new UpdateProductController()
const deleteOne = new DeleteProductController()

productRoutes.post('/create', auth, create.handle)
productRoutes.get('/get/:id', auth, readOne.handle)
productRoutes.get('/get', auth, readAll.handle)
productRoutes.put('/update/:id', auth, update.handle)
productRoutes.delete('/delete/:id', auth, deleteOne.handle)

productRoutes.get('/', (req: Request, res: Response) => res.json({ mesage: 'Product Routes' }))

export { productRoutes }