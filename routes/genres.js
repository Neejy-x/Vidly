const express = require('express')
const router = express.Router()
const {Genre} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/', async (req, res)=>{
try{
  const genres = await Genre.find()
  res.json(genres)
}catch(e){
  console.error(e.message)
}})


router.post('/', auth, async(req, res)=>{
  try{
    const {name, description} = req.body
    const genre = await Genre.create({
      name: name,
      description: description
    })
    res.status(200).json({message: 'Successsfully created genre',genre})
  }catch(e){
    res.status(500).json({message: "Something went wrong on the Server", error: e.message})
  }
})

router.delete('/:id',[auth, admin], async(req, res)=>{
  try{
    const id = req.params.id
    const genre = await Genre.findOneAndDelete(id)
    if(!genre)
      return res.status(404).json({message: 'Unable to find a genre with the given ID'})
    res.status(200).json({message: 'Successfully Deleted: ', genre})
  }catch(e){
    res.status(500).json({message: "Something went wrong on the server", error: e.message})
  }
})

module.exports = router