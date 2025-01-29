const mongoose = require('mongoose')
const Joi = require('joi')


const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'Genres are required to have a name'],
    minLength: [2, "A Genre's name must be at least 2 characters long"],
    maxLenght: [50, "A Genre's name cannot be more than 50 characters"]
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 250
  }
})

const Genre = mongoose.model('Genre', genreSchema)

function validateGenre(genre){
  const Schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(250)
  })
  return Schema.validate(genre, {abortEarly: false})
}

module.exports = {genreSchema, Genre}
