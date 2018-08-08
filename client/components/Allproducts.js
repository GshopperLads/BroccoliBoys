import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, Shop, fetchCart} from '../store'

import ProductCreator from './ProductCreator'

export class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }
  async componentDidMount() {
    if (this.props.fetchProducts) {
      await this.props.fetchProducts()
    }

    this.setState({products: this.props.products})

    if (typeof document !== 'undefined') {
      var el = document.getElementById('searchBar2')

      if (el) {
        el.addEventListener(
          'input',
          function(evt) {
            const products = this.props.products
            let vals = products.filter(product =>
              product.name
                .toLowerCase()
                .includes(evt.target.value.toLowerCase())
            )
            this.setState({products: vals})
          }.bind(this)
        )
      }
      var el = document.getElementById('searchBar1')
      if (el) {
        el.addEventListener(
          'input',
          function(evt) {
            const products = this.props.products
            let vals = products.filter(product =>
              product.name
                .toLowerCase()
                .includes(evt.target.value.toLowerCase())
            )
            this.setState({products: vals})
          }.bind(this)
        )
      }
    }
  }
  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      var el = document.getElementById('searchBar2')
      if (el) {
        document.removeEventListener(
          'input',
          function(evt) {
            const products = this.props.products
            let vals = products.filter(product =>
              product.name
                .toLowerCase()
                .includes(evt.target.value.toLowerCase())
            )
            this.setState({products: vals})
          }.bind(this)
        )
      }
      var el = document.getElementById('searchBar1')
      if (el) {
        document.removeEventListener(
          'input',
          function(evt) {
            const products = this.props.products
            let vals = products.filter(product =>
              product.name
                .toLowerCase()
                .includes(evt.target.value.toLowerCase())
            )
            this.setState({products: vals})
          }.bind(this)
        )
      }
    }

    $(function() {
      $('#example').barrating({
        theme: 'fontawesome-stars-o'
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <ProductCreator products={this.state.products} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapDispatchToState = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCart: userId => dispatch(fetchCart(userId))
})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(
  AllProducts
)

export default ConnectedAllProducts
