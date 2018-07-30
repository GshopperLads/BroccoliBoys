import axios from 'axios'
import history from '../history'
import { dispatch } from "react-redux"

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = "GET_PRODUCTS"
const GET_PRODUCT = "GET_PRODUCT"

const GET_CART = "GET_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const CLEAR_CART = "CLEAR_CART"
const ADD_TO_CART = "ADD_TO_CART"

const GET_USER = 'GET_USER'
const GET_USERS = 'GET_USERS'

const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  products: [],
  users: [],
  cart: []
}

const getProducts = (products) => ({
  type: GET_PRODUCTS,
  products
})

const getProduct = (product) => ({
  type: GET_PRODUCT,
  product
})

const getCart = (cart) => ({
  type: GET_CART,
  cart
})

const deleteFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  cart
})

const addToCart = (items) => ({
  type: ADD_TO_CART,
  items
})

const clearCart = () => ({
  type: CLEAR_CART
})

// const getUser = (user) => ({
//   type: GET_USER,
//   user
// })

const getUsers = (users) => ({
  type: GET_USERS,
  users
})

const deleteUser = (user) => ({
  type: REMOVE_USER,
  user
})

//Thunk Creators

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products")
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`)
      dispatch(getProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

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

export const Shop = (productId, cartId) => {
  console.log('PRODUCTID', productId)
  return async (dispatch) => {
    try {
      await axios.put(`api/cart/${productId}`, {cartId})
      //const cartItems = await axios.get(`/api/cart/${cartId}`)
      //console.log('CART ITEMS IN THUNK', cartItems)
      //dispatch(addToCart(cartItems))
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







const defaultUser = {}

/**
 * ACTION CREATORS
 */

const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    const cart = await axios.get(`/api/cart/${res.data.id}`)
    dispatch(getCart(cart.data))
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authSignup = (email, name, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, { email, name, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    const newCart = await axios.post(`/api/cart/${res.data.id}`);
    dispatch(getCart(newCart.data))
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */


//PRODUCT REDUCER
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

//CART REDUCER
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      return [...state, action.items]
    case REMOVE_FROM_CART:
      return state.filter((el) => { return el !== action.cart })
    case CLEAR_CART:
      return []
    default:
      return state
  }
}

export const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

