const userModel = require('../models/userModel');
const { extractErrors } = require('../utils/common');
const validation = require('../validations/auth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try{
        // Validate request body against schema
        const { error, value } = validation?.login.validate(req.body, { abortEarly: false }); // Set abortEarly to false to get all errors
        if (error) {
            let errors = extractErrors(error)
            return res.status(400).json({ errors });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors:{email: 'Email does not exist'} });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ errors:{password: 'Invalid password'} });
        }


        let tokenDetails = {email:user?.email, name:user?.name, mobile:user?.mobile, lat:user?.lat, long:user?.long}
        let token = jwt.sign(tokenDetails, process.env.JWT_SALT || 'auth_user');
        

        res.status(200).json({ message: 'Login successful', token });
    }catch(err){
        res.status(500).json({ message: 'Failed to create user' });
    }
}

// Register Route
const register = async (req, res) => {
    try {
        // Validate request body against schema
        const { error, value } = validation?.signup.validate(req.body, { abortEarly: false }); // Set abortEarly to false to get all errors
        let errors = []
        if (error) {
            let errors = extractErrors(error)
            return res.status(400).json({ errors });
        }
        // Extract fields from request body
        const { name, email, password, phone, mobile, zipcode, lat, long } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            lat,
            long,
            email,
            password: hashedPassword,
            mobile,
            zipcode,
            profilePic: req.file ? req.file.path : null // Check if profile pic uploaded
        };

        const checkUser = await userModel.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json({errors: {email: 'Email already exist'} });
        }

        const checkMobile = await userModel.findOne({ mobile: mobile });
        if (checkMobile) {
            return res.status(400).json({errors: {mobile: 'Mobile already exist'} });
        }

        const user = await userModel.create(userData)
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        throw err
        res.status(500).json({ message: 'Failed to create user' });
    }
}


module.exports = {
    register,
    login
}
