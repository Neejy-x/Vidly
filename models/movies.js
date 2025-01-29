const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
const Joi = require('joi')

const movieSchema =  new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movies are required to have a title'],
    minLength: 2
  },
  genre:{
    type: genreSchema,
    required: true
  },
  numberInStock: Number,
  dailyRentalRate: Number
})


const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie){
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().optional(),
    dailyRentalRate: Joi.number().optional()
  })
  return schema.validate(movie,{abortEarly: false})
}

module.exports = {Movie, validateMovie}