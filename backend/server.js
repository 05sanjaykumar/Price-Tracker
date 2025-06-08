const express = require('express')
const cors = require('cors')
const DB = require('./config/DB')
const userRoutes = require('./Routes/AuthRoutes');
DB()

const app = express()
app.use(express.json());


app.use(cors())
app.use('/api', userRoutes);

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`The app is running at port ${PORT}`)
})