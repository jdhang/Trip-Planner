const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const swig = require('swig')
const logger = require('morgan')
const router = require('./routes')
const app = express()

// export express app
module.exports = app

// set up view engine
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './views'))
swig.setDefaults({ cache: false })

// set up parsing ofr request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// set up static handling
app.use(express.static(path.join(__dirname, './public')))

// server logging
app.use(logger('dev'))

app.use('/', function (req, res, next) {
  res.send('Hello world!')
})

// error catching
app.use(function (err, req, res, next) {
  console.err(err.stack)
  res.status(500).send(err.message)
})
