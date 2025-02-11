const jwt = require('jsonwebtoken')


module.exports = (req, res, next)=>{
const token = req.headers['x-auth-token']
if(!token) return res.status(401).send('Access Denied. No Token Provided')

try{
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  req.user = decoded
  next()
}catch(ex){
  res.status(401).send("Invalide token")
}
}

