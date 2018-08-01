/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User API routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  const testEmail = 'test@email.com'
  const testUsers = [{
    name: "Steve",
    email: testEmail,
    password: "passw0rd"
  }, {
    name: "Bill",
    email: "email@test.com",
    password: "passw0rd1"
  }]

  beforeEach(() => {
    return User.bulkCreate(testUsers)
  })

  // describe('GET /api/users/ route functionality', () => {
  //   it('retrieves all users', async () => {
  //     const res = await request(app)
  //       .get('/api/users')
  //       .expect(200)

  //     expect(res.body).to.be.an('array')
  //     expect(res.body[0].email).to.be.equal(testEmail)
  //   })
  // })
  // describe('GET /api/users/:id route functionality', () => {
  //   it('retrieves a single user by id', async () => {
  //     const response = await request(app)
  //       .get('/api/users/2')
  //       .expect(200);
  //     expect(response.body).to.be.an('object')
  //     expect(response.body.id).to.equal(2);
  //   });
  // });
})
