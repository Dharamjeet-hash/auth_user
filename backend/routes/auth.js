const authController = require('../controller/auth')
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer')

router.post('/login', authController.login)
router.post('/register', multer.single('profilePic'), authController.register)


module.exports = router