import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, Shop, fetchCart,  } from '../store/store'
import ProductCreator from "./ProductCreator"



class AllProducts extends Component {
 
  constructor() {
    super()
    this.state = {
      products: []
    }
  }


  componentWillReceiveProps() {
    this.setState({ products: this.props.products })
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
    this.props.fetchCart(this.props.user.id)

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

const mapStateToProps = state => ({ products: state.products,
user: state.user })

const mapDispatchToState = dispatch => ({ fetchProducts: () => dispatch(fetchProducts()),
fetchCart: (userId) => dispatch(fetchCart(userId))})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToState)(AllProducts)

export default ConnectedAllProducts


{/* {document.oninput = function (evt) {
            let vals;
            let keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
            if (keyCode == 13) {
              const products = this.state.products
              vals = products.filter(product => product.name.toLowerCase().includes(evt.target.value.toLowerCase()))
              console.log("values: ", vals)
              this.setState({ products: vals })
            }
          }.bind(this)} */}