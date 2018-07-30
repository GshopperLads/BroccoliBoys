import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const GET_REVIEW = 'GET_REVIEW'

const ADD_REVIEW = 'ADD_REVIEW'
// const REMOVE_REVIEW = 'REMOVE_REVIEW'


/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})

const getReview = review => ({
  type: GET_REVIEW,
  review
})

const addReview = review => ({
  type: ADD_REVIEW,
  review
})

const removeReview = review => ({
  type: REMOVE_REVIEW,
  review
})

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => async dispatch => {
  try {
    console.log("thunk creator....")
    const { data } = await axios.get('/api/review')

    dispatch(getReviews(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchReview = (reviewId) => async dispatch => {
  try {
    const { data } = await axios.get(`/api/review/${reviewId}`)
    dispatch(getReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const createReview = (newReview) => async dispatch => {
  try {
    const res = await axios.post('/api/review', newReview)
    const review = res.data
    dispatch(addReview(review))
    history.push(`/products/${newReview.productId}`)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Reducer
 */
export const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
