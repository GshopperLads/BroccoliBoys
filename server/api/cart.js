const router = require('express').Router()
const { CartItem, Product } = require('../db/models')
module.exports = router

//Retrieve all carts, but there's only one
router.get('/', async (req, res, next) => {
  try {
    const cart = await CartItem.findAll({})
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})



// using
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await CartItem.findAll({
      where: {
        userId: req.params.userId
      }, include: [{ model: Product }]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// using
router.post('/quantity', async (req, res, next) => {
  try {
    console.log("quantity post .... ")
    const newQuantity = Number(req.body.currentQuantity) + Number(req.body.variation)
    const [updateRowCount, updateCart] = await CartItem.update({
      quantity: newQuantity
    }, {
        where: {
          id: req.body.cartId
        }
      })
    res.status(200).json(updateCart)
    // res.status(200).json("testing")

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

// using
router.put('/add', async (req, res, next) => {
  try {
    const [cart, oldCart] = await CartItem.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: 1
      },
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await CartItem.destroy({ where: { id: req.params.id } })
    res.send(200)
  } catch (err) {
    next(err)
  }
})
