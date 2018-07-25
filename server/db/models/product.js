const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: "broccoli is fresh",

    },
    quantity: {
        type: Sequelize.NUMBER,
        allowNull: false, 
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    }

})

module.exports = Product