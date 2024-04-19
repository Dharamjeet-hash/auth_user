const userController = require('../controller/users')
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer')


router.get('/get-login-user',authMiddleware,userController.getLoginUser)
router.post('/update-login-user', authMiddleware, multer.single('profilePic'), userController.updateLoginUser)
router.get('/get-nearest-users',authMiddleware,userController.fetchNearestUsers)

module.exports = router