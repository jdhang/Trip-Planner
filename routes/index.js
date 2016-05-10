const router = require('express').Router()
const models = require('../models')
const Place = models.Place
const Activity = models.Activity
const Restaurant = models.Restaurant
const Hotel = models.Hotel

module.exports = router

router.get('/', function (req, res, next) {
  var hotels
  var restaurants
  var activities
  Hotel.findAll()
  .then(function (hotelsArr) {
    hotels = hotelsArr
    return Restaurant.findAll()
  })
  .then(function (restaurantsArr) {
    restaurants = restaurantsArr
    return Activity.findAll()
  })
  .then(function (activities) {
    res.render('index', {
      hotels,
      restaurants,
      activities
    })
  })
  .catch(next)
})
