const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'address']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//get single user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      attributes: ['id', 'email']
    })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    console.log("user put working .updatedUser... ")
    const [updatedRowCount, updatedUser] = await User.update({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email
    }, {
      where: {
        id: req.params.userId
      }
    })
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
})
