import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, Shop } from '../store/store'
import ProductCreator from "./ProductCreator"



class AllProducts extends Component {
  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <ProductCreator products={products} />
    )
  }
}

const mapStateToProps = state => ({ products: state.products })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts(), get})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts
