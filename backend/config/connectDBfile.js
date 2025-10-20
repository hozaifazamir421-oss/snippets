const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected : ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Error connecting DB: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDb