const { ROLETYPES } = require("../middleware/constants");
const Snippet  = require("../modals/snippetSchema")
const asyncHandler = require("express-async-handler")

const getSnippets =async(req,res)=>{
    try{
        const search = req.query.search
        let query = {};

        if(search){
            query = {
                $or:[
                    {title: {$regex: search, $options: "i"}},
                    {description: {$regex: search, $options: "i"}},
                    {tags: {$in: [new RegExp(search, "i")]}},
                ]
            }
        }

        const snips = await Snippet.find(query).populate("createdBy", "username _id").sort({createdAt: -1})
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

const getMySnippets = asyncHandler(async(req,res)=>{
    
        const UserId = req.user.id; //verifyaccesstoken(in authmiddleware.js) provides this user
        const snippets = await Snippet.find({createdBy: UserId}).sort({createdAt: -1})
        
        res.status(200).json(snippets)

    
})


const createSnippet =asyncHandler(async(req,res)=>{
    const {title, description, tags, code}= req.body
    if(!title || !code){
        return res.status(400).json({message: "Title and Code fields are required."})
        // throw new Error("Title and code fields are required")
    }
    const newSnippet = await Snippet.create({title, description, tags, code,createdBy:req.user.id})
    res.status(201).json(newSnippet)
})


const editSnippet =asyncHandler(async(req,res)=>{
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    //check ownership
    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    const updatedSnip = await Snippet.findByIdAndUpdate(req.params.id, req.body,{new:true} )
    if(!updatedSnip){
        return res.status(404).json({message:'snippet not found.'})
        // throw new Error("snippet not found!!!")
    }
    res.status(200).json(updatedSnip)
})


const deleteSnippet =asyncHandler(async(req,res)=>{
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    // check ownership
    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let snip = await Snippet.findByIdAndDelete(req.params.id)
    if(!snip){
        return res.status(404).json({message: "Snippet not found."})
        // throw new Error("Snippet not found")
    }

    res.status(200).json({message:"deleted snippet"})
})

const adminDeleteSnippet = asyncHandler(async(req,res)=>{

    const snip = await Snippet.findByIdAndDelete(req.params.id);
    if(!snip){
        return res.status(404).json({message: "Snippet not found"})
    }
    console.log("reached admin delete")
    return res.status(200).json({message: "Snippet Deleted Successfully."})
})

module.exports = { getSnippets,
                    getOneSnippet,
                    createSnippet,
                    editSnippet,
                    deleteSnippet,
                    getMySnippets,
                    adminDeleteSnippet,
                }