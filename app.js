const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const swig = require('swig')
const logger = require('morgan')
const router = require('./routes')
const models = require('./models')
const app = express()
const PORT = 3000

// set up view engine
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './views'))

// set up parsing ofr request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// set up static handling
app.use(express.static(path.join(__dirname, './public')))

// server logging
app.use(logger('dev'))

app.listen(PORT, function (err) {
  if (err) console.error(err)
  console.log('Sever listening on port', PORT)
})

app.use('/', function (req, res, next) {
  res.send('Hello world!')
})
