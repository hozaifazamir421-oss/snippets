const express = require("express")
const { getSnippets, createSnippet, editSnippet, deleteSnippet, getOneSnippet, getMySnippets, adminDeleteSnippet } = require("../controller/snippetController")
const verifyAccessToken = require("../middleware/authMiddleware")
const { authorize } = require("../middleware/athorize")
const PERMISSIONS  = require("../middleware/permission")
const optionalAuth = require("../middleware/optionalAuth")
const router = express.Router()



router.get('/',optionalAuth, getSnippets)//to get all codes
router.get('/mine', verifyAccessToken, getMySnippets)
router.get('/:id', optionalAuth, getOneSnippet)//to get code by id


//protected routes
router.post('/', verifyAccessToken,authorize(PERMISSIONS.SNIPPET_CREATE), createSnippet)//to upload the code
router.put('/:id', verifyAccessToken,authorize(PERMISSIONS.SNIPPET_UPDATE_OWN), editSnippet)//to edit the existing code
router.delete('/:id', verifyAccessToken,authorize(PERMISSIONS.SNIPPET_DELETE_OWN), deleteSnippet)//to delete the code


//admin routes
router.delete('/admin/:id', verifyAccessToken,authorize(PERMISSIONS.SNIPPET_DELETE_ANY), adminDeleteSnippet)

module.exports = router