const {Movie} = require('../models/movies')


const findMovie = async (req, res, next)=>{
  let movie;
  try{
    const {id} = req.params
    movie = await Movie.findById(id)
    if(!movie)
      return res.status(404).json({message: 'There is no Movie with the given ID'})

  }catch(e){
    return res.status(500).json({message: "Something Happened on the Server", error: e.message})
  }
  res.movie = movie
  next()
}

module.exports = findMovie