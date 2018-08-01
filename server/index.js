const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const sgMail = require('@sendgrid/mail')
const {CartItem, Order} = require('./db/models')
const helmet = require('helmet')

module.exports = app

if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(helmet())

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/checkout', require('./routes'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // client side : generate a token using publishable API key > forward the token to the server > combine token w/ secret API key to charge money via Strip API
  const {stripeKey, stripeSKey} = require('../secrets.js')
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  var stripe = require('stripe')(stripeSKey)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  app.post('/save-stripe-token', (req, res, next) => {
    console.log(req.body.customer)
    CartItem.findAll({
      where: {
        userId: req.body.customer
      }
    })
      .then(response => {
        console.log('first element', response[0])
        response.map(el => {
          console.log(el)
          let actualEl = el.dataValues
          console.log(actualEl)
          Order.create({
            userId: actualEl.userId,
            productId: actualEl.productId,
            quantity: actualEl.quantity
          })
        })
      })
      .catch(err => {
        console.log('Error: ', err)
        res.status(500).send({error: 'Purchased Failed'})
      })

    stripe.customers
      .create({
        email: req.body.email,
        source: req.body.source
      })
      .then(customer =>
        stripe.charges.create({
          amount: req.body.amount,
          description: req.body.description,
          currency: req.body.currency,
          customer: customer.id
        })
      )
      .then(charge => {
        console.log('charge: ', charge)
        const msg = {
          to: req.body.email,
          from: 'info@broccoliboys.com',
          subject: 'Payment is approved - BroccoliBoys!',
          text: `Dear Customer,\r\n\r\nYour purchase is approved.\r\n\r\n\r\n\r\nThank you for purchasing our products!\r\n\r\n\r\n\r\nYou can track your deliveries, and access all broccolies in the world.\r\n\r\nTell us your broccoli preferences. Enjoy.\r\n\r\nThank You!\r\n\r\n\r\n\r\nRegards,\r\n\r\n\r\n\r\n\r\n\r\n BroccoliBoys\r\n\r\n\r\n\r\nhttp://broccoliboys.herokuapp.com\r\n\r\ninfo@broccoliboys.com `
        }
        sgMail.send(msg)

        CartItem.destroy({
          where: {
            userId: req.body.customer
          }
        })
        res.send('Thank for purchasing our product!')
      })
      .catch(err => {
        console.log('Error: ', err)
        res.status(500).send({error: 'Purchased Failed'})
      })
  })

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
