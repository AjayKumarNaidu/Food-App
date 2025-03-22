import express from 'express'
import { allOrders, placeOrder, updateOption, userOrders } from '../controllers/orderControllers.js'
import authMiddleware from '../middleware/isAuth.js'

const orderRouter = express.Router()

orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/orders',authMiddleware,userOrders)
orderRouter.get('/all',allOrders)
orderRouter.post('/update',updateOption)

export default orderRouter;