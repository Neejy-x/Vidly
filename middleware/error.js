const winston = require('winston')



const {combine, timestamp, json, prettyPrint} = winston.format
const logger = winston.createLogger({
  level: 'error',
  format:combine(
    timestamp(),
    json(),
    prettyPrint()
  ),
  transports:[
    new winston.transports.File({filename: 'vidly.log', level: 'error'}),
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.File({filename: 'exception.log'}),
    new winston.transports.Console()
  ],
  rejectionHandlers: [
    new winston.transports.File({filename: 'rejection.log'}),
    new winston.transports.Console()
  ]
})


module.exports = (err, req, res, next)=>{
  logger.error('Something went wrong',err.message, err.stack)
  res.status(500).send('Inernal Server Error', err.message)
}
  