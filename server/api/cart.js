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
        const cart = await Cart.findOne({
            where: {
                id: req.params.id
                // },
                // include: [
                //     {model: CartItem ,as:'Items', where: {
                //         cartId: req.params.id
                //     }}
                // ]
            }
        })
        res.json(cart)
    } catch (err) {
        next(err)
    }
})

router.post('/:userId', async (req, res, next) => {
    try {
        const cart = await Cart.create({ userId: req.params.userId })
        res.json(cart)
    } catch (err) {
        next(err)
    }
})

// //ADD PRODUCT TO CART
// router.put('/:productId', async (req, res, next) => {
//     try {
//         const { dataValues } = await CartItem.create({
//             cartId: req.body.cartId,
//             quantity: 1,
//             productId: req.params.productId

//         })
//         res.send(dataValues)
//     } catch (err) {
//         next(err)
//     }
// })

router.put('/create')
