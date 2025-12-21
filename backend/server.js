const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require('./config/connectDBfile')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/userRoutes')
const snippetRoutes = require('./routes/codeRoute')



const  PORT =  process.env.PORT || 3000
connectDb()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser());


// app.get('/',(req,res)=>{
//     res.json({message: "hello"})
// })

app.use('/snippets', snippetRoutes)
app.use('/auth',authRoutes)


app.listen(PORT, (err)=>[
    console.log(`app is listening on ${PORT}`)
])