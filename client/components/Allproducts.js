import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/store'

class AllProducts extends Component {
  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                {' '}
                {product.name} {product.imageUrl} {product.price}{' '}
                {product.quantity}{' '}
              </li>
            )
          })}
        </ul>
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
