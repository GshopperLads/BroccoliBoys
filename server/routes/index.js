const router = require('express').Router()

module.exports = router

router.get('testing', (req, res, next) => {
  try {
    res.send(
      'testing..... '
    )
  } catch (err) {
    next(err)
  }
})
