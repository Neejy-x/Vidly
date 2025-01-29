const {Customer} = require('../models/customer')


exports.findCustomer = async(req, res, next)=>{
  let customer
  try{
    const {id} = req.params
     customer = await Customer.findById(id)
    if(!customer)
      return res.status(404).json({message: 'Unabble to find a customer with the given ID'})
  }catch(e){
    return res.status(500).json({message: 'internal Server Error: ', error: e.message })
  }
  res.customer = customer
  next()
}