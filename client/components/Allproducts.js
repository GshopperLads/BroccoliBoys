import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, Shop, fetchCart } from '../store/store'
import ProductCreator from "./ProductCreator"



class AllProducts extends Component {
  componentDidMount() {
    console.log(this.props.user)
    this.props.fetchProducts()
    this.props.fetchCart(this.props.user.id)
  }

  render() {
    const products = this.props.products
    return (
      <ProductCreator products={products} />
    )
  }
}

const mapStateToProps = state => ({ products: state.products,
user: state.user })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()),
fetchCart: (userId) => dispatch(fetchCart(userId))})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts
