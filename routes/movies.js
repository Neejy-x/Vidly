const express = require('express')
const findMovie = require('../middleware/findMovie')
const {Movie} = require('../models/movies')
const {Genre} = require('../models/genre')
const {getMovies} = require('../controllers/movieController')
const {validateMovie} = require('../models/movies')
const router = express.Router()


router.post('/', async (req, res)=>{
  const {genreId, numberInStock, dailyRentalRate} = req.body
  try{

    const {error} = validateMovie(req.body)
    if(error) return res.status(400).send(error.details.map(err=>err.message))

    const genre= await Genre.findById(genreId)
    if(!genre)
      return res.status(404).json({message: 'Unable to find a Genre with the given ID'})

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate
  })
movie = await movie.save()
res.json(movie)

}catch(e){
    console.log(e.message)
  }
})
.get('/', getMovies)



router.get('/:id', findMovie, async(req, res)=>{
  res.status(200).json(res.movie)
})


.patch('/:id', findMovie, async(req, res)=>{
  const {title, genreId, numberInStock, dailyRentalRate} = req.body
  
  try{
    const movie = res.movie

    if(title) movie.title = title
    if(genreId) {
      const genre= await Genre.findById(genreId)
      if(!genre)
        return res.status(404).json({message: 'Unable to find a Genre with the given ID'})
      movie.genre._id = genre._id}
    if(numberInStock) movie.numberInStock = numberInStock
    if(dailyRentalRate) movie.dailyRentalRate = dailyRentalRate
   await  movie.save()
    res.json(movie)
  }catch(e){
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }
})

.delete('/:id', findMovie, async(req, res)=>{
  const movie = res.movie
  try{
    await movie.deleteOne()
    res.json({message: "Movie Deleted", movie})
  }catch(e){
    res.status(500).json({message: "Internal Server Error", error: e.message})
  }
})
module.exports = router