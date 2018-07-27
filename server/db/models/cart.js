const db = require("../db")
const Sequelize = require("sequelize")

const Cart = db.define("cart", {
    quantity: Sequelize.INTEGER
})


module.exports = Cart
