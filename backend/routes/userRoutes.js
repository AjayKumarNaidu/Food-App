import express from 'express'
import { userLogin, userRegister } from '../controllers/userControllers.js'
const userRoutes = express.Router()

userRoutes.post('/login',userLogin)
userRoutes.post('/register',userRegister)

export default userRoutes;