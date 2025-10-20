const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require('./config/connectDBfile')



const  PORT =  process.env.PORT || 3000
connectDb()
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.json({message: "hello"})
// })

app.use('/snippets', require('./routes/codeRoute'))

app.listen(PORT, (err)=>[
    console.log(`app is listening on ${PORT}`)
])