const Sequelize = require('sequelize')

const sequelize = require('../helpers/database')

const CartItem = sequelize.define('CartItem', {
  id: {
    type: Sequelize.STRING,
    autoIcrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
})

module.exports = CartItem