import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {userReducer} from './userReducer'
import {productReducer} from './productReducer'
import {cartReducer} from './cartReducer'
import {reviewReducer} from './reviewReducer'
import {orderReducer} from './orderReducer'
import {usersReducer} from './usersReducer'

const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  carts: cartReducer,
  reviews: reviewReducer,
  orders: orderReducer,
  users: usersReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
export * from './productReducer'
export * from './cartReducer'
export * from './reviewReducer'
export * from './orderReducer'
export * from './usersReducer'
