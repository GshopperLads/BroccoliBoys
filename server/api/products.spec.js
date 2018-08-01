const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('PRODUCT API ROUTES', () => {
  let storedProducts
  const productData = [
    {
      name: 'Call me Flower',
      imageUrl: 'asdf',
      price: 8.0,
      description: 'colli is fresh',
      quantity: 10
    },
    {
      name: 'Broccoli',
      imageUrl: 'picOfBroccoli',
      price: 9.0,
      description: 'broccoli is fresh',
      quantity: 8
    }
  ]
  beforeEach(async () => {
    return db.sync({force: true})
  })
  beforeEach(async () => {
    const createdProducts = await Product.bulkCreate(productData)
    storedProducts = createdProducts.map(product => product.dataValues)
  })

  describe('Retrieve all products route functionality', () => {
    it('retrieves all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[1].name).to.equal(storedProducts[1].name)
    })
  })

  describe('Retrieve single product route functionality', () => {
    it('retrieves a single product by id', async () => {
      const response = await request(app)
        .get('/api/products/2')
        .expect(200)
      expect(response.body.name).to.equal('Broccoli')
    })
  })
  describe('Add single product route functionality', () => {
    it('adds a new product', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({
          name: 'Cheese',
          imageUrl: 'picOfCheese',
          price: 90.0,
          description: "Cheese definitely isn't broccoli",
          quantity: 9
        })
        .expect(201)
      expect(response.body).to.be.an('object')
      expect(response.body.name).to.equal('Cheese')
      expect(response.body.id).to.equal(3)
    })
  })
  describe('Update single product route functionality', () => {
    it('updates an existing product', async () => {
      await request(app)
        .put('/api/products/1')
        .send({
          name: 'Cauliflower',
          imageUrl: 'picOfCauliflower',
          price: 1.0,
          description: 'This is how to properly spell cauliflower',
          quantity: 3
        })
        .expect(200)
      const response = await request(app)
        .get('/api/products/1')
        .expect(200)
      expect(response.body.name).to.not.equal('Call me Flower')
      expect(response.body.name).to.equal('Cauliflower')
    })
  })
  describe('Remove single product route functionality', () => {
    it('deletes an existing product', async () => {
      request(app)
        .delete('/api/products/1')
        .expect(200)
        .end()
      const response = await request(app)
        .get('/api/products')
        .expect(200)
      expect(response.body).to.have.length(1)
      expect(response.body[0].id).to.not.equal(1)
    })
  })
})
