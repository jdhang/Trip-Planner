const Promise = require('sequelize').Promise
const router = require('express').Router()
const models = require('../models')
const Place = models.Place
const Activity = models.Activity
const Restaurant = models.Restaurant
const Hotel = models.Hotel

module.exports = router

router.get('/', function (req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function (hotels, restaurants, activities) {
    res.render('index', {
      hotels,
      restaurants,
      activities
    })
  })
  .catch(next)
})
