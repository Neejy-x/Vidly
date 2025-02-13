const express = require('express')
const app = express()
const {logger} = require('./middleware/error')

require('./startup/database')()
require('express-async-errors')
require('./startup/routes')(app)
require('dotenv').config()


const PORT = 3110

app.get('/', (req, res)=>{  
})

app.listen(PORT, ()=>{
  logger.info(`Server is running on PORT ${PORT}...`)
})