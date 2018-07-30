const User = require('./user')
const Product = require('./product')
const Cart = require("./cart")
const Review = require("./review")
const Order = require('./order')

const db = require("../db")

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasOne(Cart)
Cart.hasMany(Product)

Product.belongsTo(Cart)
Cart.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsTo(Product)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Cart, db, Product, Review, Order
}

