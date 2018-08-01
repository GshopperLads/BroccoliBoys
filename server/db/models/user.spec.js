const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
