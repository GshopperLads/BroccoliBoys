import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/store'
import ProductCreator from './ProductCreator'

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

const mapStateToProps = state => ({ products: state.products })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()) })

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts
