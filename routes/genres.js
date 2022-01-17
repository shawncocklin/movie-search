const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')


// all genres route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const genres = await Genre.find(searchOptions)
  res.render('genres/index', { genres: genres, searchOptions: req.query })

  } catch {
    res.redirect('/')
  }
  
})

// new genre route
router.get('/new', (req, res) => {
  res.render('genres/new', { genre: new Genre() })
})

// create genre route
router.post('/', async (req, res)=> {
  const genre = new Genre({
    name: req.body.name,
  })

  try {
    const newGenre = await genre.save()
    // res.redirect(`genres/${newGenre.id}`)
    res.redirect(`genres`)
  } catch {
    res.render('genres/new', {
      genre: genre,
      errorMessage: 'Error creating genre'
    })
  }
})




module.exports = router