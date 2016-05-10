'use strict'

const Sequelize = require('sequelize')
const db = require('./db')
const Place = require('./place')(db, Sequelize)
const Hotel = require('./hotel')(db, Sequelize)
const Restaurant = require('./restaurant')(db, Sequelize)
const Activity = require('./activity')(db, Sequelize)

// Associations
Hotel.belongsTo(Place)
Activity.belongsTo(Place)
Restaurant.belongsTo(Place)

module.exports = {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant
}
