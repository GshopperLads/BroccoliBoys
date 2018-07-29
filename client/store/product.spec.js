const { expect } = require('chai')

const { Product, db } = require("../../server/db/models/index")
describe('Product model', () => {
    beforeEach(() => db.sync({ force: true }))
    const testProduct = {
        name: 'Broccoli',
        imageUrl: "https://cdn1.medicalnewstoday.com/content/images/headlines/266/266765/two-heads-of-broccoli.jpg",
        price: 8.0,
        description: "broccoli is fresh",
        quantity: 0
    }

    describe('column definitions and validations', () => {
        it('has a `name`, `imageUrl`, `price`, `description`, `quantity`', async () => {
            const product = await Product.create(testProduct)
            expect(product.name).to.equal('Broccoli')
            expect(product.imageUrl).to.equal("https://cdn1.medicalnewstoday.com/content/images/headlines/266/266765/two-heads-of-broccoli.jpg")
            expect(product.price).to.equal(8.0)
            expect(product.description).to.equal("broccoli is fresh")
            expect(product.quantity).to.equal(0)
        })

        it('`name` is required', () => {
            const product = Product.build({
                name: '',
                imageUrl: "https://cdn1.medicalnewstoday.com/content/images/headlines/266/266765/two-heads-of-broccoli.jpg",
                price: 8.0,
                description: "broccoli is fresh",
                quantity: 0
            })
            return product.validate()
                .then(
                    () => {
                        throw new Error('Validation should have failed!')
                    },
                    (err) => {
                        expect(err).to.be.an('error')
                    }
                )
        })
        it('`imageUrl` is required', () => {
            const product = Product.build({
                name: 'Broccoli',
                imageUrl: "",
                price: 8.0,
                description: "broccoli is fresh",
                quantity: 0
            })
            return product.validate()
                .then(
                    () => {
                        throw new Error('Validation should have failed!')
                    },
                    (err) => {
                        expect(err).to.be.an('error')
                    }
                )
        })
        it('`price` is required', () => {
            const product = Product.build({
                name: 'Broccoli',
                imageUrl: "https://cdn1.medicalnewstoday.com/content/images/headlines/266/266765/two-heads-of-broccoli.jpg",
                price: "",
                description: "broccoli is fresh",
                quantity: 0
            })
            return product.validate()
                .then(
                    () => {
                        throw new Error('Validation should have failed!')
                    },
                    (err) => {
                        expect(err).to.be.an('error')
                    }
                )
        })
        it('`quantity` is required', () => {
            const product = Product.build({
                name: 'Broccoli',
                imageUrl: "https://cdn1.medicalnewstoday.com/content/images/headlines/266/266765/two-heads-of-broccoli.jpg",
                price: 8.0,
                description: "broccoli is fresh",
                quantity: ""
            })
            return product.validate()
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