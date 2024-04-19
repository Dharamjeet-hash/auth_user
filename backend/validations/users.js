const Joi = require('./extendJoi');
const upadteUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    zipcode: Joi.string().required(),
    address:Joi.string(),
    password:Joi.string(),
    profilePic:Joi.any().optional(),
  });

  module.exports = {
    upadteUser
  };