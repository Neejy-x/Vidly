const express = require('express')
const router = express.Router()
const {Genre} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/', async (req, res)=>{
  const genres = await Genre.find()
  res.json(genres)
})


router.post('/', auth, async(req, res)=>{
  
    const {name, description} = req.body
    const genre = await Genre.create({
      name: name,
      description: description
    })
    res.status(200).json({message: 'Successsfully created genre',genre})
})

router.delete('/:id',[auth, admin], async(req, res)=>{

    const id = req.params.id
    const genre = await Genre.findOneAndDelete(id)
    if(!genre)
      return res.status(404).json({message: 'Unable to find a genre with the given ID'})
    res.status(200).json({message: 'Successfully Deleted: ', genre})
 
})

module.exports = router