const express = require('express')
const router = express.Router()
const {validateRental, Rental} = require('../models/rentals')
const {Movie} = require('../models/movies')
const {Customer} = require('../models/customer')



router.get('/', async(req, res)=>{
  try{const rentals = await Rental.find()
  res.json(rentals)
}catch(e){
  next(e)
}})


.post('/', async(req, res)=>{
  const {customerId, movieId, dateOut} = req.body

    const {error} = validateRental(req.body)
    if(error) return res.status(400).send(error.details.map(err=> err.message))
    
      const customer = await Customer.findById(customerId)
      if(!customer) return res.status(404).json({message: "There is no customer with the givwn ID"})
      
      const movie = await Movie.findById(movieId)
      if(!movie) return res.status(404).json({message: 'There is no Movie with the given ID'})
      if(movie.numberInStock === 0) return res.status(400).json({message: "The Movie is currently not in Stock"})

        
      const rental = new Rental({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone,
          isGold: customer.isGold
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: dateOut,
        dateReturned: null,
        rentalFee: 0
      })

      await rental.save()

      movie.numberInStock --
      movie.save()
      res.status(200).json({message: 'Successfully created a Rental', rental})

})

module.exports = router