const http = require('http')
const server = http.createServer()
const models = require('./models')
const Promise = require('sequelize').Promise
const app = require('./app')
const PORT = 3000;

server.on('request', app)

Promise.all([
])
.then(function () {
  server.listen(PORT, function () {
    console.log('Server listening on PORT', PORT)
  })
})
.catch(console.error)
