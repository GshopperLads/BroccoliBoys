import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/store'
import ProductCreator from './ProductCreator'
import { CardExampleCardProps } from "./Card"
import { Card, Icon } from 'semantic-ui-react'



class AllProducts extends Component {
  componentWillMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products
    return (
      <Card.Group itemsPerRow={4}>
        {products.map(product => <CardExampleCardProps name={product.name} image={product.imageUrl} price={product.price} quantity={product.quantity} description={product.description} />)}        )
      </Card.Group>
    )
  }
}

const mapStateToProps = state => ({ products: state.products })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()) })

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts
