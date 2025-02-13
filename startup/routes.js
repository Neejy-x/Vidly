const express = require('express')
const movies = require('../routes/movies')
const genres = require('../routes/genres')
const customers = require('../routes/customer')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const {errorHandler} = require('../middleware/error')


module.exports = (app)=>{
  app.use(express.json())
  app.use(express.static('public'))
  app.use('/api/movies', movies)
  app.use('/api/genres/', genres)
  app.use('/api/customers', customers)
  app.use('/api/rentals', rentals)
  app.use('/api/users/', users)
  app.use('/api/auth', auth)
  app.use(errorHandler)
  
}
