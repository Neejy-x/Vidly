const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,

  },
  email:{
    type: String,
    unique: true,
    minLength: 5,
    maxLength: 255,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024
  }
}))

function validateUser(user){
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  })
  return schema.validate(user, {abortEarly: false})
}

exports.User = User;
exports.validateUser = validateUser