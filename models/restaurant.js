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
  })

  return Restaurant
}
