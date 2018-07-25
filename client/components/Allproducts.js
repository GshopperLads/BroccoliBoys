import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/store'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.products.map(product => {
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
  return {products: state}
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
