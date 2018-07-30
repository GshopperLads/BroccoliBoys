const router = require('express').Router()
// const { Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  res.send("payment main! ")
})




// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_live_JLX9jUOR5APxhEICsh7Ynqj4");

// // Token is created using Checkout or Elements!
// // Get the payment token ID submitted by the form:
// const token = request.body.stripeToken; // Using Express

// const charge = stripe.charges.create({
//   amount: 999,
//   currency: 'usd',
//   description: 'Example charge',
//   source: token,
// });
