import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { fetchProducts } from '../store/store'
import ProductCreator from "./ProductCreator"


class Payment extends Component {
  render() {
    console.log(this.props.dummyCartProduct)
    console.log("hello")
    return (
      <div>
        <div><h1>Chechout</h1></div>
        <ProductCreator products={this.props.dummyCartProduct} />

        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </div>
    )
  }

}


const mapState = (state) => ({
  dummyCartProduct: state.products.filter(product => product.price >= 9)
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Payment)
