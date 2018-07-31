import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createReview } from '../store'

// import thunk creator after making

class NewReview extends Component {
  constructor() {
    super();
    this.state = {
      rating: 5,
      content: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    $(function () {
      $('#newrating').barrating({
        theme: 'fontawesome-stars-o'
        //readonly: true,
        // showSelectedRating:false
      })
    })
  }
  componentDidMount() {
    $(function () {
      $('#newrating').barrating({
        theme: 'fontawesome-stars-o'
        //readonly: true,
        // showSelectedRating:false
      })
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const content = evt.target.content.value
    const rating = evt.target.rating.value
    const userId = this.props.userId
    const productId = this.props.match.params.id
    const newReview = {
      rating, content, productId, userId
    }
    await this.props.createReview(newReview)
  }


  render() {

    // const handleSubmit = this.props.handleSubmit
    const isLoggedIn = this.props.isLoggedIn
    return (
      <React.Fragment>
        {isLoggedIn ? (
          <div className="review-form">
            <form
              onSubmit={this.handleSubmit}
              name="review"
              className="review-form-wrapper"
            >
              <div className="review-form-title">Write Your Review</div>
              <div>
                <label htmlFor="rating" className="review-input-text">
                  Rating
                </label>
                <select id="newrating" name="rating" defaultValue="5" onChange={this.handleChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <textarea
                  name="content"
                  placeholder=" your review here"
                  className="review-content-box"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <button type="submit" className="btn-review">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
            <div className="login-alarm-wrapper">
              <div className="login-alarm-msg">
                Please login to write a revivew!
            </div>
            </div>
          )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  createReview: (newReview) => dispatch(createReview(newReview))
  // handleSubmit(evt) {
  //   evt.preventDefault()
  //   // const formName = evt.target.name
  //   // const  = evt.target.email.value
  //   // const
  //   const content = evt.target.content.value
  //   const rating = evt.target.rating.value
  //   // const productId =
  //   // const userID =


  //   // const newReview = {
  //   //   rating, content, productId, userId
  //   // }
  //   // dispatch(createReview(, password, formName))
  // }
})

export default connect(mapState, mapDispatch)(NewReview)

NewReview.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
