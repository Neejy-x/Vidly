const {Customer} = require('../models/customer')
const express = require('express')
const router = express.Router()
const {findCustomer} = require('../middleware/findCustomer')
const {validateCustomer} = require('../models/customer')


router.get('/', async(req, res)=>{

    const customers = await Customer.find()
    res.json(customers)

})


router.post('/', async(req, res)=>{
  const {name, phone, age, isGold} = req.body

    const {error} = validateCustomer(req.body)
    if(error)
      return res.status(400).json({message: error.details.map(e=> e.message)})
    const customer = await Customer.create({
      name: name,
      phone: phone,
      age: age,
      isGold: isGold
    })
    res.status(200).json({message: 'Successfully created customer: ', customer})

})

router.delete('/:id', findCustomer, async(req, res)=>{
  const customer = res.customer

    await customer.deleteOne()
    res.status(200).json({message: `Successfully Deleted ${customer.name}` , customer})

})
.get('/:id', findCustomer, async(req, res)=>{
  res.json(res.customer)
})

router.patch('/:id', async(req, res)=>{
  const {name, phone, isGold, age} = req.body

    const customerId = req.params.id
    const customer = await Customer.findById(customerId)
    if(!customer) return res.status(404).json({message: "Unable to find a customer with the given ID"})

    if(name) customer.name = name
    if(phone) customer.phone = phone
    if(isGold) customer.isGold = isGold
    if(age) customer.age = age

    await customer.save()
    res.status(200).json({message: "Successfully Updated customer: ", customer})

})

module.exports = router