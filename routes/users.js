const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User, validateUser} = require('../models/user')
const {Rental} = require('../models/rentals')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


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


router.get('/', async(req, res)=>{
try{
  const users = await User.find()
  res.send(users)
}catch(e){
  res.status(500).json({message: "Internal Sever Error", error: e.message})
}
})



router.get('/rentals', auth, async(req, res)=>{
  try{
    const rentals= await Rental.findById(req.user._id)
    if(!rentals) return res.status(404).send('This user has no active rentals')

    res.send(rentals)
  }catch(e){
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }
})

router.get('/me', auth, async(req, res)=>{
  try{
    const user = await User.findById(req.user._id).select('-password -_id -__v')
    res.send(user)
  }catch(e){
    res.status(500).send({message: "Internal Server error:", error: e.message})
  }
})




module.exports = router