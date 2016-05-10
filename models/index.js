const Sequelize = require('sequelize')
const Promise = require('sequelize').Promise
const dbString = 'tripplanner'

if (process.env === 'TEST') dbString = 'tripplanner-test'

const db = new Sequelize('postgres://localhost:5432/' + dbString, {
  logging: false
})

let Place = db.define('place', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
})

let Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  num_stars: {
    type: Sequelize.ENUM,
    values: [1, 2, 3, 4, 5],
    allowNull: false
  },
  amenities: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    get: function () {
      let amenities = this.getDataValue('amenities')
      if (amenities === 'undefined') return []
      else return amenities.join(', ')
    }
  }
})

let Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  age_range: {
    type: Sequelize.STRING
  }
})

let Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpy: true
    }
  },
  cuisine: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    get: function () {
      let cuisine = this.getDataValue('cuisine')
      if (cuisine === 'undefined') return []
      else return cuisine.join(', ')
    }
  },
  price: {
    type: Sequelize.ENUM,
    values: [1, 2, 3, 4, 5],
    allowNull: false
  }
})

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
