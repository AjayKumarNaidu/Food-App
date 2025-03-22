import express from 'express';
import { addFood, del, list } from '../controllers/foodControllers.js';

const foodRouter = express.Router()

foodRouter.post('/add',addFood)
foodRouter.get('/all',list)
foodRouter.delete('/del/:id',del)

export default foodRouter;