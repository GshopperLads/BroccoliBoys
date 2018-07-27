const router = require('express').Router()
const { Cart, CartItem } = require('../db/models')
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

//Find cart by Id
router.get('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.id)
        res.json(cart)
    } catch (err) {
        next(err)
    }
})

//ADD PRODUCT TO CART
router.put('/:productId', async (req, res, next) => {
    try {
        console.log(req.body)
        const newCartItem = await CartItem.create({
            where: {
                cartId: req.body,
                productId: req.params.productId
            }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
})

