import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = "GET_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const CLEAR_CART = "CLEAR_CART"
const ADD_TO_CART = "ADD_TO_CART"

/**
 * ACTION CREATORS
 */
const getCart = (cart) => ({
  type: GET_CART,
  cart
})

const deleteFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  cart
})

const addToCart = (item) => ({
  type: ADD_TO_CART,
  item
})

const clearCart = () => ({
  type: CLEAR_CART
})

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`)
      dispatch(getCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const SHOP = (productId, update) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.update(`api/products/${productId}`, update)
      dispatch(addToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = (newProduct, newCart, productId, cartId) => {
  return async (dispatch) => {
    try {
      const newProductData = await axios.put(`/api/products/${productId}`, newProduct)

      const newCartData = await axios.put(`/api/cart/${cartId}`, newCart)

      dispatch(removeFromCart(newProductData.data, newCartData.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * Reducer
 */
//CART REDUCER
export const cartReducer = (state = {cart: {}, cartProducts: {} }, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    case ADD_TO_CART:
      return {cart: state.cart,  cartProducts: {...state.cartProducts, [action.item.productId]: action.item.quantity}}
    case REMOVE_FROM_CART:
      return state.filter((el) => { return el !== action.cart })
    case CLEAR_CART:
      return {...state, cartProducts: []}
    default:
      return state
  }
}
