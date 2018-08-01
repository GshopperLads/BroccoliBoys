const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const CartItem = require('./cartItem')
const Review = require('./review')
const Order = require('./order')

const db = require('../db')

//put userId on cart
User.hasOne(Cart)

//adds cartId to cartitem
// Cart.hasMany(CartItem, {as: 'Items'})
Cart.belongsTo(User)

CartItem.belongsTo(Product)
CartItem.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsTo(Product)

module.exports = {
  User,
  Cart,
  db,
  Product,
  CartItem,
  Review,
  Order
}
