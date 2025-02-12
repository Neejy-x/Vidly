module.exports = (err, req, res, next)=>{

  console.error(err.message, err.stack)
  res.status(500).send('Something went wrong')
}