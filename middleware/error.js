const winston = require('winston')



const {combine, timestamp, json, prettyPrint} = winston.format
const logger = winston.createLogger({
  level: 'info',
  format:combine(
    timestamp(),
    json(),
    prettyPrint(),
    winston.format.colorize({all: true})
  ),
  transports:[
    new winston.transports.File({filename: 'vidly.log', level: 'info'}),
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


 const errorHandler=(err, req, res, next)=>{
  logger.error('Something went wrong',err.message)
  res.status(500).send('Inernal Server Error', err.message)
}

module.exports = {errorHandler, logger}
  