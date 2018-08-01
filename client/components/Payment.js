import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import CheckoutProductCards from './CheckoutProductCards'
import {Button, Card, Image, Icon, List, Header} from 'semantic-ui-react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
/*
  react-stripe-checkout : provides a pretty component to capture credit card info
  generates a Stripe token that is sent to the server
  ( token generation happens under the hood with the official Stripe.js library)
*/

class Payment extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  successPayment = data => {
    alert('Payment has been approved')
  }

  errorPayment = data => {
    alert('Payment Error')
  }

  onToken = amount => token => {
    axios
      .post('/save-stripe-token', {
        description: 'Card Payment',
        source: token.id,
        currency: 'USD',
        amount: amount * 100,
        customer: this.props.user.id,
        email: this.props.user.email
      })
      .then(this.successPayment)
      .catch(this.errorPayment)
  }

  render() {
    const {stripeKey} = require('../../secrets.js')
    const user = this.props.user
    const userId = user.id
    const cartToRender = this.props.carts.filter(el => el.userId === userId)
    const productsToRender = cartToRender.map(userCart => userCart.product)
    let value = 0

    for (let i = 0; i < productsToRender.length; i++) {
      for (let j = 0; j < cartToRender.length; j++) {
        if (productsToRender[i].id === cartToRender[j].productId) {
          value +=
            Number(productsToRender[i].price) * Number(cartToRender[j].quantity)
        }
      }
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
        <div className="payment-content-wrapper">
          <div className="stripe-wrapper">
            <StripeCheckout
              token={this.onToken(value)}
              stripeKey={stripeKey}
              name={user.name}
              description="Card Payment"
              panelLabel="Submit Order"
              currency="USD"
              amount={value * 100}
              email={user.email}
              customer={user.id}
              allowRememberMe
              className="pay-btn"
              // shippingAddress
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
  dummyCartProduct: state.products.filter(product => product.price >= 9),
  carts: state.carts,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Payment)
