import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/store'
import ProductCreator from "./ProductCreator"

class AllProducts extends Component {
  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <ProductCreator products={products} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { products: state.products }
}

const mapDispatchToState = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

const connectedAllProducts = connect(mapStateToProps, mapDispatchToState)(
  AllProducts
)

export default connectedAllProducts
