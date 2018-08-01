import axios from 'axios'
import history from '../history'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/order')
      const orders = res.data
      dispatch(getOrders(orders))
      return orders
    } catch (err) {
      console.error(err)
    }
  }
}

export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return [...action.orders]
    default:
      return state
  }
}
