import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userReducer } from './userReducer'
import { productReducer } from './productReducer'
import { cartReducer } from './cartReducer'

/*
  INITIAL STATE TYPE OF EACH REDUCER
  productReducer: [],
  userReducer: {},
  cartReducer: []
 */

const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cart: cartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
export * from './productReducer'
export * from './cartReducer'
