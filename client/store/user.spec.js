const {expect} = require('chai')
const {db, User} = require('../../server/db/models')

describe('User model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `name`, `password`, `email`', async () => {
      const user = await User.create({
        name: 'Cody',
        password: 'thepassword',
        email: 'alan@gmail.com'
      })

      expect(user.name).to.equal('Cody')
      expect(user.email).to.equal('alan@gmail.com')
    })

    it('`name` is required', () => {
      const user = User.build()
      return user.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
