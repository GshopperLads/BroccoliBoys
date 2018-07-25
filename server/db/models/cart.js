const db = require("../db")
const Sequelize = require("sequelize")

const Cart = db.define("cart", {
    products: Sequelize.ARRAY(Sequelize.STRING)
})


module.exports = Cart
