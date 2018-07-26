'use strict';

// Assertions
const chai = require('chai');
const expect = chai.expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

// Product Model
const { Product, db, User } = require('../db/models')

// Product Routes
const app = require('../index')
const agent = require('supertest')(app);



describe('Products routes', () => {
    let storedProducts;
    let storedUsers;

    const productData = [
        {
            name: 'Grace Shopper',
            imageUrl: "asdf",
            price: 8.0,
            description: "broccoli is fresh",
            quantity: 10
        }
    ];
    const userData = [
        {
            name: "Alan",
            password: "passwordthesafest",
            email: "alanyoh@gmail.com"
        },
        {
            name: "Sarah",
            password: "passwordthesafestevensafest",
            email: "sarah@gmail.com"
        }
    ]

    beforeEach(async () => {

        db.sync({ force: true })
        const createdProducts = await Product.bulkCreate(productData);
        storedProducts = createdProducts.map(product => product.dataValues);
        const createdUsers = await User.bulkCreate(userData);
        storedUsers = createdUsers.map(user => user.dataValues);
    });

    describe('GET /api/products', () => {
        it('serves up all products', async () => {
            const response = await agent
                .get('/api/products')
                .expect(200);
            expect(response.body).to.have.length(1);
            expect(response.body[0].name).to.equal(storedProducts[0].name);
        });
    });

    describe('GET /api/products/:id', () => {
        it('serves up a single Product by its id', async () => {
            const response = await agent
                .get('/api/products/1')
                .expect(200);
            expect(response.body.name).to.equal('Grace Hopper');
        });
    });
    describe('POST /products/ route', () => {
        it('should create a product', async () => {
            const response = await agent.post('/api/products/')
                .send({
                    name: 'Posted Grace Shopper',
                    imageUrl: "asdf",
                    price: 8.0,
                    description: "broccoli is fresh",
                    quantity: 10
                })
                .expect(201);
            const createdCampus = await Campus.findById(response.body.id);
            expect(createdCampus.name).to.be.equal('Posted Grace Shopper');
        });
    });
});




