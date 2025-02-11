const express = require('express')
const app = express()
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const movies = require('./routes/movies')
const genres = require('./routes/genres')
const customers = require('./routes/customer')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
require('dotenv').config()





// if(!process.env.ACCESS_TOKEN_SECRET){
//   console.error('FATAL ERROR: jwtPrivateKey not defined..')
//   process.exit(1)
// }

mongoose.connect('mongodb://localhost/vidly')
  .then(()=>console.log('Connected to MongoDB...'))

  
  .catch((e)=> console.error('Error Connecting to MongoDB...', e.message))


app.use(express.json())
app.use(express.static('public'))
app.use('/api/movies', movies)
app.use('/api/genres/', genres)
app.use('/api/customers', customers)
app.use('/api/rentals', rentals)
app.use('/api/users/', users)
app.use('/api/auth', auth)


const PORT = 3110



app.get('/', (req, res)=>{
  
})

app.listen(PORT, ()=>{
  console.log(`Server is running on PORT ${PORT}...`)
})