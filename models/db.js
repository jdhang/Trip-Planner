const Sequelize = require('sequelize')
const Promise = require('sequelize').Promise
const dbString = 'tripplanner'
if (process.env === 'TEST') dbString = 'tripplanner-test'
const db = new Sequelize('postgres://localhost:5432/' + dbString, {
  logging: false
})

module.exports = db
