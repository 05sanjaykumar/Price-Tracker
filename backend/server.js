const express = require('express')
const cors = require('cors')
const DB = require('./config/db')
const userRoutes = require('./Routes/AuthRoutes');
const getPrice = require('./Routes/GetPrice')
const savePrompt = require('./Routes/SavePrompts')
DB()

const app = express()
app.use(cors())
app.use(express.json());


app.use('/api', userRoutes);
app.use('/getPrice',getPrice)
app.use('/savePrompt',savePrompt)

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`The app is running at port ${PORT}`)
})

module.exports = app