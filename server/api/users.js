const router = require('express').Router()
const { User } = require('../db/models')
const sgMail = require('@sendgrid/mail');

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

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
router.post('/email', (req, res, next) => {
  try {

    const msg = {
      to: req.body.email,
      from: 'feelpnw@gmail.com',
      subject: 'Welcome to BroccoliBoys!',
      text: `Dear ${req.body.name},\r\n\r\nWelcome to BroccoliBoys!\r\n\r\nChoose Your Broccoli. We are ready to serve you\r\n\r\nYou can track your deliveries, and access all broccolies in the world.\r\n\r\nTell us your broccoli preferences. Enjoy.\r\n\r\nThank You!\r\n\r\n\r\n\r\nRegards,\r\n\r\n\r\n\r\n\r\n\r\n BroccoliBoys\r\n\r\n\r\n\r\nhttp://broccoliboys.herokuapp.com\r\n\r\ninfo@broccoliboys.com `,
    };
    console.log(msg)
    sgMail.send(msg);

    res.send("email page.... ")
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

