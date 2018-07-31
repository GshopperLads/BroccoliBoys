import React, {Component} from 'react'
import SingleProductCreator from './SingleProductCreator'
import {fetchProducts, fetchReviews} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Review from './Review'

class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchReviews()
  }

  render() {
    const product = this.props.products.filter(
      product => product.id == this.props.match.params.id
    )
    return (
      <div className="single-product-wrapper">
        <SingleProductCreator products={product} />
        <div className="review-section">
          <div>
            <Link to={`/products/${this.props.match.params.id}/newreview`}>
              <input
                type="submit"
                value="Write a review"
                className="btn-write-review"
              />
            </Link>
          </div>
          <Review
            reviews={this.props.reviews}
            productId={this.props.match.params.id}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  reviews: state.reviews
})

const mapDispatchToState = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchReviews: () => dispatch(fetchReviews())
})

const ConnectedSingleProduct = connect(mapStateToProps, mapDispatchToState)(
  SingleProduct
)

export default ConnectedSingleProduct
