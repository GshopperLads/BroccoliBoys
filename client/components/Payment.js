import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/store'
import CheckoutProductCards from "./CheckoutProductCards"


class Payment extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    console.log(this.props.dummyCartProduct)
    console.log("hello")
    return (
      <div>
        <div><h1>Checkout</h1></div>
        <hr />
        <div><h3>Review Order</h3></div>
        <CheckoutProductCards products={this.props.dummyCartProduct} />
        <hr />
        {/* Todo :

          Subtotal: $42.22
          Shipping: FREE
          TAX [Estimated]: $0.00
          Total: $42.22

          button - Submit Order
         */}
      </div>
    )
  }

}


const mapState = (state) => ({

  dummyCartProduct: state.products.filter(product => product.price >= 9)
})

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(Payment)
