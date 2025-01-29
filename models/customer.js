const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = mongoose.Schema({
name:{
  type: String,
  required: [true, "Customers ar required to have names"],
  minLength: 2,
  maxLength: 50
},
phone:{
  type: String,
  required: [true, "Customers are required to have a phone number"],
  minLength: [8, "Phone numbers have to be a minimum of 8 numbers"],
  maxLength: [11, "Phone numbers cannot be more than 11 numbers"]
},
age: {
  type: Number,
  min: 18,
  max: 90
},
isGold: {
  type: Boolean,
  default: false
}
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer){
const schema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  age: Joi.number().min(18).max(90).optional(),
  phone: Joi.string().min(8).max(11).required(),
  isGold: Joi.boolean().optional()
})
return schema.validate(customer, {abortEarly: false})
}

module.exports = {Customer, validateCustomer}