const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
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
  },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id:this.id, isAdin: this.isAdmin}, process.env.ACCESS_TOKEN_SECRET);
}

const User = mongoose.model('User', userSchema)

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