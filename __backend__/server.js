const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 3000
app.use(cors())

app.listen(PORT,()=>{
    console.log(`The app is running at port ${PORT}`)
})