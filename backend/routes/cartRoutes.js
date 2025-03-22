import express from 'express'
import { addToCart, cartItems, removeFromCart } from '../controllers/cartControllers.js'
import authMiddleware from '../middleware/isAuth.js'
const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/all',authMiddleware,cartItems)

export default cartRouter;