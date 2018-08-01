import axios from 'axios'

const GET_CARTS = 'GET_CARTS'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'

/**
 * ACTION CREATORS
 */
const getCarts = carts => ({
  type: GET_CARTS,
  carts
})

const addToCart = cart => ({
  type: ADD_TO_CART,
  cart
})

const changeQuantity = cart => ({
  type: CHANGE_QUANTITY,
  cart
})

const deleteFromCart = cart => ({
  type: REMOVE_FROM_CART,
  cart
})

const clearCart = () => ({
  type: CLEAR_CART
})

/**
 * THUNK CREATORS
 */
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/cart/${userId}`)
      const carts = res.data
      dispatch(getCarts(carts))
      return carts
    } catch (err) {
      console.error(err)
    }
  }
}

export const Shop = (productId, userId) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/cart/add`, {productId, userId})
      const newCartItem = res.data
      alert('Item has been added!')
      dispatch(addToCart(newCartItem))
    } catch (err) {
      console.error(err)
    }
  }
}

export const modifyQuantity = (type, cartId, currentQuantity) => {
  return async dispatch => {
    try {
      let variation = 1
      if (type === 'minus') variation = -1
      const res = await axios.post('/api/cart/quantity', {
        cartId,
        currentQuantity,
        variation
      })
      const updatedCart = res.data

      dispatch(changeQuantity(updatedCart))
      return updatedCart
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = cartId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${cartId}`)

      dispatch(deleteFromCart(cartId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CARTS:
      return [...action.carts]
    case ADD_TO_CART:
      return [...state, action.cart]
    case CHANGE_QUANTITY:
      return [...state, action.cart]
    case REMOVE_FROM_CART:
      return state.filter(el => {
        return el.id !== action.cart
      })
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
