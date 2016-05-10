const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const swig = require('swig')
const sass = require('node-sass-middleware')
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
app.use(express.static(path.join(__dirname, './bower_components')))

// server logging
app.use(logger('dev'))

app.use(router)

// sass handling
app.use(
  sass({
    src: __dirname + '/assets', // where sass file are
    dest: __dirname + '/public', // where css should go
    debug: true
  })
)

// error catching
// catch 404, no routes
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// handle all errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.error(err)
  res.render('error', { err })
})
