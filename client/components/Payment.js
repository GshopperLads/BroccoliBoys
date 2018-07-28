import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/store'
import CheckoutProductCards from './CheckoutProductCards'

// import {Helmet} from 'react-helmet' // to use script tag in jsx
import StripeCheckout from 'react-stripe-checkout'

class Payment extends Component {
  componentDidMount() {
    this.props.fetchProducts()

    // const script = document.createElement("script");
    // script.src = "https://checkout.stripe.com/checkout.js"
    // script.async = true;
    // document.body.appendChild(script)
  }

  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }

  render() {
    console.log(this.props.dummyCartProduct)
    console.log('hello')
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
          <CheckoutProductCards products={this.props.dummyCartProduct} />
        </div>
        {/* Todo : aggregate price
          Subtotal: $42.22
          Shipping: FREE
          TAX [Estimated]: $0.00
          Total: $42.22
         */}
        <div className="form-wrapper">
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_live_3kpTOfuE3lqvyAuLYuAvUVT1"
            image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
            name="BroccoliBoys"
            description="Card Payment"
            panelLabel="Submit Order"
            currency="USD"
            // amount={10}
            // email=""
            shippingAddress
            allowRememberMe
            className="pay-btn"
          />
        </div>
        <hr />
        <hr />
      </div>
    )
  }
}

const mapState = state => ({
  dummyCartProduct: state.products.filter(product => product.price >= 9)
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Payment)
