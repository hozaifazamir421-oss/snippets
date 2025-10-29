const express = require("express")
const { getSnippets, createSnippet, editSnippet, deleteSnippet, getOneSnippet, getMySnippets } = require("../controller/snippetController")
const verifyAccessToken = require("../middleware/authMiddleware")
const router = express.Router()



router.get('/', getSnippets)//to get all codes
router.get('/mine', verifyAccessToken, getMySnippets)
router.get('/:id', getOneSnippet)//to get code by id


//protected routes
router.post('/', verifyAccessToken, createSnippet)//to upload the code
router.put('/:id', verifyAccessToken, editSnippet)//to edit the existing code
router.delete('/:id', verifyAccessToken, deleteSnippet)//to delete the code


module.exports = router