const Joi = require('./extendJoi');
const userModel = require('../models/userModel');

const userExists = async (value, helpers) => {
  const user = await userModel.findOne({ email: value });
  if (user) {
    throw new Error('User already exist');
  }
};

// Common validation schema for signup
const signup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().optional(),
  mobile: Joi.string().required(),
  zipcode: Joi.string().required(),
  lat:Joi.number().min(-90).max(90).required(),
  long:Joi.number().min(-180).max(180).required(),
  profilePic:Joi.object({
    originalname: Joi.string().required(),
    encoding: Joi.string(), 
    mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
    fieldname:Joi.string()
  }).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
  signup,
  login
};
