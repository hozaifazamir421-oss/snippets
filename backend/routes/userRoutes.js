const express = require('express')
const { registerUser, loginUser, logoutUser, refreshAccessToken } = require('../controller/userController')
const verifyAccessToken = require('../middleware/authMiddleware')
const router = express.Router()


//public routes
router.post('/register',registerUser)
router.post('/login', loginUser)

//protected route(loggedin verification through middleware)
router.post('/logout', verifyAccessToken, logoutUser)
router.post('/refresh-token', refreshAccessToken)

module.exports = router