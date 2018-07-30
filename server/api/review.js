const router = require('express').Router()
const {Review, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: User}]
    })
    res.status(200).json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
    res.status(200).json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create({
      rating: req.body.rating,
      content: req.body.content,
      productId: req.body.productId,
      userId: req.body.userId
    })
    res.status(201).json(newReview)
  } catch (err) {
    next(err)
  }
})
