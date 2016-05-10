const Promise = require('sequelize').Promise
const router = require('express').Router()
const models = require('../models')
const Place = models.Place
const Activity = models.Activity
const Restaurant = models.Restaurant
const Hotel = models.Hotel

module.exports = router

// router.get('/', function (req, res, next) {
//   res.render('index')
// })

router.get('/', function (req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function (hotels, restaurants, activities) {
    res.render('index2', {
      hotels,
      restaurants,
      activities
    })
  })
  .catch(next)
})

router.post('/addHotel', function (req, res, next) {
  Hotel.findById(req.body.hotelId)
  .then(function (hotel) {
    res.json(hotel)
  })
  .catch(next)
})

router.post('/addRestaurant', function (req, res, next) {
  Restaurant.findById(req.body.restaurantId)
  .then(function (restaurant) {
    res.json(restaurant)
  })
  .catch(next)
})

router.post('/addActivity', function (req, res, next) {
  Activity.findById(req.body.activityId)
  .then(function (activity) {
    res.json(activity)
  })
  .catch(next)
})
