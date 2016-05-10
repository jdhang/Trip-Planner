'use strict'

module.exports = function (db, Sequelize) {

  let Restaurant = db.define('restaurant', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cuisine: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      get: function () {
        let cuisine = this.getDataValue('cuisine')
        if (cuisine === 'undefined') return []
        else return cuisine.join(', ')
      },
      set: function (cuisines) {
        cuisines = cuisines.split(/\s+,\s+/g)
        console.log(cuisines)
        this.setDataValue('cuisine', cuisines)
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        betweenRange: function (value) {
          if (value < 1 || value > 5)
            throw new Error('Value must be between 1 and 5')
        }
      }
    }
  }, {
    classMethods: {
      findById: function (id) {
        return this.findOne({ where: { id: id } })
      },
      findByName: function (name) {
        return this.findOne({ where: { name: name } })
      }
    },
    instanceMethods: {
      findSamePriceRange: function () {
        return Restaurant.findAll({
          where: {
            id: {
              $ne: this.id
            },
            price: this.price
          }
        })
      },
      findSimilarCuisine: function () {
        return Restaurant.findAll({
          where: {
            id: {
              $ne: this.id
            },
            cuisine: {
              $contains: this.cuisine.split(', ')
            }
          }
        })
      }
    }
  })

  return Restaurant
}
