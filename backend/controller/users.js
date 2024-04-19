const userModel = require('../models/userModel')
const { extractErrors } = require('../utils/common')
const validation = require('../validations/users')
const bcrypt = require('bcrypt');

const fetchNearestUsers = async (req, res) => {
    try {
        let lat = req.user.lat
        let lng = req.user.long
        // Find users within a radius of 10 kilometers from the current user's location
        const users = await userModel.find({
            email: { $ne: req?.user?.email},
            lat: { $exists: true }, // Filter users with location data
            long: { $exists: true },
            $expr: {
                $lt: [ 
                    { $sqrt: { $add: [ { $pow: [{ $subtract: ['$lat', parseFloat(lat)] }, 2] }, { $pow: [{ $subtract: ['$long', parseFloat(lng)] }, 2] } ] } },
                    0.1 // Adjust this value as needed for the desired radius
                ]
            }
        });
        res.status(200).json({users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}

const getLoginUser = async (req, res) => {
    try {
        // Get user data from the request object
        const email = req.user.email;

        // Fetch user data from the database
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res?.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
}

const updateLoginUser = async (req, res) => {
    try {

        // Validate request body against schema
        const { error, value } = validation?.upadteUser.validate(req.body, { abortEarly: false }); // Set abortEarly to false to get all errors
        if (error) {
            let errors = extractErrors(error)
            return res.status(400).json({ errors });
        }

        const email = req.user.email;
        // Find the user by ID
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(400).json({ errors:{email: 'User not found'} });
        }

        if(req.body.password){
            console.log("When updating pssword", req.body.password)
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                return res.status(400).json({ errors:{password: 'Password can not be equals to the old password'} });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword
        }

        // Update user data
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.phone) user.phone = req.body.phone;
        if (req.body.mobile) user.mobile = req.body.mobile;
        if (req.body.address) user.address = req.body.address;
        if (req.file) user.profilePic = req.file.path;

        // Save the updated user data
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        throw error
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Failed to update user data' });
    }
}





module.exports = {
    getLoginUser,
    fetchNearestUsers,
    updateLoginUser
}