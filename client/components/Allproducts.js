import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import ProductCreator from "./ProductCreator"

export class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }
  componentWillReceiveProps() {
    this.setState({ products: this.props.products })
  }
  componentWillMount() {
    this.props.fetchProducts()
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.setState({ products: this.props.products })
    var el = document.getElementById('searchBar2');
    if (el) {
      el.addEventListener("input", function (evt) {
        const products = this.props.products
        let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
        console.log("values: ", vals)
        this.setState({ products: vals })
      }.bind(this))
    }
  }
  componentWillUnmount() {
    var el = document.getElementById('searchBar2');
    if (el) {
      document.removeEventListener("input", function (evt) {
        const products = this.props.products
        let vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
        console.log("values: ", vals)
        this.setState({ products: vals })
      }.bind(this))
    }

    $(function() {
      $('#example').barrating({
        theme: 'fontawesome-stars-o'
        //readonly: true,
        // showSelectedRating:false
      })
    })
  }

  render() {
    console.log("products: ", this.state.products)
    return (
      <React.Fragment>
        <ProductCreator products={this.state.products} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ products: state.products })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()) })

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts


