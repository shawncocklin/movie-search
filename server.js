// check if we are in the dev environment
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const PORT = 3000
const indexRouter = require('./routes/index')

// set routes for views
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// tells app what layouts to use and set the root router
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

// connecting app to mongoDb database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))



app.listen(process.env.PORT || PORT)