const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
const sgMail = require('@sendgrid/mail');

module.exports = router


router.get('testing', (req, res, next) => {
  try {

    res.send("testing.sdfkafldsklfdas;lkfldsakfl;dskfl;dsklfkdsal;fkdlsfks\r\n\r\ndsfakfklksadlkdsl .... ")
  } catch (err) {
    next(err)
  }
})
