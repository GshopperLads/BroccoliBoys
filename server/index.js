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
const sgMail = require('@sendgrid/mail');
const {CartItem} = require('./db/models')
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
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

  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:



  const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr })
    } else {
      res.status(200).send({ success: stripeRes })
    }
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  app.post('/save-stripe-token', (req, res, next) => {
      console.log(req.body)
      // stripe.charges.create(req.body, postStripeCharge(res))

      stripe.customers.create({
        email: req.body.email, // need to get data from somewhere
        source: req.body.source,
      })
      .then(customer => stripe.charges.create({
        amount: req.body.amount,
        description: req.body.description,
        currency: req.body.currency,
        customer: customer.id
      }))
      .then(charge => {
        console.log("charge: ", charge)
        const msg = {
          to: req.body.email,
          from: 'info@broccoliboys.com',
          subject: 'Payment is approved - BroccoliBoys!',
          text: `Dear Customer,\r\n\r\nYour purchase is approved.\r\n\r\n\r\n\r\nThank you for purchasing our products!\r\n\r\n\r\n\r\nYou can track your deliveries, and access all broccolies in the world.\r\n\r\nTell us your broccoli preferences. Enjoy.\r\n\r\nThank You!\r\n\r\n\r\n\r\nRegards,\r\n\r\n\r\n\r\n\r\n\r\n BroccoliBoys\r\n\r\n\r\n\r\nhttp://broccoliboys.herokuapp.com\r\n\r\ninfo@broccoliboys.com `,
        };
        sgMail.send(msg);

        CartItem.destroy({
          where: {
            userId: req.body.customer
          }
        })
        console.log("delete everything... ")
        res.send(charge)
      })
      .catch(err => {
        console.log("Error: ", err)
        res.status(500).send({error: "Purchased Failed"})
      })
  })


  const checkingUser = () => {

  }


  // const charge = stripe.charges.create({
  //   amount: 999,
  //   currency: 'usd',
  //   description: 'Example charge',
  //   source: token,
  // });

  // stripe.charges.retrieve("ch_1Cu0yQAd7n2dX73XK184ks1t", { stripeKey });

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
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
