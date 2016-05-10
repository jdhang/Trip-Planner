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
  })

  return Activity
}
