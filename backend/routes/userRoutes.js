const express = require('express')
const { registerUser, loginUser, logoutUser, refreshAccessToken, getAllUsers, deleteUser } = require('../controller/userController')
const verifyAccessToken = require('../middleware/authMiddleware')
const { authorize } = require('../middleware/athorize')
const PERMISSIONS = require('../middleware/permission')
const router = express.Router()


//public routes
router.post('/register',registerUser)
router.post('/login', loginUser)

//protected route(loggedin verification through middleware)
router.post('/logout',  logoutUser)
router.post('/refresh-token', refreshAccessToken)

router.get('/admin/users', verifyAccessToken,authorize(PERMISSIONS.USER_GET_ALL), getAllUsers)
router.delete('/admin/:id', verifyAccessToken, authorize(PERMISSIONS.DELETE_USER), deleteUser)

module.exports = router