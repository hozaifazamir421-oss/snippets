const express = require("express")
const { getSnippets, createSnippet, editSnippet, deleteSnippet, getOneSnippet } = require("../controller/snippetController")
const verifyAccessToken = require("../middleware/authMiddleware")
const router = express.Router()



router.get('/', getSnippets)//to get all codes
router.get('/:id', getOneSnippet)//to get code by id
router.post('/', verifyAccessToken, createSnippet)//to upload the code
router.put('/:id',  editSnippet)//to edit the existing code
router.delete('/:id',  deleteSnippet)//to delete the code

module.exports = router