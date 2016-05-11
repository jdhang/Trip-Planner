'use strict'

module.exports = function (db, Sequelize) {
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
  }, {
    classMethods: {
      findById: function (id) {
        return this.findOne({ where: { id: id } })
      },
      findByName: function (name) {
        return this.findOne({ where: { name: name } })
      }
    }
  })

  return Activity
}
