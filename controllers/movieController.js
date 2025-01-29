const {Movie} = require('../models/movies')

exports.getMovies = async(req, res)=>{
  try{
    const movies = await Movie.find()
    // .select("-_id -__v -genre._id -genre.__v")

    if(!movies)
      return res.status(404).json({message: "There are no Movies on the Server"})
    res.json(movies)
  }catch(e){
    res.status(500).json({message: "Something went wrong on the server", error: e.message})
  }
}