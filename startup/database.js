const mongoose = require('mongoose')


module.exports =()=>{
  mongoose.connect('mongodb://localhost/vidly')
  .then(()=>console.log('Connected to MongoDB...'))
  .catch((e)=> console.error('Error Connecting to MongoDB...', e.message))
}