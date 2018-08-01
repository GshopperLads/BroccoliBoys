import React, {Component} from 'react'
import {Helmet} from 'react-helmet'

class Review extends Component {
  componentDidMount() {
    $(function() {
      $('#rating').barrating({
        theme: 'fontawesome-stars-o'
      })
    })
    const reviewLen = this.props.reviews.filter(review => {
      return review.productId === Number(this.props.productId)
    }).length
    let i = 0
    while (i < reviewLen) {
      $(function() {
        $(`#rating${i}`).barrating({
          theme: 'fontawesome-stars-o'
        })
      })
      i++
    }
  }

  componentWillMount() {
    $(function() {
      $('#rating').barrating({
        theme: 'fontawesome-stars-o'
      })
    })
    const reviewLen = this.props.reviews.filter(review => {
      return review.productId === Number(this.props.productId)
    }).length
    let i = 0
    while (i < reviewLen) {
      $(function() {
        $(`#rating${i}`).barrating({
          theme: 'fontawesome-stars-o'
        })
      })
      i++
    }
  }

  render() {
    const productReviews = this.props.reviews.filter(review => {
      return review.productId === Number(this.props.productId)
    })
    let totalRating = 0
    productReviews.forEach(review => {
      totalRating += review.rating
    })
    let averageRating = totalRating / productReviews.length

    return (
      <React.Fragment>
        <div className="review-title">Customer Reviews</div>
        <div className="review-sum">
          <div>
            <select id="rating" defaultValue={`${Math.floor(averageRating)}`}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div> {productReviews.length}</div>
          <div> (average: {averageRating})</div>
        </div>
        {productReviews.map((productReview, idx) => (
          <div key={productReview.id} className="review-content-wrapper">
            <div className="rating-and-name">
              <div>
                <select
                  id={`rating${idx}`}
                  defaultValue={`${productReview.rating}`}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <Helmet>
                <script>
                  {`$(function(){' '}
                {$('#rating2').barrating({
                  theme: 'fontawesome-stars-o'
                  //readonly: true,
                  // showSelectedRating:false
                })})`}
                </script>
              </Helmet>
              <div className="review-name">By {productReview.user.name}</div>
            </div>
            <div className="review-content">{productReview.content}</div>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default Review
