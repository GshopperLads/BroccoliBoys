import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchUsers, fetchOrders } from '../../store'


class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUsers()
    this.props.fetchOrders()
  }

  render() {
    const users = this.props.users
    const orders = this.props.orders
    console.log("dashboard: ", orders)
    return (
      <div>
        <div>
          <div className="admin-user-section">
          <h2>All Customers</h2>
            {
              users.map(user => (
                <div key={user.id}>
                  {user.name}
                </div>
              ))
            }
          </div>
          <div className="admin-order-section">
          <h2>Customers Order History</h2>
            {
              orders.map(order => (
                <div key={order.id}>
                  <div>{order.product.name} (quantity: {order.quantity}) - Total: ${order.product.price*order.quantity} ({order.createdAt.slice(0,10)})</div>

                </div>
              ))
            }
          </div>

        </div>
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users,
  orders: state.orders
})

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapState, mapDispatch)(Dashboard)
// export default Dashboard
