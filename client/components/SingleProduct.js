import React, { Component } from "react"
import ProductCreator from "./ProductCreator"
import { fetchProducts } from '../store/store'
import { connect } from 'react-redux'

class SingleProduct extends Component {
    componentWillMount() {
        this.props.fetchProducts()
    }
    render() {
        const product = this.props.products.filter(product => product.id == this.props.match.params.id)
        return (
            <ProductCreator products={product} />
        )
    }
}


const mapStateToProps = state => ({ products: state.products })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()) })

const ConnectedSingleProduct = connect(mapStateToProps, mapDispatchToState)(SingleProduct)

export default ConnectedSingleProduct
