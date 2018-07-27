/* global describe beforeEach afterEach it */

const { expect } = require('chai')
// const { me, logout } = require("./user")
const { db, User } = require("../../server/db/models")

// import { expect } from 'chai'
// import { me, logout } from './user'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = { user: {} }

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = { email: 'Cody' }
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].user).to.be.deep.equal(fakeUser)
//     })
//   })

//   describe('logout', () => {
//     it('logout: eventually dispatches the REMOVE_USER action', async () => {
//       mockAxios.onPost('/auth/logout').replyOnce(204)
//       await store.dispatch(logout())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('REMOVE_USER')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })
// })

/* eslint-env mocha, chai */
describe('UserStore', () => {
  beforeEach(() => db.sync({ force: true }))

  describe('column definitions and validations', () => {
    it('has a `name`, `password`, `email`', async () => {

      const user = await User.create({
        name: 'Cody',
        password: "thepassword",
        email: "alan@gmail.com",
      })

      expect(user.name).to.equal('Cody')
      expect(user.password).to.equal("thepassword")
      expect(user.email).to.equal("alan@gmail.com")
    })

    
    it('`name` is required', () => {
      const user = User.build()
      return user.validate()
        .then(
          () => {
            throw new Error('Validation should have failed!')
          },
          (err) => {
            expect(err).to.be.an('error')
          }
        )
    })
  })
})


    // Make sure that you define the associations in `server/models/index.js`!
    // Note: be careful - the pluralization is important here!

    // describe('hooks', () => {
    //   it('capitalizes a user\'s name before saving it to the database', async () => {
    //     const user = await User.create({ name: 'joe' })

    //     expect(user.name).to.equal('Joe')

    //     const updatedUser = await user.update({ name: 'joey' })

    //     expect(updatedUser.name).to.equal('Joey')
    //   })
    // })
  // it('has a one-many relationship with Product, via `favoriteCoffee`', async () => {
  //   const user = await User.create({ name: 'Joe' })
  //   const coffee = await Coffee.create({
  //     name: 'Puppaccino',
  //     ingredients: ['espresso', 'frothed milk', 'love']
  //   })

  //   await user.setFavoriteCoffee(coffee)

  //   expect(user.favoriteCoffeeId).to.be.equal(coffee.id)
  // })