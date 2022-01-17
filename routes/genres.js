const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')


// all genres route
router.get('/', (req, res) => {
  res.render('genres/index')
})

// new genre route
router.get('/new', (req, res) => {
  res.render('genres/new', { genre: new Genre() })
})

// create genre route
router.post('/', (req, res)=> {
  res.send('Create')
})




module.exports = router