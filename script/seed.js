'use strict'

const db = require('../server/db')
const {User, Cart, Product, Review, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({
      name: 'Admin',
      email: 'admin@broccoliboys.com',
      password: '1234'
    }),
    User.create({
      name: 'cody',
      email: 'cody@email.com',
      password: '123',
      address: '47 W 13th St, New York, NY 10011, USA'
    }),
    User.create({
      name: 'murph',
      email: 'murphy@email.com',
      password: '123',
      address: '1 E 2nd St, New York, NY 10003, USA'
    }),
    User.create({
      name: 'Ted',
      email: 'ted@email.com',
      password: '123',
      address: '47 W 13th St, New York, NY 10011, USA'
    }),
    User.create({
      name: 'Darcy',
      email: 'Darcy@email.com',
      password: '123',
      address: '1 E 2nd St, New York, NY 10003, USA'
    }),
    User.create({
      name: 'John',
      email: 'J123@email.com',
      password: '123',
      address: 'Metrotech Center, Brooklyn, NY 11201, USA'
    }),
    User.create({
      name: 'Liam',
      email: 'li111@email.com',
      password: '123',
      address: '838 Broadway, New York, NY 10003, USA'
    }),
    User.create({
      name: 'Kate',
      email: '8665@email.com',
      password: '123',
      address: '47 W 13th St, New York, NY 10011, USA'
    }),
    User.create({
      name: 'Luther',
      email: 'dreamw@email.com',
      password: '123',
      address: '33 3rd Ave, New York, NY 10003, USA'
    }),
    User.create({
      name: 'Jeane',
      email: 'jqw@email.com',
      password: '123',
      address: '29 Washington Pl, New York, NY 10003, USA'
    }),
    User.create({
      name: 'Paul',
      email: 'heit@email.com',
      password: '123',
      address: '1 E 2nd St, New York, NY 10003, USA'
    })
  ])

  const carts = await Promise.all([
    Cart.create({userId: 1}),
    Cart.create({userId: 2}),
    Cart.create({userId: 3}),
    Cart.create({userId: 4}),
    Cart.create({userId: 5}),
    Cart.create({userId: 6}),
    Cart.create({userId: 7}),
    Cart.create({userId: 8}),
    Cart.create({userId: 9}),
    Cart.create({userId: 10}),
    Cart.create({userId: 11})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Broccoli',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FP1n1lD6e7dTHso_HZ5Oyg5OpZ0SqCNELvTCIrYuZh3m1PfHLg',
      price: 9.0,
      description: 'Certified fresh.',
      quantity: 1
    }),
    Product.create({
      name: 'Romanesco Broccoli',
      imageUrl:
        'https://www.well-beingsecrets.com/wp-content/uploads/How-to-Incorporate-More-Broccoli-Into-Your-Diet.jpg',
      price: 2.0,
      description: "It's delicious trust us.",
      quantity: 2
    }),
    Product.create({
      name: 'Purple Broccoli',
      imageUrl: 'http://www.theproduceguide.com/pimage/purplebroc.jpg',
      price: 2.0,
      description: 'When your feeling down why not eat purple broccoli?',
      quantity: 3
    }),
    Product.create({
      name: 'Purple Cauliflower',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1380/2059/products/Cauliflower-Purple.jpg?v=1480318422',
      price: 6.0,
      description:
        'Snapple fact, purple cauliflower is a broccoli, but white cauliflower is not.',
      quantity: 8
    }),
    Product.create({
      name: 'Broccolini',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1198/2742/products/broccoliniBulk_35_1024x1024.jpg?v=1467478740',
      price: 3.0,
      description: "Think of broccolini as veal, it's tender and delicious.",
      quantity: 6
    }),
    Product.create({
      name: 'Chinese Broccoli',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZp62k5V99O_OJuCyo1TcHaacGLK5WBv5N892fe7RL4nIMatFbw',
      price: 8.0,
      description:
        'When you were eating a stir fry, did you know you where eating broccoli?',
      quantity: 6
    }),
    Product.create({
      name: 'Brussel Sprouts',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTPGP9_LH_clhzT-1_qfktqhgjyNHl4vZj2UeXD_GgKgA3_z5snA',
      price: 4.0,
      description:
        "I bet you didn't know that brussel sprouts are a type of broccoli, did you?",
      quantity: 5
    }),
    Product.create({
      name: 'Cuddly Broccoli',
      imageUrl:
        'data:image/jpeg;base64,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',
      price: 7.0,
      description: 'Because broccoli need hugs too.',
      quantity: 1
    }),
    Product.create({
      name: 'Angry Broccoli',
      imageUrl:
        'data:image/webp;base64,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',
      price: 5.0,
      description: 'You wont like broccoli when it gets angry.',
      quantity: 2
    }),
    Product.create({
      name: 'LOL Broccoli',
      imageUrl:
        'data:image/jpeg;base64,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',
      price: 10.0,
      description: "LOL, it's broccoli, your only friend.",
      quantity: 3
    }),
    Product.create({
      name: 'Broccoli Femme Fatale',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZ2YH5RrGdCPbXZsGYZAVpQ7a3RKNqNqGlBHZFvjNf9eEcBJf',
      price: 15.0,
      description:
        'In addition to toppling governments, she is guest starring in the new Mission Impossible movie.',
      quantity: 1
    }),
    Product.create({
      name: 'Broccoli Chia Pet',
      imageUrl:
        'https://s7d2.scene7.com/is/image/PetSmart/5275781?$pdp-placeholder-desktop$',
      price: 20.0,
      description: 'Cha Cha Chia Pets, are back!',
      quantity: 1
    })
  ])

  const reviews = await Promise.all([
    Review.create({
      content: 'It is amazing how under ripe it is.',
      rating: 5,
      productId: 1,
      userId: 1
    }),
    Review.create({
      content: "It couldn't be better.",
      rating: 5,
      productId: 2,
      userId: 2
    }),
    Review.create({content: 'Awesome!', rating: 5, productId: 3, userId: 2}),
    Review.create({
      content: 'Hard and rotten!',
      rating: 2,
      productId: 4,
      userId: 3
    }),
    Review.create({
      content: 'Thank you for great broccoli!',
      rating: 5,
      productId: 5,
      userId: 5
    }),
    Review.create({
      content: "I'll buy it again.",
      rating: 5,
      productId: 6,
      userId: 6
    }),
    Review.create({
      content:
        'This is the second time I have bought from BroccoliBoys, and they have yet to disappoint. I will definitely buy here again.',
      rating: 5,
      productId: 3,
      userId: 2
    }),
    Review.create({
      content: 'I have no idea what small is, if they call this large.',
      rating: 4,
      productId: 5,
      userId: 9
    }),
    Review.create({
      content: 'Arrived just barely ripe, which is perfect for me.',
      rating: 5,
      productId: 9,
      userId: 3
    }),
    Review.create({
      content: 'Rotten by day 3!',
      rating: 3,
      productId: 10,
      userId: 3
    }),
    Review.create({
      content: 'great product!',
      rating: 5,
      productId: 3,
      userId: 5
    }),
    Review.create({
      content:
        'What I got was no where near “large” additionally it was hard and barely had any flavor.',
      rating: 5,
      productId: 4,
      userId: 4
    }),
    Review.create({content: 'Very Nice!', rating: 3, productId: 10, userId: 7}),
    Review.create({
      content: 'I was happy with the freshness and the quality.',
      rating: 5,
      productId: 3,
      userId: 8
    }),
    Review.create({
      content: 'Great Product!',
      rating: 3,
      productId: 2,
      userId: 8
    }),
    Review.create({
      content: 'Awesome, BroccoliBoys!',
      rating: 5,
      productId: 1,
      userId: 4
    })
  ])

  const orders = await Promise.all([
    Order.create({userId: 2, productId: 5, quantity: 3}),
    Order.create({userId: 2, productId: 2, quantity: 2}),
    Order.create({userId: 3, productId: 4, quantity: 1}),
    Order.create({userId: 5, productId: 2, quantity: 3}),
    Order.create({userId: 4, productId: 6, quantity: 4}),
    Order.create({userId: 2, productId: 8, quantity: 3}),
    Order.create({userId: 3, productId: 4, quantity: 2}),
    Order.create({userId: 2, productId: 2, quantity: 3}),
    Order.create({userId: 4, productId: 1, quantity: 4}),
    Order.create({userId: 2, productId: 2, quantity: 3}),
    Order.create({userId: 5, productId: 3, quantity: 1}),
    Order.create({userId: 2, productId: 5, quantity: 3}),
    Order.create({userId: 6, productId: 2, quantity: 2}),
    Order.create({userId: 2, productId: 7, quantity: 3}),
    Order.create({userId: 4, productId: 2, quantity: 2}),
    Order.create({userId: 2, productId: 4, quantity: 3}),
    Order.create({userId: 3, productId: 3, quantity: 1}),
    Order.create({userId: 2, productId: 2, quantity: 1}),
    Order.create({userId: 3, productId: 5, quantity: 1}),
    Order.create({userId: 5, productId: 3, quantity: 3}),
    Order.create({userId: 4, productId: 2, quantity: 1}),
    Order.create({userId: 7, productId: 1, quantity: 1}),
    Order.create({userId: 6, productId: 2, quantity: 3}),
    Order.create({userId: 4, productId: 7, quantity: 1}),
    Order.create({userId: 3, productId: 9, quantity: 1})
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${carts.length} cart`)
  console.log(`seeded ${orders.length} cart`)

  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
