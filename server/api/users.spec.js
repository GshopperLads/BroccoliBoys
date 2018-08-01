/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User API routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  const testEmail = 'test@email.com'
  const testUsers = [
    {
      name: 'Steve',
      email: testEmail,
      password: 'passw0rd'
    },
    {
      name: 'Bill',
      email: 'email@test.com',
      password: 'passw0rd1'
    }
  ]

  beforeEach(() => {
    return User.bulkCreate(testUsers)
  })
})
