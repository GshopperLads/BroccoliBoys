const User = require('./user')
const Product = require('./product')
const Cart = require("./cart")
const CartItem = require("./cartItem")
const db = require("../db")

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 //put userId on cart
User.hasOne(Cart)

//adds cartId to cartitem
Cart.hasMany(CartItem)


CartItem.belongsTo(Product)
Cart.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Cart, db, Product
}
