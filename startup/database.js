const mongoose = require('mongoose')
const{logger} = require('../middleware/error')


module.exports =()=>{
  mongoose.connect('mongodb://localhost/vidly')
  .then(()=>logger.info('Connected to MongoDB...'))
}