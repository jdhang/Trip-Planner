'use strict'

module.exports = function (db, Sequelize) {

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
  }, {
    classMethods: {
      findById: function (id) {
        return this.findOne({ where: { id: id } })
      }
    },
    instanceMethods: {
      findSimilarState: function () {
        return Place.findAll({
          where: {
            id: {
              $ne: this.id
            },
            state: this.state
          }
        })
      }
    }
  })

  return Place
}

