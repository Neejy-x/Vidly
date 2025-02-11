const express = require('express')
const {User} = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Joi = require('joi')




router.post('/', async(req, res)=>{
  const {email, password}= req.body
  try{
    const {error} = validate(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})


    let user = await User.findOne({email: email})
    if(!user ) return res.status(400).json({message: "Invalid email or password"})

    let isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch ) return res.status(400).json({message: "Invalid email or password"})
    
      

      const token = user.generateAuthToken()
      res.header('x-auth-token', token).send({Message: `Welcome ${user.name}`, user: {name: user.name, email: user.email}})
    
  }catch(e){
    res.status(500).json({messgae: "Internal Server Error", error: e.message})
  }
} )


function validate (user){
 const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required()
 })
 return schema.validate(user)
}

module.exports = router