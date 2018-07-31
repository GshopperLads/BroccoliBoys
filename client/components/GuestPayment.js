import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import CheckoutProductCards from './CheckoutProductCards'
import {Button, Card, Image, Icon, List, Header} from 'semantic-ui-react'
import axios from 'axios'

// import {Helmet} from 'react-helmet' // to use script tag in jsx
import StripeCheckout from 'react-stripe-checkout'
/*
  react-stripe-checkout : provides a pretty component to capture credit card info
  generates a Stripe token that is sent to the server
  ( token generation happens under the hood with the official Stripe.js library)
*/

class GuestPayment extends Component {
  componentDidMount() {
    this.props.fetchProducts()

    // const script = document.createElement("script");
    // script.src = "https://checkout.stripe.com/checkout.js"
    // script.async = true;
    // document.body.appendChild(script)
  }

  successPayment = data => {
    alert('Payment has been approved')
  }

  errorPayment = data => {
    alert('Payment Error')
  }

  onToken = (amount) => token => {
    axios.post('/save-stripe-token', {
      description: 'Card Payment',
      source: token.id,
      currency: "USD",
      amount: amount*100,
      customer: this.props.user.id,
      email: this.props.user.email
    })
    .then(this.successPayment)
    .catch(this.errorPayment)
  }
      // fetch('/save-stripe-token', {
      //   method: 'POST',
      //   body: JSON.stringify(token)
      // }).then(response => {
      //   response.json().then(data => {
      //     alert(`We are in business, ${data.email}`)
      //   })
      // })

  render() {
    // need to replace dummy data w/ real one

    // console.log(this.props)
    const {stripeKey} = require('../../secrets.js')
      let value = 0

    //define products
    const products = this.props.products

    //Get keys from session storage, to find products needed
    let productsToRenderKeys = Object.keys(sessionStorage)
    //Check to see what products are included in local storage
    let productsToRender = [];
    // console.log('ALL PRODUCTS', products)
    for (let i=0; i<products.length; i++){
      if(productsToRenderKeys.includes(products[i].id.toString())){
        productsToRender.push(products[i])
      }
    }

      console.log("productsToRender", productsToRender)
      for (let i = 0; i < productsToRender.length; i++) {
            value += Number(productsToRender[i].price) * Number(sessionStorage.getItem([productsToRender[i].id]))
          }
  
    return (
      <div>
        <div className="payment-title">
          <h1>Checkout</h1>
        </div>
        <hr />
        <div className="payment-sub-title">
          <h3>Review Order</h3>
        </div>

        <div className="review-order">
          <CheckoutProductCards products={productsToRender} />
        </div>
        {/* Todo : aggregate price
          Subtotal: $42.22
          Shipping: FREE
          TAX [Estimated]: $0.00
          Total: $42.22
         */}
        <div className="payment-content-wrapper">
          <div className="stripe-wrapper">
            <StripeCheckout
              token={this.onToken(value)}
              stripeKey={stripeKey}
              // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
              name="guest"
              description="Card Payment"
              panelLabel="Submit Order"
              currency="USD"
              amount={value*100}
              email="guest"
              customer="guest"
              // shippingAddress
              allowRememberMe
              className="pay-btn"
            />
          </div>
          <div className="payment-total">
            <Header>
              <Header.Content>
                Order Total: {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
                {'\u00A0'} <Icon name="dollar sign" />
                {value}.00
              </Header.Content>
            </Header>
          </div>
        </div>
        <hr />
        <hr />
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  carts: state.carts,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(GuestPayment)
