const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Product}, {model: User}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
