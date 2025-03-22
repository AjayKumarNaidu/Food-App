import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import foodRouter from './routes/foodRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import 'dotenv/config'

const app = express()

//middleware
const allowedOrigins = ['http://localhost:5173','http://localhost:5174']
app.use(express.json())
app.use(cors({origin:allowedOrigins,credentials:true}))

app.get('/',(req,res)=>{
  res.send('hello')
})
app.use('/food',foodRouter)
app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes)

mongoose.connect('mongodb+srv://iajaykumar3377:lPXyrqN3jbm8Q0dj@cluster0.eu8r2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(()=>{
    console.log("MongoDb connected")
  })
  .catch((err)=>{
    console.log("MongoDb not connected")
  })

const PORT = process.env.PORT || 4000;

app.listen('4000',()=>{
  console.log(`app is running on server ${PORT} oooh`)
})

