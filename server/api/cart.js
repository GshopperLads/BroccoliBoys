const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

//Retrieve all carts, but there's only one 
router.get('/', async (req, res, next) => {
    try {
        const cart = await Cart.findAll({})
        res.json(cart[0])
    } catch (err) {
        next(err)
    }
})

