const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name:{
        type: String,
        required: [true, "Customers are required to have a name"],        
        minLength: 2,
        maxLength: 50
      },
      phone:{
        type: String,
        required: [true, "Customers are required to have a phone number"],
        minLength: [8, "Phone numbers have to be a minimum of 8 numbers"],
        maxLength: [11, "Phone numbers cannot be more than 11 numbers"]
      },

      isGold: {
        type: Boolean,
        default: false
      }
    }),
    required: true
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minLength: [2, "Movie title, cannot be less than 2 characters"],
        maxLength: [50, "Characters in a movie title cannot be more than 50"],
        required: [true, "Movies are rquired to have a title"]
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },

 dateOut: {
  type: Date,
  required: true,
  default: Date.now
 },
 dateReturned:{
  type: Date,
 },
 rentalFee:{
  type: Number,
  min: 0
 }
}))

function validateRental(rental){
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  })

  return schema.validate(rental,{abortEarly: false})
}

module.exports= {validateRental, Rental}