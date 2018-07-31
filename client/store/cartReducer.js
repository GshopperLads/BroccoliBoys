import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CARTS = "GET_CARTS"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const CLEAR_CART = "CLEAR_CART"
const ADD_TO_CART = "ADD_TO_CART"

// const INCREASE_QUANTITY = "INCREASE_QUANTITY"
// const DECREASE_QUANTITY = "DECREASE_QUANTITY"
const CHANGE_QUANTITY = "CHANGE_QUANTITY"

/**
 * ACTION CREATORS
 */
const getCarts = (carts) => ({
  type: GET_CARTS,
  carts
})

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart
})

// const increaseQuantity = (cart) => ({
//   type: INCREASE_QUANTITY,
//   cart
// })

// const decreaseQuantity = (cart) => ({
//   type: DECREASE_QUANTITY,
//   cart
// })
const changeQuantity = cart => ({
  type: CHANGE_QUANTITY,
  cart
})

const deleteFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  cart
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
      const res = await axios.get(`/api/cart/${userId}`)
      const carts = res.data
      dispatch(getCarts(carts))
    } catch (err) {
      console.error(err)
    }
  }
}

export const Shop = (productId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/cart/add`, {productId, userId})
      const newCartItem = res.data
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
      console.log("start modify thunk....")
      const res = await axios.post('/api/cart/quantity', {cartId, currentQuantity, variation})
      const updatedCart = res.data
      console.log(updatedCart)
      console.log("now dispatching.... ")
      dispatch(changeQuantity(updatedCart))
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
// export const cartReducer = (state = {cart: {}, cartProducts: {} }, action) => {
//   switch (action.type) {
//     case GET_CART:
//       return {...state, cart: action.cart}
//     case ADD_TO_CART:
//       return {cart: state.cart,  cartProducts: {...state.cartProducts, [action.item.productId]: action.item.quantity}}
//     case REMOVE_FROM_CART:
//       return state.filter((el) => { return el !== action.cart })
//     case CLEAR_CART:
//       return {...state, cartProducts: []}
//     default:
//       return state
//   }
// }

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CARTS:
      return [...action.carts]
    case ADD_TO_CART:
      return [...state, action.cart]
    case CHANGE_QUANTITY:
      return [...state, action.cart]
    // case INCREASE_QUANTITY:
    //   return [...state, action.cart]
    // case DECREASE_QUANTITY:
    //   return [...state, action.cart]

    case REMOVE_FROM_CART:
      return state.filter((el) => { return el !== action.cart })
    case CLEAR_CART:
      return []
    default:
      return state
  }
}


