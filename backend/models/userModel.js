const mongoose = require('mongoose');
const dbConnection = require('../DB/conn');
const {Number, String} = mongoose.Schema.Types

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email addresses
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    profilePic: {
        type: String // Assuming profile pic is stored as a URL
    },

    lat:{
        type: Number,
        required: true
    },

    long:{
        type: Number,
        required: true,
    },
    
    address:{
        type: String
    }
});

// Create the User model using the schema
const userModel = dbConnection.model('users', userSchema);

module.exports = userModel;
