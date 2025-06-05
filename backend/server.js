const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./Routes/authRoutes');
const getPrice = require('./Routes/getPrices')
const itemRoutes=require('./Routes/itemRoutes')

connectDB()

const app = express()


const PORT = 3000
app.use(cors())
app.use(express.json())


app.use('/auth', authRoutes);
app.use("/item",itemRoutes);
app.use('/price',getPrice)


app.listen(PORT,(req,res)=>{
    console.log(`The app is running at port ${PORT}`)
})
