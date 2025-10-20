const Snippet  = require("../modals/snippetSchema")
const asyncHandler = require("express-async-handler")

const getSnippets =async(req,res)=>{
    try{
        const snips = await Snippet.find()
        res.json(snips)
    }catch(error){
        console.log(`Error connecting DB: ${error.message}`)
        return res.status(500).json({message:"server error", error: error.message})
    }
}


const getOneSnippet =asyncHandler(async(req,res)=>{
    const snip = await Snippet.findById(req.params.id)
    if(!snip){
        return res.status(404).json({message: "Snippet not found."})
        // throw new Error("The snippet not found")
    }
    res.status(200).json(snip)
})


const createSnippet =asyncHandler(async(req,res)=>{
    const {title, description, tags, code}= req.body
    if(!title || !code){
        return res.status(400).json({message: "Title and Code fields are required."})
        // throw new Error("Title and code fields are required")
    }
    const newSnippet = await Snippet.create({title, description, tags, code})
    res.status(201).json(newSnippet)
})


const editSnippet =asyncHandler(async(req,res)=>{
    
    const updatedSnip = await Snippet.findByIdAndUpdate(req.params.id, req.body,{new:true} )
    if(!updatedSnip){
        return res.status(404).json({message:'snippet not found.'})
        // throw new Error("snippet not found!!!")
    }
    res.status(200).json(updatedSnip)
})


const deleteSnippet =asyncHandler(async(req,res)=>{
    let snip = await Snippet.findByIdAndDelete(req.params.id)
    if(!snip){
        return res.status(404).json({message: "Snippet not found."})
        // throw new Error("Snippet not found")
    }

    res.status(200).json({message:"deleted snippet"})
})

module.exports = { getSnippets, getOneSnippet, createSnippet, editSnippet, deleteSnippet}