import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */
export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
