const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

//get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.status(200).json(products);

    } catch (error) { next(error) }

})

//get single product
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) { next(error) }
})

//post a product
router.post('/', async (req, res, next) => {
    try {
        const product = await Product.create(req.body)
        res.status(204).json(product)
    } catch (err) {
        next(err)
    }
})

//update a product 

router.put('/:id', async (req, res, next) => {
    try {
        await Product.update(req.body, { where: { id: req.params.id } })
        res.status(200)
    } catch (err) {
        next(err)
    }
})

//delete a product
router.delete('/:id', async (req, res, next) => {
    try {
        await Product.destroy({ where: { id: req.params.id } })
        res.status(200)
    } catch (err) {
        next(err)
    }
})