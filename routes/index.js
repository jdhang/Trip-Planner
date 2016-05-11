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

router.get('/hotels', function (req, res, next) {
  Hotel.findAll({
    include: [{
      model: Place
    }],
    limit: 10
  })
  .then(function (hotels) {
    res.render('hotels', {
      hotel: hotels[0],
      hotels
    })
  })
  .catch(next)
})

router.get('/restaurants', function (req, res, next) {
  Restaurant.findAll({
    include: [{
      model: Place
    }],
    limit: 10
  })
  .then(function (restaurants) {
    res.render('restaurants', {
      restaurant: restaurants[0],
      restaurants
    })
  })
  .catch(next)
})

router.get('/activities', function (req, res, next) {
  Activity.findAll({
    include: [{
      model: Place
    }],
    limit: 10
  })
  .then(function (activities) {
    res.render('activities', {
      activity: activities[0],
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
