const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User, validateUser} = require('../models/user')


router.post('/', async(req, res)=>{

 try{
  const {error} = validateUser(req.body)
  if(error) return res.status(400).send(error.details.map(err => err.message))

  let user = await User.findOne(_.pick(req.body, ['email']))
  if(user) return res.status(400).send("User already registered")

  user = new User(_.pick(req.body, ['name', 'email', 'password']))
  user.password = await bcrypt.hash(user.password ,10)
  await user.save()
  res.send(
    _.pick(user, ['name', 'email'])
  )
 }catch(e){
  res.status(500).json({message: "Internal Sever Error", error: e.message})
 }
})



module.exports = router