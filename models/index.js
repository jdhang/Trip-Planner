const Sequelize = require('sequelize')
const Promise = require('sequelize').Promise
const dbString = 'trip-planner'

if (process.env === 'TEST') dbString = 'trip-planner-test'

const db = new Sequelize('postgres://localhost:5432/' + dbString, {
  logging: false
})
