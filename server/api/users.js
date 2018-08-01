const router = require('express').Router()
const {User} = require('../db/models')
const sgMail = require('@sendgrid/mail')

module.exports = router

router.put('/', async (req, res, next) => {
  try {
    if (req.body.security === true) {
      const users = await User.findAll({
        attributes: ['id', 'email', 'address', 'name']
      })
      res.json(users)
    } else {
      res.send('No Access')
    }
  } catch (err) {
    next(err)
  }
})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
router.post('/email', (req, res, next) => {
  try {
    const msg = {
      to: req.body.email,
      from: 'feelpnw@gmail.com',
      subject: 'Welcome to BroccoliBoys!',
      text: `Dear ${
        req.body.name
      },\r\n\r\nWelcome to BroccoliBoys!\r\n\r\nChoose Your Broccoli. We are ready to serve you\r\n\r\nYou can track your deliveries, and access all broccolies in the world.\r\n\r\nTell us your broccoli preferences. Enjoy.\r\n\r\nThank You!\r\n\r\n\r\n\r\nRegards,\r\n\r\n\r\n\r\n\r\n\r\n BroccoliBoys\r\n\r\n\r\n\r\nhttp://broccoliboys.herokuapp.com\r\n\r\ninfo@broccoliboys.com `
    }
    sgMail.send(msg)
    res.send('email page.... ')
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (req.body.security === true) {
      const user = await User.findById(req.params.id, {
        attributes: ['id', 'email']
      })
      res.status(200).json(user)
    } else {
      res.send('No Access')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    if (req.body.security === true) {
      const result = await User.update(
        {
          name: req.body.name,
          address: req.body.address,
          email: req.body.email
        },
        {
          returning: true,
          where: {
            id: req.params.userId
          }
        }
      )
      res.status(200).json(result[1])
    } else {
      res.send('No Access')
    }
  } catch (err) {
    next(err)
  }
})
