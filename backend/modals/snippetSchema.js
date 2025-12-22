const mongoose = require("mongoose")

const snippetSchema = new mongoose.Schema({
    
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tags: {
        type: [String]
    },
    code: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    visibility: {
        type: String,
        enum: ['PUBLIC','PRIVATE'],
        default: 'PRIVATE'
    }
    
},{timestamps:true})

module.exports = mongoose.model("Snippet",snippetSchema)